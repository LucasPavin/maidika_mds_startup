import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import Colors from '../constants/Colors';
import TextInputComponent from '../components/TextInputComponent';
import { updateUser } from '../database/sqlite-database';

const ModifyInformation = () => {
    const [name, onChangeName] = useState('');
    const [fName, onChangeFName] = useState('');
    const [pass, onChangePass] = useState('');
    const [avatar, setAvatar] = useState(null);

    const [nameError, setNameError] = useState('');
    const [fNameError, setFNameError] = useState('');
    const [passError, setPassError] = useState('');

    const handleNameChange = (text) => {
        onChangeName(text);
        if (text.trim === "") {
            setNameError("Le nom est requis !");
        }
        else {
            setNameError("");
        }
    }
    const handleFNameChange = (text) => {
        onChangeFName(text);
        if (text.trim === "") {
            setFNameError("Le prénom est requis !");
        }
        else {
            setFNameError("");
        }
    }
    const handlePassChange = (text) => {
        onChangePass(text);
        if (text.trim === "") {
            setPassError("Mot de passe requis !");
        }
        else {
            setPassError("");
        }
    }

    const handleValidation = () => {
        let isValid = true;

        if (name.trim() === "") {
            setNameError("Le nom est requis !");
            isValid = false;
        } else {
            setNameError("");
        }
        if (fName.trim() === "") {
            setFNameError("Le prénom est requis !");
            isValid = false;
        } else {
            setFNameError("");
        }
        if (pass.trim() === "") {
            setPassError("Mot de passe requis !");
            isValid = false;
        } else {
            setPassError("");
        }
        return isValid;
    }

    //function to handle form submission
    const handleUpdateUser = async () => {
        if (handleValidation()) {
            try {
                //calling the updateUser function with updated information
                await updateUser(name, fName, pass);
                Alert.alert("User information updated successfully!");
            } catch (error) {
                Alert.alert("Error updating user information!");
            }
        } else {
            Alert.alert("Merci de remplir tous les champs obligatoires !");
        }
    };

    //function to handle image picker logic.
    const handleImagePicker = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setAvatar(result.assets[0].uri);
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.headerContainer}>
                <Image source={require('../assets/images/Maidika-logo.png')} style={styles.logoStyles} />
                <Text style={styles.textStyles}>Modifier les informations</Text>
            </View>
            <View style={styles.bodyContainer}>
                <View style={styles.formContainer}>
                    <TouchableOpacity
                        style={[
                            styles.cameraContainer,
                            { left: avatar ? windowWidth * 0.27 : (windowWidth - 180) / 2 }
                        ]}
                        onPress={handleImagePicker}
                    >
                        {avatar ? (
                            <Image source={{ uri: avatar }} style={styles.avatarImage} />
                        ) : (
                            <View style={styles.cameraIconContainer}>
                                <FontAwesome name="camera" size={24} color={Colors.lightGrey} />
                            </View>
                        )}
                        <Text style={styles.cameraText}>Ajouter votre photo</Text>
                    </TouchableOpacity>

                    <Text style={[styles.labelText, { marginTop: 50 }]}>Nom</Text>
                    <TextInputComponent
                        placeholder='Votre nom'
                        autocapitalize='words'
                        keyboardType='default'
                        secureTextEntry={false}
                        value={name}
                        onChangeText={handleNameChange}
                        style={styles.inputField}
                    />
                    {nameError !== "" && <Text style={styles.errorText}>{nameError}</Text>}
                    <Text style={styles.labelText}>Prénom</Text>
                    <TextInputComponent
                        placeholder='Votre prénom'
                        autocapitalize='words'
                        keyboardType='default'
                        secureTextEntry={false}
                        value={fName}
                        onChangeText={handleFNameChange}
                        style={styles.inputField}
                    />
                    {fNameError !== "" && <Text style={styles.errorText}>{fNameError}</Text>}
                    <Text style={styles.labelText}>Mot de passe:</Text>
                    <TextInputComponent
                        placeholder='Entrez votre mot de passe'
                        autocapitalize='none'
                        keyboardType='default'
                        secureTextEntry={true}
                        value={pass}
                        onChangeText={handlePassChange}
                        style={styles.inputField}
                    />
                    {passError !== "" && <Text style={styles.errorText}>{passError}</Text>}
                </View>
                <TouchableOpacity style={styles.btnContainer} onPress={handleUpdateUser}>
                    <Text style={styles.textStyle}>Modifier</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
};
export default ModifyInformation;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    headerContainer: {
        width: windowWidth,
        height: windowHeight * 0.3,
        backgroundColor: Colors.blue,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoStyles: {
        marginTop: windowHeight * 0.08,
        marginHorizontal: windowWidth * 0.4,
    },
    textStyles: {
        fontSize: 20,
        color: 'white',
        marginTop: windowHeight * 0.04,
        textAlign: 'center',
    },
    bodyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    formContainer: {
        backgroundColor: 'white',
        borderRadius: windowWidth * 0.05,
        padding: windowWidth * 0.05,
        borderColor: 'white',
        borderWidth: 1,
        width: windowWidth * 0.8,
        marginBottom: windowHeight * 0.02,
        marginTop: windowHeight * 0.04,
        position: 'relative',
    },
    cameraContainer: {
        position: 'absolute',
        top: -25,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    cameraIconContainer: {
        backgroundColor: Colors.grey,
        width: 80,
        height: 80,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    cameraText: {
        fontSize: 12,
        color: Colors.lightGrey,
        textAlign: 'center',
    },
    labelText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: windowHeight * 0.01,
    },
    inputField: {
        fontSize: 14,
        borderRadius: windowWidth * 0.02,
        paddingBottom: windowHeight * 0.01,
        paddingHorizontal: windowWidth * 0.1,
    },
    btnContainer: {
        width: windowWidth * 0.5,
        height: windowHeight * 0.06,
        borderRadius: windowWidth * 0.02,
        backgroundColor: Colors.blue,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: windowHeight * 0.03,
    },
    textStyle: {
        fontSize: 16,
        color: 'white',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginHorizontal: windowWidth * 0.001,
    },
});


