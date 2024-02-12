import LottieView from 'lottie-react-native';
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from '../../../components/Button';
import { styles } from './styles';

const ValidAddTreatmen = ({navigation}) => {
  return (
    <View style={styles.container}>
        <LottieView
            source={require('../../../assets/animations/validate.json')}
            autoPlay={true}
            loop={false}
            speed={0.5} 
            style={{width: 200, height: 200}}
        />
        <View>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white', marginTop: 20}}>Votre traitement a été ajouté</Text>
        </View>
        <View>
            <Button onPress={() => navigation.navigate("Traitement")}>Vos traitements</Button>
        </View>
    </View>
  )
}

export default ValidAddTreatmen
