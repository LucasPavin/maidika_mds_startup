import React from "react";
const { View, Image, Text } = require("react-native")
import styles from "./styles";
import ButtonBoarding from "../../components/ButtonBoarding";

const OnBoarding = ({navigation}) => {
    return ( 
        <View style={styles.container}>
            <View style= {{flex: 1}}>
                <Image style={styles.image} source={require('../../assets/OnBoarding.jpg')}/>

                <View style={ styles.footer}></View>
            </View>

           <View style={styles.content}>
                <Text style={styles.title}>Maïdika</Text>
                <Text style={styles.subtitle}>Gardez votre santé en main avec Maidika !</Text>
                <ButtonBoarding type={'blue'} onPress={() => navigation.replace('Login')}>Se connecter</ButtonBoarding>
                <ButtonBoarding onPress={() => navigation.replace('Register')}>S’inscrire</ButtonBoarding>
           </View>
        </View>
    )
}

export default React.memo(OnBoarding);