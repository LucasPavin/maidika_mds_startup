import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Colors from '../constants/Colors';

const TextInputComponent = ({ placeholder, autocapitalize, keyboardType, secureTextEntry, value, onChangeText, style }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder={placeholder}
                placeholderTextColor={'#ccc'}
                autocapitalize={autocapitalize}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry && !isPasswordVisible}
                value={value}
                onChangeText={onChangeText}
                style={[styles.textInput, style]}
            />
            {secureTextEntry && (
                <TouchableOpacity style={styles.iconContainer} onPress={togglePasswordVisibility}>
                    <Icon name={isPasswordVisible ? 'eye' : 'eye-slash'} size={20} color="#ccc" />
                </TouchableOpacity>
            )}
        </View>
    );
}

export default TextInputComponent;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        borderBottomWidth: 0.8,
        borderColor: Colors.lightGrey,
    },
    textInput: {
        width: windowWidth * 0.875,
        height: windowHeight * 0.04,
        // height: 30,
        color: 'black',
        fontSize: 14,
        paddingHorizontal: windowWidth * 0.01
    },
    iconContainer: {
        position: 'absolute',
        right: 20,
        top: 5,
    },
});

