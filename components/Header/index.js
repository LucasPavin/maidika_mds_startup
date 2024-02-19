import React, { useState, useContext } from 'react';
import { View, Text, Image, Pressable, Switch, StyleSheet } from 'react-native';
import styles from './styles';

const Header = ({navigation}) => {

  return (
    <View style={styles.header}>
        <Image 
            source={require('../../assets/maidika_logo.png')} 
            resizeMode="contain"
            style={{
                width: 75,
                height: 75,
            }}
        />
    </View>
  );
};

export default Header;