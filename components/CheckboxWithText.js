import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Colors from '../constants/Colors';

const CheckboxWithText = ({ isChecked, onPress }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress}>
                <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
                    {isChecked && <Text style={styles.tick}>✓</Text>}
                </View>
            </TouchableOpacity>
            <Text style={styles.text}>Restez connecté</Text>
        </View>
    );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: Colors.lightGrey,
        marginTop: windowHeight * 0.02,
        marginHorizontal: windowWidth * 0.00,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: Colors.blue,
    },
    tick: {
        color: 'white',
        fontSize: 14,
    },
    text: {
        marginTop: windowHeight * 0.02,
        color: Colors.lightGrey,
    },
});

export default CheckboxWithText;
