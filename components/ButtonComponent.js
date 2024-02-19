import React from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';

import Colors from '../constants/Colors';

const ButtonComponent = ({ children, style }) => {
    return (
        <Pressable style={styles.container}>
            <Text style={styles.textStyles}>{children}</Text>
        </Pressable>
    )
}
export default ButtonComponent;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        width: windowWidth * 0.7,
        height: windowHeight * 0.05,
        borderRadius: windowWidth * 0.02,
    },
    textStyles: {
        fontSize: 14,
        color: 'white',
        textAlign: 'center',
    }
});