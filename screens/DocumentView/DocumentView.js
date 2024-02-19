import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Header from '../../components/Header';
import { styles } from './styles';
import Button from '../../components/Button';
import ScanDocument from '../ScanDocument/ScanDocument';

const DocumentView = ({ navigation, route }) => {

  const { user } = route.params;
  console.log(user.fName);
  return (
    <View>
      <Header />
      <View style={styles.container}>
        <View style={styles.containerGoBack}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../assets/goBack.png')}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity>
            <Button type='blue' onPress={() => navigation.navigate('ScanDocument')}>Scanner votre ordonnance</Button>
          </TouchableOpacity>
        </View>
        <View>
          <View>
            <Text>Ordonnace pour {user.fName}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default DocumentView