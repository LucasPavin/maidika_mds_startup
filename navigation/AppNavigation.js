import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SecureStore from 'expo-secure-store';
import Colors from '../constants/Colors';
import OnBoarding from '../screens/OnBoarding/OnBoarding';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import Settings from '../screens/Settings/Settings';
import ModifyInformation from '../screens/Settings/ModifyInformation/ModifyInformation';
import ListDrugStore from '../screens/DrugStore/ListDrugStore';
import MapsLocation from '../screens/DrugStore/MapsLocation/MapsLocation';
import DocumentView from '../screens/DocumentView/DocumentView';
import ScanDocument from '../screens/ScanDocument/ScanDocument';
import Treatmen from '../screens/Treatmen/Treatmen';
import AddTreatmen from '../screens/Treatmen/AddTreatmen/AddTreatmen';
import ValidAddTreatmen from '../screens/Treatmen/ValidAddTreatmen/ValidAddTreatmen';
import TreatmenDetails from '../screens/Treatmen/TreatmenDetails/TreatmenDetails';
import InsertPrescription from '../screens/ScanDocument/InsertPrescription/InsertPrescription';
import DrugView from '../screens/DrugView/DrugView';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

//array for custom bottom tab navigation.
const tabs = [
    {
        name: 'Accueil',
        component: HomeScreen,
        source: require('../assets/icons/home.png'),
        styles_logo: {
            width: 25,
            height: 25,
        },
        styles_name: {
            fontSize: 12
        },
    },
    {
        name: 'Traitement',
        component: Treatmen,
        source: require('../assets/icons/pillule.png'),
        styles_name: {
            fontSize: 14
        },
    },
    {
        name: 'Ordonnances',
        component: DocumentView,
        source: require('../assets/images/b3.png'),
        styles_logo: {
            width: 25,
            height: 25,
        },
        styles_name: {
            fontSize: 14
        },
    },
    {
        name: 'Pharmacies',
        component: ListDrugStore,
        source: require('../assets/images/b4.png'),
        styles_logo: {
            width: 25,
            height: 25,
        },
        styles_name: {
            fontSize: 14
        },
    },
    {
        name: 'Mon profil',
        component: Settings,
        source: require('../assets/images/b5.png'),
        styles_logo: {
            width: 25,
            height: 25,
        },
        styles_name: {
            fontSize: 12
        },
    },
];

function TabNavigator() {
    return (
        <Tabs.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    position: 'absolute',
                    left: 20,
                    right: 20,
                    elevation: 0,
                    height: 60,
                    backgroundColor: '#ECECEC',
                    borderRadius: 15,
                    borderTopWidth: 0,
                    marginBottom: 30,
                    paddingBottom: 5,
                    ...styles.shadow
                },
                tabBarIcon: ({ focused }) => {
                    const tab = tabs.find((tab) => tab.name === route.name);

                    return (
                        <View style={{ ...tab.styles_name, color : focused ? '#496699' : "#44474B", display: 'flex', justifyContent: 'center' }}>
                            <Image
                                source={tab.source}
                                style={{ 
                                    ...tab.styles_logo,
                                    ...tab.styles_name,
                                    tintColor: focused ? '#496699' : "#44474B"
                                }}
                            />
                        </View>
                    );
                },
                backgroundColor: '#ccc',
                marginBottom: 10,
            })}
        >
            {tabs.map((tab) => (
                <Tabs.Screen key={tab.name} name={tab.name} component={tab.component} />
            ))}
        </Tabs.Navigator>
    );
}

const AppNavigation = () => {
    
    const [initialRoute, setInitialRoute] = useState('OnBoarding'); // Définir la route initiale à 'Login'

    const getToken = async () => {
        const token = await SecureStore.getItemAsync('userToken');
        return token;
    };
    useEffect(() => {
        const initializeAuth = async () => {
            const token = await getToken();
            if (token) {
                console.log(token, 'initialRoute');
            }
        };

        initializeAuth();
    }, []);


    
    return (
        <NavigationContainer>
            <View style={styles.container}>
                <Stack.Navigator initialRouteName={initialRoute}>
                        <Stack.Screen
                            name="Onboarding"
                            component={OnBoarding}
                            options={{
                                headerShown: false
                            }} />
                        <Stack.Screen
                            name="Register"
                            component={RegisterScreen}
                            options={{
                                headerShown: false
                            }} />
                        <Stack.Screen
                            name="Login"
                            component={LoginScreen}
                            options={{
                                headerShown: false
                            }} />
                        <Stack.Screen
                            name="Home"
                            component={TabNavigator}
                            options={{
                                headerShown: false
                            }}
                        />
                        <Stack.Screen
                            name="ListDrugStore"
                            component={TabNavigator}
                            options={{
                                headerShown: false
                            }}
                        />
                        <Stack.Screen
                            name="DocumentView"
                            component={DocumentView}
                            options={{
                                headerShown: false
                            }}
                        />
                        <Stack.Screen
                            name="ScanDocument"
                            component={ScanDocument}
                            options={{
                                headerShown: false
                            }}
                        />
                        <Stack.Screen
                            name="InsertPrescription"
                            component={InsertPrescription}
                            options={{
                                headerShown: false
                            }}
                        />
                        <Stack.Screen
                            name="MapsLocation"
                            component={MapsLocation}
                            options={{
                                headerShown: false
                            }}
                        />
                        <Stack.Screen
                            name="AddTreatmen"
                            component={AddTreatmen}
                            options={{
                                headerShown: false
                            }}
                        />
                        <Stack.Screen
                            name="ValidAddTreatmen"
                            component={ValidAddTreatmen}
                            options={{
                                headerShown: false
                            }}
                        />
                        <Stack.Screen
                            name="TreatmenDetails"
                            component={TreatmenDetails}
                            options={{
                                headerShown: false
                            }}
                        />
                        <Stack.Screen
                            name="ModifyInformation"
                            component={ModifyInformation}
                            options={{
                                headerShown: false
                            }}
                        />
                        <Stack.Screen
                            name="DrugView"
                            component={DrugView}
                            options={{
                                headerShown: false
                            }}
                        />
                </Stack.Navigator>
            </View>
        </NavigationContainer>
    )
};
export default AppNavigation;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white,
    },
    shadow : {
        shadowColor: '#F2F2F2',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
    }
});
