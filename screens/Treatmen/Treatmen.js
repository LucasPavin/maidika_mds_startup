import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, View, Text, Dimensions, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { format, addDays, subDays, isToday, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import Header from '../../components/Header';
import { styles } from './styles';

const { width } = Dimensions.get('window');
const DAY_WIDTH = width / 5; // Pour afficher 5 jours sur l'écran

const Treatment = ({navigation}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const scrollViewRef = useRef();

  const daysToLoad = 2;

  const handleDayPress = (day) => {
    setSelectedDate(day);
  };


  // Fonction pour générer des jours autour de la date donnée
  const generateDays = (date, daysToGenerate = 180) => {
    let newDays = [];
    for (let i = -Math.floor(daysToGenerate / 1); i <= Math.floor(daysToGenerate / 1); i++) {
      newDays.push(addDays(date, i));
    }
    return newDays;
  };

  const [days, setDays] = useState(generateDays(currentDate));

   const onScrollEnd = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentDayIndex = Math.round(contentOffsetX / DAY_WIDTH);
    const newCurrentDate = days[currentDayIndex];

    if (!isToday(newCurrentDate)) {
      setCurrentDate(newCurrentDate);
    }

    // Charger plus de jours si l'utilisateur atteint l'un des extrêmes
    if (currentDayIndex === 0) { // Utilisateur a atteint le début
      const newDaysAtStart = generateDays(subDays(days[0], daysToLoad), daysToLoad);
      setDays([...newDaysAtStart, ...days]);
      setTimeout(() => {
        scrollViewRef.current.scrollTo({ x: DAY_WIDTH * daysToLoad, animated: false });
      }, 0);
    } else if (currentDayIndex === days.length - 1) { // Utilisateur a atteint la fin
      const newDaysAtEnd = generateDays(addDays(days[days.length - 1], 1), daysToLoad);
      setDays([...days, ...newDaysAtEnd]);
    }
  };

  // S'assurer que le ScrollView se centre sur la date courante
  useEffect(() => {
    const index = days.findIndex(day => isToday(day));
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: DAY_WIDTH * index, animated: false });
    }
  }, [days]);

  return (
    <>
      <Header />
      <View style={styles.container}>
        <View style={styles.viewMonth}>
            <Text style={styles.textViewMonth}>
                {`${format(selectedDate, 'MMMM', { locale: fr }).charAt(0).toUpperCase() + format(selectedDate, 'MMMM', { locale: fr }).slice(1)}, ${format(currentDate, 'yyyy')}`}
            </Text>
        </View>
        <View style={styles.containerWeek}>
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                onMomentumScrollEnd={onScrollEnd}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ alignItems: 'center' }}
            >
                {days.map((day, index) => (
                <TouchableOpacity 
                    key={index} 
                    style={[styles.dayContainer, {width: DAY_WIDTH} ]}
                    onPress={() => handleDayPress(day)}
                >
                    <View style={[styles.allDay, isToday(day) && styles.currentDayView, isSameDay(day, selectedDate) && styles.selectedDay]}>
                        <Text style={[styles.dayNumber, isToday(day) && styles.currentDayText,  isSameDay(day, selectedDate) && styles.selectedDayText,]}>
                            {format(day, 'd')}
                        </Text>
                    </View>
                    <Text style={styles.dayName}>
                        {format(day, 'eeee', { locale: fr }).charAt(0).toUpperCase() + format(day, 'eeee', { locale: fr }).slice(1)}
                    </Text>
                </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
        <View style={styles.containerRemind}>
            {selectedDate && (
                <Text style={styles.selectedDateText}>
                    {isToday(selectedDate) 
                        ? "Aujourd'hui" 
                        : `${format(selectedDate, 'eeee d MMMM', { locale: fr }).charAt(0).toUpperCase() + format(selectedDate, 'eeee d MMMM', { locale: fr }).slice(1)}`
                    }
                </Text>
            )}
            <View class={styles.btnAddTreatmen}>
            <TouchableOpacity onPress={() => navigation.navigate("AddTreatmen")}>
                <Image source={require('../../assets/icons/addTreatmen.png')}/>
            </TouchableOpacity>
            </View>
        </View>
      </View>
    </>
  );
};

export default Treatment;
