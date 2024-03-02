import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { createUserTable, insertUser } from '../database/sqlite-database';
import Colors from '../constants/Colors';
import TextInputComponent from '../components/TextInputComponent';
import bcrypt from 'react-native-bcrypt';

const RegisterScreen = ({ navigation }) => {
    const [name, onChangeName] = useState('');
    const [fName, onChangeFName] = useState('');
    const [email, onChangeEmail] = useState('');
    const [phone, onChangePhone] = useState('');
    const [pass, onChangePass] = useState('');
    const [cpass, onChangeCPass] = useState('');
    const [avatar, setAvatar] = useState('');

    const [nameError, setNameError] = useState('');
    const [fNameError, setFNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [passError, setPassError] = useState('');
    const [cpassError, setCPassError] = useState('');
    const emailRegex = /\S+@\S+\.\S+/;

    //user table is created whenever screen is rendered.
    useEffect(() => {
        createUserTable();
        const unsubscribe = navigation.addListener('focus', () => {
            onChangeName('');
            onChangeFName('');
            onChangeEmail('');
            onChangePhone('');
            onChangePass('');
            onChangeCPass('');
            setAvatar('');
            setNameError('');
            setFNameError('');
            setEmailError('');
            setPhoneError('');
            setPassError('');
            setCPassError('');
        });
        return unsubscribe;
    }, [navigation]);

    //validations for empty input fields.
    const handleNameChange = (text) => {
        onChangeName(text);
        if (text.trim() === "") {
            setNameError("Le nom est requis !");
        }
        else {
            setNameError("");
        }
    }
    const handleFNameChange = (text) => {
        onChangeFName(text);
        if (text.trim() === "") {
            setFNameError("Le prénom est requis !");
        }
        else {
            setFNameError("");
        }
    }
    const handleEmailChange = (text) => {
        onChangeEmail(text);
        if (text.trim() === "") {
            setEmailError("Le e-mail est requis !");
        } else if (!emailRegex.test(text)) {
            setEmailError("Adresse e-mail invalide !");
        } else {
            setEmailError("");
        }
    }

    const handlePhoneChange = (text) => {
        onChangePhone(text);
        if (text.trim() === "") {
            setPhoneError("Le téléphone est requis !");
        }
        else {
            setPhoneError("");
        }
    }
    const handlePassChange = (text) => {
        onChangePass(text);
        if (text.trim() === "") {
            setPassError("Mot de passe requis !");
        }
        else {
            setPassError("");
        }
    }
    const handleCPassChange = (text) => {
        onChangeCPass(text);
        if (text.trim() === "") {
            setCPassError("Confirmez que le mot de passe est requis !");
        }
        else {
            setCPassError("");
        }
    }
    
    function checkPasswords(pass, cpass) {
        return pass === cpass;
    }

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
    console.log(avatar);

    //function to handle input validations when button is pressed.
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
        if (email.trim() === "") {
            setEmailError("Le e-mail est requis !");
            isValid = false;
        } else if (!emailRegex.test(email)) {
            setEmailError("Adresse e-mail invalide !");
            isValid = false;
        } else {
            setEmailError("");
        }
        if (phone.trim() === "") {
            setPhoneError("Le téléphone est requis !");
            isValid = false;
        } else {
            setPhoneError("");
        }
        if (pass.trim() === "") {
            setPassError("Mot de passe requis !");
            isValid = false;
        } else {
            setPassError("");
        }
        if (cpass.trim() === "") {
            setCPassError("Confirmez que le mot de passe est requis !");
            isValid = false;
        } else {
            setCPassError("");
        }

        if (isValid) {
            console.log('Profile Image URI:', avatar);
            if (isValid && checkPasswords(pass, cpass)) {
                let salt = bcrypt.genSaltSync(10);
                let hashedPassword = bcrypt.hashSync(pass, salt);
                
                insertUser(name, fName, email, phone, hashedPassword, avatar)
                    .then(({ id, data }) => {
                        console.log('Inserted ID:', id);
                        console.log('Inserted data:', data);
        
                        Alert.alert('Success', 'Utilisateur enregistré avec succès !', [
                            {
                                text: 'OK',
                                onPress: () => {
                                    navigation.navigate('Login');
                                }
                            },
                        ]);
                    })
                    .catch((error) => {
                        console.error('Error inserting data:', error);
                        Alert.alert('Error', "Échec de l'enregistrement. Veuillez réessayer !", [
                            { text: 'OK' },
                        ]);
                    });
            } else {
                Alert.alert('Error', "Les mots de passe ne correspondent pas. Veuillez réessayer !", [
                    { text: 'OK' },
                ]);
            }
        }
        return isValid;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.headerContainer}>
                <Image source={require('../assets/images/Maidika-logo.png')} style={styles.logoStyles} />
                <Text style={styles.textStyles}>Inscription</Text>
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
                                <FontAwesome name="camera" color={Colors.lightGrey} />
                            </View>
                        )}
                        <Text style={styles.cameraText}>Ajouter votre photo</Text>
                    </TouchableOpacity>
                    <Text style={[styles.labelText, , { marginTop: 50 }]}>Prénom</Text>
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
                    <Text style={styles.labelText}>Nom</Text>
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
                    <Text style={styles.labelText}>Email</Text>
                    <TextInputComponent
                        placeholder='Votre email'
                        autocapitalize='none'
                        keyboardType='email-address'
                        secureTextEntry={false}
                        value={email}
                        onChangeText={handleEmailChange}
                        style={styles.inputField}
                    />
                    {emailError !== "" && <Text style={styles.errorText}>{emailError}</Text>}
                    <Text style={styles.labelText}>Numéro de téléphone</Text>
                    <TextInputComponent
                        placeholder='Votre numéro de téléphone'
                        autocapitalize='none'
                        keyboardType='phone-pad'
                        secureTextEntry={false}
                        value={phone}
                        onChangeText={handlePhoneChange}
                        style={styles.inputField}
                    />
                    {phoneError !== "" && <Text style={styles.errorText}>{phoneError}</Text>}
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
                    <Text style={styles.labelText}>Confirmation votre mot de passe</Text>
                    <TextInputComponent
                        placeholder='Retaper votre mot de passe'
                        autocapitalize='none'
                        keyboardType='default'
                        secureTextEntry={true}
                        value={cpass}
                        onChangeText={handleCPassChange}
                        style={styles.inputField}
                    />
                    {cpassError !== "" && <Text style={styles.errorText}>{cpassError}</Text>}
                </View>
                <TouchableOpacity style={styles.btnContainer} onPress={() => {
                    if (handleValidation() && checkPasswords(pass, cpass)) {
                        navigation.navigate('Login')
                    }
                    else {
                        Alert.alert("Merci de remplir tous les champs obligatoires !")
                    }
                }}>
                    <Text style={styles.textStyle}>S'inscrire</Text>
                </TouchableOpacity>
            </View>
        </ScrollView >
    );
}

export default RegisterScreen;

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
        fontSize: 30,
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


