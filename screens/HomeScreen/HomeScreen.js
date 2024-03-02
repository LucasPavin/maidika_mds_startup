import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Alert, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';

import Colors from '../../constants/Colors';
import GlobalData from '../../utils/GlobalData';
import ButtonTreatmenDetails from '../../components/ButtonTreatmenDetails';

const HomeScreen = () => {
    const navigation = useNavigation();
    const user = GlobalData?.user;
    const [toggle, setToggle] = useState(false);

    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const currentDay = days[new Date().getDay()];
    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    const currentDate = new Date().getDate();
    const currentMonth = months[new Date().getMonth()];

    const handleToggle = () => {
        setToggle(!toggle);
    };

    const handleLogout = () => {
        GlobalData.user = null;
        navigation.replace('Login');
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={handleLogout}>
                    <Image
                        source={require('../../assets/images/deconnection.png')}
                        style={styles.image}
                    />
                    <Text>Déconnexion</Text>
                </TouchableOpacity>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../../assets/images/Maidika2.png')}
                        style={[styles.image, styles.secondImage]}
                    />
                    <Switch
                        trackColor={{ true: Colors.blue, true: "#767577" }}
                        thumbColor={toggle ? Colors.teal : Colors.blue}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={handleToggle}
                        value={toggle}
                    />
                </View>
            </View>
            <ScrollView style={styles.bodyContainer}>
                <View style={styles.profileContainer}>
                    <View style={styles.leftProfile}>
                        <Text style={styles.welcome}>Bonne journée,</Text>
                        <Text style={styles.nameData}>{user.name} {user.fName}</Text>
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

                        <TouchableOpacity style={styles.subRight} onPress={() => navigation.navigate('ModifyInformation')}>
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
                        <View style={styles.medEntry}>
                            <View style={styles.medImageContainer}>
                                <Image
                                    source={require('../../assets/images/aspirine.png')}
                                    style={styles.medImage}
                                />
                            </View>
                            <View style={styles.medDetails}>
                                <Text style={styles.medName}>Aspirine</Text>
                                <Text style={styles.medDescription}>1 pilule</Text>
                                <Text style={styles.medAdditionalInfo}>10h00</Text>
                            </View>
                        </View>
                        <View style={styles.medEntry}>
                            <View style={styles.medImageContainer}>
                                <Image
                                    source={require('../../assets/images/doliprane.png')}
                                    style={styles.medImage}
                                />
                            </View>
                            <View style={styles.medDetails}>
                                <Text style={styles.medName}>Doliprane</Text>
                                <Text style={styles.medDescription}>3 gelules</Text>
                                <Text style={styles.medAdditionalInfo}>19h00</Text>
                            </View>
                        </View>
                    </View>

                </View>
                <View style={styles.thirdContainer}>
                    <TouchableOpacity style={styles.leftContainer} onPress={() => navigation.navigate('DocumentView',  { user: user })}>
                        <View style={styles.blockImageBlue}>
                            <Image
                                source={require('../../assets/images/add-photo.png')}
                            />
                        </View>
                        <View style={styles.leftBottomTextContainer}>
                            <Text style={styles.bottomText}>Scanner votre ordonnance</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.rightContainer}>
                        <View style={styles.blockImageYellow}>
                            <Image
                                source={require('../../assets/images/bell.png')}
                            />
                        </View>
                        <View style={styles.rightBottomTextContainer}>
                            <Text style={styles.bottomText}>Scanner votre ordonnance</Text>
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
