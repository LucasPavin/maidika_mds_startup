import React from 'react';
import { View, Text, Linking, Image, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import {styles} from './styles';
import { MaterialIcons, Octicons, Fontisto, SimpleLineIcons } from '@expo/vector-icons';
import GlobalData from '../../utils/GlobalData';

const Settings = ({navigation}) => {
    const user = GlobalData?.user;

    
    const handleLogout = () => {
        GlobalData.user = null;
        navigation.replace('Login');
    };

    return (
        <>
            <Header/>
            <View style={styles.container}>
                <View style={styles.containerProfil}>
                    <Text style={styles.containerProfilText}>Profil</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('ModifyInformation')}>
                    <View style={styles.containerProfilInfo}>
                        <View style={styles.containerProfilLeft}>                        
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
                        </View>
                        <View style={styles.containerProfilRight}>
                            <Text style={styles.containerProfilRightName}>{user.fName} {user.name}</Text>
                            <Text style={styles.containerProfilRightProfil}>Personnaliser mon profil</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.containerLang}>
                    <Text style={styles.containerLangTitle}>Langue du profil</Text>
                    <View style={styles.containerLangContent}>
                        <View style={styles.containerLangLeft}>
                            <Fontisto name="world-o" size={16} color="black" />
                            <Text style={styles.containerLangText}>Langue</Text>
                        </View>
                        <View style={styles.containerLangRight}>
                            <Text style={styles.containerLangText}>FR</Text>
                            <MaterialIcons name="arrow-forward-ios" size={16} color="black" />
                        </View>
                    </View>
                </View>

                <View style={styles.containerList}>
                    <TouchableOpacity style={styles.containerListItem}>
                        <Text style={styles.containerListText} >
                            Centre d’aide
                        </Text>
                        <MaterialIcons name="arrow-forward-ios" size={16} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.containerListItem}>
                        <Text style={styles.containerListText} >
                            Paramètres des cookies
                        </Text>
                        <MaterialIcons name="arrow-forward-ios" size={16} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.containerListItem}>
                        <Text style={styles.containerListText} >
                            Informations légales
                        </Text>
                        <MaterialIcons name="arrow-forward-ios" size={16} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.containerListItem}>
                        <Text style={styles.containerListText} >
                            Politique de confidentialité
                        </Text>
                        <MaterialIcons name="arrow-forward-ios" size={16} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.containerListItem}>
                        <Text style={styles.containerListText} >
                            Conditions générales
                        </Text>
                        <MaterialIcons name="arrow-forward-ios" size={16} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.containerListItem}
                        onPress={() => Linking.openURL('https://pdvq8tdkxkq6.swipepages.net/Maidika')}
                    >
                        <Text style={styles.containerListTextLink} >
                            À propos de Maidika
                        </Text>
                        <Octicons name="link-external" size={16} color="black" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.logout} onPress={handleLogout}>
                    <SimpleLineIcons name="logout" size={16} color="black" />
                    <Text style={styles.logoutText}>Déconnexion</Text>
                </TouchableOpacity>
            </View>
        </>
    )
};
export default Settings;