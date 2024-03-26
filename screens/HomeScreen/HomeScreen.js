import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Alert, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { isToday, isSameDay } from 'date-fns';
import { styles } from './styles';
import {fetchMedications} from '../../database/sqlite-database';
import Colors from '../../constants/Colors';
import GlobalData from '../../utils/GlobalData';

const HomeScreen = ({navigation}) => {
    const user = GlobalData?.user;
    const [toggle, setToggle] = useState(false);
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const currentDay = days[new Date().getDay()];
    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    const currentDate = new Date().getDate();
    const currentMonth = months[new Date().getMonth()];
    const [medications, setMedications] = useState([]);

    const handleToggle = () => {
        setToggle(!toggle);
    };

    const handleLogout = () => {
        GlobalData.user = null;
        navigation.replace('Onboarding');
    };
    
    const fetchMedicationsForToday = async () => {
        const userParse = typeof user === 'string' ? JSON.parse(user) : user;
    
        if(!userParse) {
            console.log('No user found');
            return;
        }
    
        const meds = await fetchMedications(userParse.id);
    
        if (!Array.isArray(meds)) {
          console.log('fetchMedications did not return an array');
          return;
        }
    
        const today = new Date();
        today.setHours(0, 0, 0, 0); 
    
        const medsForToday = meds.filter(med => {
            const dateToTake = new Date(med.startDate); 
            dateToTake.setHours(0, 0, 0, 0);
    
            return isSameDay(today, dateToTake);
        });
    
        setMedications(medsForToday.slice(0, 2));
    };
    
    useEffect(() => {
        fetchMedicationsForToday().catch(error => console.error(error));
    }, [user]); 
  
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', fetchMedicationsForToday);
        return unsubscribe;
      }, [navigation]);

    const medicationImages = {
        'Comprimé': require('../../assets/treatmen/comprimes.png'),
        'Géllule': require('../../assets/treatmen/gellule.png'),
        'Liquide': require('../../assets/treatmen/liquide.png'),
        'Crème': require('../../assets/treatmen/creme.png'),
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.headerContainerLogout} onPress={handleLogout}>
                    <Image
                        source={require('../../assets/images/deconnection.png')}
                        style={styles.image}
                    />
                    <Text style={styles.logout}>Déconnexion</Text>
                </TouchableOpacity>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../../assets/maidika_logo.png')}
                        style={[styles.image, styles.secondImage]}
                    />
                </View>
                <View style={styles.headerContainerLogout}>
                    <Switch
                        trackColor={{ false: Colors.lightGrey, true: Colors.lightGrey }}
                        thumbColor={toggle ? Colors.teal : Colors.blue}
                        ios_backgroundColor="#D5D5D5"
                        onValueChange={handleToggle}
                        value={toggle}
                    />
                    <Text style={styles.accessibilite}>{toggle ? 'Accessibilité: On' : 'Accessibilité: Off'}</Text>
                </View>
            </View>
            <ScrollView style={styles.bodyContainer}>
                <View style={styles.profileContainer}>
                    <View style={styles.leftProfile}>
                        <Text style={styles.welcome}>Bonne journée,</Text>
                        <Text style={styles.nameData}>{user.fName} {user.name}</Text>
                    </View>
                    <View style={styles.rightProfile}>
                        {
                            user.profileImage ? 
                            <Image
                                source={{ uri: user.profileImage }}
                                style={styles.profileImage}
                            />
                            :
                            <Image
                                source={require('../../assets/images/profile.png')}
                                style={styles.profileImage}
                            />
                        }

                        <TouchableOpacity style={styles.subRight} onPress={() => navigation.navigate('Mon profil')}>
                            <Text style={styles.profileText}>Mon Profil</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.secondContainer}>
                    <View style={styles.calendarContainer}>
                        <View style={styles.calendarContainerDay}>
                            <Text style={styles.calendarText}>{currentDay}</Text>
                        </View>
                        <View style={styles.calendarContainerDateMonth}>
                            <Text style={styles.calendarTextDate}>{currentDate}</Text>
                            <Text style={styles.calendarTextMonth}>{currentMonth}</Text>
                        </View>
                        <View style={styles.calendarContainerButton}>
                            <TouchableOpacity onPress={() => navigation.navigate('Traitement')}>
                                <View style={styles.calendarContainerButtonView}>
                                    <Text style={styles.tick}>Voir</Text>
                                </View>
                            </TouchableOpacity>
                        </View>   
                    </View>
                    <View style={styles.med}>
                        { medications.length > 0 ? (
                            medications.slice(0,2).map((med, index) => (
                                <View key={index} style={styles.medEntry}>
                                    <View style={styles.medImageContainer}>
                                        <Image style={{ width: 20, height: 20}} source={medicationImages[med.medicationType]} />
                                    </View>
                                    <View style={styles.medDetails}>
                                        <Text style={styles.medName}>{med.medicationName}</Text>
                                        <View style={styles.detailsMedInfo}>
                                            <Text style={styles.medDescription}>{med.dosage} {med.medicationType}</Text>
                                            <Text style={styles.medAdditionalInfo}>{med.timeToTake}</Text>
                                        </View>
                                    </View>
                                </View>
                            ))
                        ) : (
                            <View style={styles.noMedicationsMessage}>
                                <Text style={{textAlign: 'center'}}>Aucun médicament à prendre aujourd'hui.</Text>
                            </View>
                        )}
                    </View>
                </View>
                <View style={styles.thirdContainer}>
                    <TouchableOpacity style={styles.leftContainer} onPress={() => navigation.navigate('DocumentView',  { user: user })}>
                        <View style={styles.blockImageBlue}>
                            <Image
                                source={require('../../assets/images/documents.png')}
                            />
                        </View>
                        <View style={styles.leftBottomTextContainer}>
                            <Text style={styles.bottomText}>Mes ordonnances</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rightContainer}  onPress={() => navigation.navigate('DrugView')}>
                        <View style={styles.blockImageYellow}>
                            <Image
                                source={require('../../assets/images/drugs.png')}
                            />
                        </View>
                        <View style={styles.rightBottomTextContainer}>
                            <Text style={styles.bottomText}>Analyse de médicaments</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.drugContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('ListDrugStore')}> 
                        <Image
                            source={require('../../assets/images/map.png')}
                            style={styles.mapStyles}
                        />
                        <View style={styles.btn}>
                            <Text style={styles.btnText}>Trouver votre pharmacie</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
};
export default HomeScreen;
