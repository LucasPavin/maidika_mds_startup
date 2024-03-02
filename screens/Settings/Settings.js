import React from 'react';
import { View, Text } from 'react-native';
import Header from '../../components/Header';
import {styles} from './styles';

const Settings = () => {
    return (
        <>
            <Header/>
            <View style={styles.container}>
                <View style={styles.containerProfil}>
                    <Text style={styles.containerProfilText}>Profil</Text>
                </View>
            </View>
        </>
    )
};
export default Settings;