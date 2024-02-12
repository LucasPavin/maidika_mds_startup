import React, { useEffect, useState, useRef } from 'react';
import { View, Alert, FlatList, Text, TextInput, ActivityIndicator, Image, TouchableOpacity, Linking, Animated } from 'react-native';
import * as Location from 'expo-location';
import { getDistance } from 'geolib';
import pharmaciesData from './json/pharmacies.json'
import Button from '../../components/Button'
import Header from '../../components/Header';
import styles from './styles';
import LottieView from 'lottie-react-native';

const proj4 = require('proj4');
const mercator = 'EPSG:3857';
const wgs84 = 'EPSG:4326';

export const convertToPoint = (geom) => {
  const match = geom.match(/POINT \(([^ ]+) ([^ ]+)\)/);
  if (match) {
    const [, x, y] = match;
    const [longitude, latitude] = proj4(mercator, wgs84, [parseFloat(x), parseFloat(y)]);
    return { latitude, longitude };
  }
  return { latitude: 0, longitude: 0 };
}
// Fonction pour vérifier l'ouverture ou la fermeture d'une pharmacie
export const daysFullNames = {
  'Su': 'dimanche',
  'Mo': 'lundi',
  'Tu': 'mardi',
  'We': 'mercredi',
  'Th': 'jeudi',
  'Fr': 'vendredi',
  'Sa': 'samedi'
};
export const isOpenNow = (openingHours) => {
  if (typeof openingHours !== 'string') {
    return 'Les horaires n\'ont pas été renseignés.';
  }
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 est Dimanche, 1 est Lundi, etc.
  const currentTime = now.getHours() * 60 + now.getMinutes();
  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  
  const formattedOpeningHours = openingHours.split(';').map(entry => entry.trim());
  
  let currentDaySchedule = null;
  let tomorrowSchedule = null;
  let foundToday = false;
  
  // Recherche de l'horaire d'aujourd'hui et de demain
  for (let schedule of formattedOpeningHours) {
    const dayRange = schedule.substring(0, schedule.indexOf(' '));
    const daysOpen = parseDayRange(dayRange);
    if (daysOpen.includes(days[dayOfWeek])) {
      currentDaySchedule = schedule;
      foundToday = true;
    } else if (foundToday && !tomorrowSchedule) {
      tomorrowSchedule = schedule;
    }
  }

  // Trouver l'horaire pour aujourd'hui et vérifier si la pharmacie est ouverte
  if (currentDaySchedule) {
    const times = currentDaySchedule.match(/\d{2}:\d{2}/g);
    for (let i = 0; i < times.length; i += 2) {
      const openingTime = getMinutesFromTime(times[i]);
      const closingTime = getMinutesFromTime(times[i + 1]);
      if (currentTime >= openingTime && currentTime < closingTime) {
        return `Ouverte. Ferme à ${times[i + 1]}.`;
      } else if (currentTime < openingTime) {
        return `Fermée. Ouvre à ${times[i]}.`;
      }
    }
  }
  
  // Trouver l'horaire pour le prochain jour d'ouverture
  if (tomorrowSchedule) {
    const openingTime = tomorrowSchedule.match(/\d{2}:\d{2}/g)[0];
    const nextDayAbbreviation = days[(dayOfWeek + 1) % 7];
    const nextDayFullName = daysFullNames[nextDayAbbreviation];
    return `Ouvre à ${openingTime} ${nextDayFullName}.`;
  } else {
    return 'Les horaires n\'ont pas été renseignés.';
  }
};
export const parseDayRange = (dayRange) => {
  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  if (dayRange.includes('-')) {
    const [start, end] = dayRange.split('-').map(day => days.indexOf(day));
    if (start <= end) {
      return days.slice(start, end + 1);
    } else {
      return days.slice(start, days.length).concat(days.slice(0, end + 1));
    }
  } else {
    return [dayRange];
  }
};
export const getMinutesFromTime = (timeString) => {
  if (!timeString) {
    console.error('timeString is undefined');
    return;
  }

  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
};
// rendre l'appel possible
export const makeCall = (phoneNumber) => {
  let cleanedPhoneNumber = phoneNumber.replace(/\s+/g, '').replace(/-+/g, '');
  if (cleanedPhoneNumber) {
    const url = `tel:${cleanedPhoneNumber}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          console.log("Impossible de gérer le numéro de téléphone : " + cleanedPhoneNumber);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error('Une erreur s\'est produite', err));
  }
};
// rendre l'email
export const sendEmail = (emailAddress) => {
  const url = `mailto:${emailAddress}`;
  Linking.canOpenURL(url)
    .then((supported) => {
      if (!supported) {
        console.log("Impossible de gérer l'e-mail: " + emailAddress);
      } else {
        return Linking.openURL(url);
      }
    })
    .catch((err) => console.error('Une erreur s\'est produite: ', err));
};
// Fonction qui retourne le numéro de téléphone au bon format
export const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) {
    return 'Numéro non renseigné.';
  }
  // Supprimer les espaces et les tirets si présents
  let cleaned = ('' + phoneNumber).replace(/\s+/g, '').replace(/-+/g, '');
  // Gérer le formatage pour les numéros français
  if (cleaned.match(/^\+33/)) {
    // Supprimer le préfixe +33
    cleaned = cleaned.substring(3);
    // Ajouter un 0 au début
    cleaned = '0' + cleaned;
  }
  // Insérer des espaces tous les deux chiffres
  const formatted = cleaned.match(/.{1,2}/g).join(' ');

  return formatted;
}

const ListDrugStore = ({navigation}) => {
  const [pharmacies, setPharmacies] = useState([]);
  const [userPosition, setUserPosition] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // Nombre de kilomètres autour de l'utilisateur pour trouver les pharmacies
  const perimeter = 5;

  // Animation sur le texte "Géolocalisation en cours..."
  const fadeAnim = useRef(new Animated.Value(0)).current; 


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      let location;
      try {
        location = await Location.getCurrentPositionAsync({});
      } catch (error) {
        console.log(error);
        return;
      }
      setUserPosition(location.coords);
    })();
  }, []);

  useEffect(() => {
    if (userPosition) {
      setIsLoading(true);
      const pharmaciesNearUser = pharmaciesData
        .map(pharmacy => {
          const { latitude, longitude } = convertToPoint(pharmacy.the_geom);
          return { 
            ...pharmacy,
            latitude,
            longitude,
            phoneNumber: pharmacy.phone ? formatPhoneNumber(pharmacy.phone) : 'Non disponible', // Vérifiez si pharmacy.phone n'est pas undefined
            email: pharmacy.email,
          };
        })
        .filter(pharmacy => {
          const distance = getDistance(
            { latitude: pharmacy.latitude, longitude: pharmacy.longitude },
            userPosition
          );
          return distance <= (perimeter * 1000);
        });

      setPharmacies(pharmaciesNearUser);      
      setIsLoading(false);
    }
  }, [userPosition]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(
          fadeAnim,
          {
            toValue: 1,
            duration: 2000, 
            useNativeDriver: true, 
          }
        ),
        Animated.timing(
          fadeAnim,
          {
            toValue: 0, 
            duration: 2000, 
            useNativeDriver: true, 
          }
        ),
      ]),
      {
        iterations: -1, 
      }
    ).start(); 
  }, [fadeAnim]) 

  return (
    <>
      <Header/>
      <View style={styles.container}>
        <View style={styles.containerTop}>
          <TextInput
            style={styles.containerTopInput}
            inlineImageLeft='search_icon'
            placeholder='Pharmacie à proximité'
          />
          {
            isLoading ? 
              <ActivityIndicator size="large" color="#496699" /> 
              : 
              <>
                <TouchableOpacity onPress={() => navigation.navigate('MapsLocation', { userPosition })}>
                  <View style={styles.maps}>
                    <Image source={require('../../assets/pharmacies/maps.png')} resizeMode="cover"/>
                    <Text>La carte</Text>
                  </View>
                </TouchableOpacity>
              </>
          }
        </View>
        <View style={styles.containerBottom}>
          {
            isLoading ? 
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <LottieView
                    source={require('../../assets/animations/pharmacy.json')}
                    autoPlay={true}
                    loop={false}
                    speed={1} 
                    style={{width: 100, height: 100}}
                />
                <Animated.Text
                  style={{
                    opacity: fadeAnim,  // Relier l'opacité à l'état animé
                    fontSize: 28,
                  }}>
                  Géolocalisation en cours...
                </Animated.Text>
              </View>
              : 
              <>
                <Text style={styles.results}>{pharmacies.length} pharmacies trouvées à moins de {perimeter}km :</Text>
                <FlatList
                data={pharmacies}
                renderItem={
                  ({ item }) => 
                  <View style={styles.list}>
                    <View style={styles.flastListLeft}>
                      <Text style={styles.leftTitle}>{item.name}</Text>
                      <Text>{isOpenNow(item.opening_hours)}</Text>
                    </View>
                    <View style={styles.flastListRight}>
                      {
                        item.phone ? 
                        <View>
                          <TouchableOpacity onPress={() => makeCall(item.phone)}>
                            <Image width={40} source={require('../../assets/pharmacies/drugStores/phone.png')}/>
                          </TouchableOpacity>
                        </View>
                        : null
                      }
                      {
                        item.email ? 
                        <View>
                          <TouchableOpacity onPress={() => sendEmail(item.email)}>
                            <Image width={40} source={require('../../assets/pharmacies/drugStores/mail.png')}/>
                          </TouchableOpacity>
                        </View>
                        : null
                      }
                    </View>
                  </View>
                }/>
              </>
          }
        </View>
      </View>
    </>
  );
};

export default ListDrugStore;