import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Colors from '../constants/Colors';
import OnBoarding from '../screens/OnBoarding/OnBoarding';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import Traitement from '../screens/Traitement';
import MonProfil from '../screens/MonProfil';
import ModifyInformation from '../screens/ModifyInformation';
import ListDrugStore from '../screens/DrugStore/ListDrugStore';
import MapsLocation from '../screens/DrugStore/MapsLocation/MapsLocation';
import DocumentView from '../screens/DocumentView/DocumentView';
import ScanDocument from '../screens/ScanDocument/ScanDocument';
import Treatmen from '../screens/Treatmen/Treatmen';
import AddTreatmen from '../screens/Treatmen/AddTreatmen/AddTreatmen';

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
        styles_logo: {
            width: 25,
            height: 25,
        },
        styles_name: {
            fontSize: 12
        },
    },
    {
        name: ' ',
        component: DocumentView,
        source: require('../assets/images/scan.png'),
        styles_logo: {
            alignItems: 'center',
            justifyContent:"center", 
            top: 15
        },
        styles_name: {
            fontSize: 12
        },
    },
    {
        name: 'ListDrugStore',
        component: ListDrugStore,
        source: require('../assets/images/b4.png'),
        styles_logo: {
            width: 25,
            height: 25,
        },
        styles_name: {
            fontSize: 12
        },
    },
    {
        name: 'Mon profil',
        component: MonProfil,
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
                    bottom: 25,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: '#ECECEC',
                    borderRadius: 15,
                    height: 60,
                    borderTopWidth: 0,
                    ...styles.shadow
                },
                tabBarIcon: ({ focused }) => {
                    const tab = tabs.find((tab) => tab.name === route.name);

                    return (
                        <View style={{ ...tab.styles_name, color : focused ? '#496699' : "#44474B" }}>
                            <Image
                                source={tab.source}
                                style={{ 
                                    ...tab.styles_logo,
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
    return (
        <NavigationContainer>
            <View style={styles.container}>
                <Stack.Navigator>
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
                        name="ModifyInformation"
                        component={ModifyInformation}
                    // options={{
                    //     headerShown: false
                    // }}
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
        elevation: 5
    }
});
