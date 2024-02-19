import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, View, Text, Dimensions, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { format, addDays, subDays, isToday, isSameDay, startOfWeek, eachDayOfInterval } from 'date-fns';
import { fr } from 'date-fns/locale';
import Header from '../../components/Header';
import { styles } from './styles';
import { fetchMedications } from '../../database/sqlite-database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';

const { width } = Dimensions.get('window');
const DAY_WIDTH = width / 5; // Pour afficher 5 jours sur l'écran

const Treatment = ({navigation}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [user, setUser] = useState(null);
  const [medication, setMedications] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const scrollViewRef = useRef();

  const daysToLoad = 2;

  const handleDayPress = (day) => {
    setSelectedDate(day);
  };
  const isDateWithinInterval = (date, startDate, endDate) => {
    return startDate <= date && date <= endDate;
  };

  const refreshData = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };  
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
  
          const storedUser = await AsyncStorage.getItem('user');
          if (!storedUser) {
              console.log('No user found');
              return;
          }
          const user = JSON.parse(storedUser);
          setUser(user);
          const meds = await fetchMedications(user.id);
          setMedications(meds);      
          setIsLoading(false);
  
      } catch (error) {
          console.error('Error fetching user or medications:', error);     
          setIsLoading(false);
      }
    };

    fetchUser();
  }, [refreshKey]);


  // Fonction pour générer des jours autour de la date donnée
  const generateDays = (date, daysToGenerate = 180) => {
    let newDays = [];
    for (let i = -Math.floor(daysToGenerate / 1); i <= Math.floor(daysToGenerate / 1); i++) {
      newDays.push(addDays(date, i));
    }
    return newDays;
  };

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

  const [days, setDays] = useState(() => {
    const startDay = new Date();
    return eachDayOfInterval({ start: startDay, end: addDays(startDay, 365) });
  });
  
  useEffect(() => {
    const index = days.findIndex(day => isToday(day));
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: DAY_WIDTH * index, animated: false });
    }
  }, [days]);


  const medicationImages = {
    'Comprimé': require('../../assets/treatmen/comprimes.png'),
    'Géllule': require('../../assets/treatmen/gellule.png'),
    'Liquide': require('../../assets/treatmen/liquide.png'),
    'Crème': require('../../assets/treatmen/creme.png'),
  };
  
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
            <View>
              {
                isLoading ? 
                  <View style={{ alignItems: 'center', justifyContent: 'center', height:'60%' }}>
                    <LottieView
                        source={require('../../assets/animations/medecine.json')}
                        autoPlay={true}
                        loop={false}
                        speed={1} 
                        style={{width: 100, height: 100}}
                    />
                  </View>
                :
                  <View style={styles.medicationsContainer}>
                    <ScrollView>
                      {medication && medication
                        .filter(med => {
                          const startDate = new Date(med.startDate);
                          if (med.endDate) {
                            const endDate = new Date(med.endDate);
                            endDate.setHours(23, 59, 59, 999);
                            return isDateWithinInterval(selectedDate, startDate, endDate);
                          } else {
                            return isSameDay(selectedDate, startDate);
                          }
                        })
                        .map((med, index) => (
                          <View key={index} style={styles.medicationContainer}>
                              <View style={styles.medicationContainerImage}>
                                <Image style={{ width: 40, height: 40}} source={medicationImages[med.medicationType]} />
                              </View>
                              <View style={styles.medicationContainerContent}>
                                <Text style={[styles.medicationContainerContentName, med.isTaken === 1 && { textDecorationLine: 'line-through' }]}>{med.medicationName}</Text>
                                <Text style={[styles.medicationName, med.isTaken === 1 && { textDecorationLine: 'line-through' }]}>{med.dosage} {med.medicationType}(s)</Text>
                              </View>
                              <View style={styles.medicationContainerTime}>
                                {
                                  med.isTaken ?
                                    <Text>Pris !</Text>
                                  : 
                                  <Text style={styles.medicationContainerTimeTake}>{med.timeToTake.replace(':', 'h')}</Text>
                                }
                              </View>
                              <View style={styles.medicationContainerDetails}>
                                <TouchableOpacity style={styles.medicationContainerDetailsButton} onPress={() => navigation.navigate('TreatmenDetails', { medication: med, selectedDate: selectedDate.toISOString().slice(0,10)})}>
                                  <Text style={styles.medicationContainerDetailsButtonText}>Consulter</Text>
                                </TouchableOpacity>
                              </View>
                          </View>
                      ))}
                    </ScrollView>
                  </View>
              }
            </View>
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
