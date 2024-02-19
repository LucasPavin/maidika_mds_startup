import React, {useState, useEffect} from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import pharmaciesData from './../json/pharmacies.json'
import { getDistance } from 'geolib';
import { View, Text, Image, TouchableOpacity, Dimensions, Linking } from 'react-native';
import Button from '../../../components/Button';
import styles from './styles';
import { formatPhoneNumber, isOpenNow, makeCall, convertToPoint,  } from './../ListDrugStore';

const MapsLocation = ({navigation , route}) => {

  const { userPosition } = route.params;


  const pharmaciesNearRennes = pharmaciesData
    .map(pharmacy => {
      const { latitude, longitude } = convertToPoint(pharmacy.the_geom);
      return { ...pharmacy, latitude, longitude };
    })
    .filter(pharmacy => {
      const distance = getDistance(
        { latitude: pharmacy.latitude, longitude: pharmacy.longitude },
        userPosition
      );
      return distance <= 10000; 
    });

  const screenWidth = Dimensions.get('window').width;
  
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [address, setAddress] = useState('');

  const handleMarkerPress = (pharmacy) => {
    setSelectedPharmacy(pharmacy);    
    getAddressFromCoordinates(pharmacy.latitude, pharmacy.longitude); // Récupérer l'adresse pour la pharmacie sélectionnée
  };
  // Récupération localisation selon la latitude et la longitude
  const getAddressFromCoordinates = async (latitude, longitude) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data && data.address) {
        // Construisez l'adresse en fonction des éléments disponibles dans data.address
        const { road, house_number, city, postcode, village } = data.address;
        const fullAddress = `${house_number ? house_number + ' ' : ''}${road ? road + ', ' : ' '}${postcode ? postcode + ' ' : ' '}${city ? city : village}`;
        setAddress(fullAddress);  // Mettre à jour l'état de l'adresse
      } else {
        setAddress('Adresse non trouvée');
      }
    } catch (error) {
      console.error(error);
      setAddress('Erreur lors de la récupération de l\'adresse');
    }
  };

  // Accéder au site web
  const openWebsite = (websiteUrl) => {
    Linking.canOpenURL(websiteUrl)
      .then((supported) => {
        if (!supported) {
          console.log("Impossible de d'ouvrir l'URL:  " + websiteUrl);
        } else {
          return Linking.openURL(websiteUrl);
        }
      })
      .catch((err) => console.error('Une erreur s\'est produite: ', err));
  };


  return (
    <View style={styles.container}>
      <MapView
        style={styles.maps}
        initialRegion={{
          latitude: userPosition.latitude,
          longitude: userPosition.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider={'google'}
        minZoomLevel={12.5}
        showsCompass={false}
      >
      <View style={styles.containerBack}>
        <TouchableOpacity style={styles.goBack} onPress={() => navigation.goBack()}>                     
            <Image class={styles.backImage} width={20} height={20} source={require('../../../assets/goBack.png')}/>
        </TouchableOpacity>
      </View>
      <Marker coordinate={userPosition} title='Votre localisation'>
        <View style={styles.user}>
          <View style={styles.userPosition}>
            <View style={styles.userPositionCircle}></View>
          </View>
        </View>
        {/* <Image width={10} height={16} source={require('../../../assets/pin-blue.png')}/> */}
      </Marker>
      {pharmaciesNearRennes.map(pharmacy => (
        <Marker
          key={pharmacy.FID}
          coordinate={{
            latitude: pharmacy.latitude,
            longitude: pharmacy.longitude,
          }}
          onPress={() => handleMarkerPress(pharmacy)}
        >
          <View>
          { selectedPharmacy && selectedPharmacy.FID === pharmacy.FID ? 
            <Image width={10} height={16} source={require('../../../assets/pin-blue.png')}/>
            : <Image width={10} height={16} source={require('../../../assets/pin.png')}/>
          }
          </View>
        </Marker>
      ))}
      <View>

      </View>
      </MapView>
        {selectedPharmacy && (
          <View >
            <View style={[styles.fixedCalloutContainer, { zIndex: 2 }]}>
              <View style={styles.bubble}>
                <View style={styles.topSection}>
                  <View style={styles.close}>
                    <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedPharmacy(null)}>
                      <Text style={styles.closeButtonText}>X</Text>
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.pharmacyName}>{selectedPharmacy.name}</Text>
                  <View style={styles.shedule}>
                    <Image style={styles.image} source={require('../../../assets/pharmacies/shedule.png')}/>
                    <Text>{isOpenNow(selectedPharmacy.opening_hours)}</Text>
                  </View>
                  <View style={styles.phone}>
                    <Image style={styles.image} source={require('../../../assets/pharmacies/phone.png')}/>
                    <Text style={styles.phoneNumber}>{formatPhoneNumber(selectedPharmacy.phone)}</Text>
                  </View>
                  <View style={styles.email}>
                    <Image style={styles.image} source={require('../../../assets/pharmacies/mail.png')}/>
                    {selectedPharmacy.email ? (
                      <TouchableOpacity onPress={() => sendEmail(selectedPharmacy.email)}>
                        <Text style={styles.emailAddress}>{selectedPharmacy.email}</Text>
                      </TouchableOpacity>
                    ) : (
                      <Text>Email non renseignée.</Text>
                    )}
                  </View>
                  <View style={styles.website}>
                    <Image style={styles.image} source={require('../../../assets/pharmacies/siteweb.png')}/>
                    {selectedPharmacy.website ? (
                      <TouchableOpacity onPress={() => openWebsite(selectedPharmacy.website)}>
                        <Text style={styles.websiteText}>Accéder au site</Text>
                      </TouchableOpacity>
                    ) : (
                      <Text>Site web non fourni.</Text>
                    )}
                  </View>
                  {selectedPharmacy.phone ? (
                    <View style={styles.buttonContact}>
                      <Button type='blue' onPress={() => makeCall(selectedPharmacy.phone)}>Appel téléphonique</Button>
                    </View>
                  ) : null}
                </View>
                {
                  address ?
                  <>
                    <View style={styles.addressSection}>
                      <Text style={styles.pharmacyName}>Adresse</Text>
                      <Text>{address}</Text>
                    </View>
                  </> : 
                  null
                }
              </View>
            </View>
          </View>
        )}
    </View>
  );
};

export default MapsLocation;
