// import React, { useState, useEffect } from 'react';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import { checkUserCredentials } from '../database/sqlite-database';
// import GlobalData from '../utils/GlobalData';
// import Colors from '../constants/Colors';
// import TextInputComponent from '../components/TextInputComponent';
// import CheckboxWithText from '../components/CheckboxWithText';

// const LoginScreen = () => {
//     const navigation = useNavigation();
//     const route = useRoute();

//     const [email, onChangeEmail] = useState('');
//     const [pass, onChangePass] = useState('');
//     const [rememberMe, setRememberMe] = useState(false);

//     useEffect(() => {
//         const unsubscribe = navigation.addListener('focus', async () => {
//             onChangeEmail('');
//             onChangePass('');

//             //checking is user is already logged in.
//             const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
//             if (isLoggedIn === 'true') {
//                 navigation.navigate('Home');
//             }
//         });
//         return unsubscribe;
//     }, []);

//     const handleSignIn = () => {
//         checkUserCredentials(email, pass)
//             .then((user) => {
//                 if (user) {
//                     console.log('Logged in as:', user);
//                     console.log('Name:', user.name);
//                     console.log('First Name:', user.fName);

//                     GlobalData.user = user;
//                     if (rememberMe) {
//                         AsyncStorage.setItem('isLoggedIn', 'true');
//                     }

//                     Alert.alert('Login Successful', 'Vous vous êtes connecté avec succès.', [
//                         {
//                             text: 'OK',
//                             onPress: () => {
//                                 navigation.navigate('Home', { user });
//                             }
//                         },
//                     ]);
//                 } else {
//                     Alert.alert('Login Failed', 'Email ou mot de passe invalide. Veuillez réessayer !', [
//                         {
//                             text: 'OK',
//                         },
//                     ]);
//                 }
//             })
//             .catch((error) => {
//                 console.log('Login error:', error);

//                 Alert.alert('Login Failed', "Une erreur s'est produite lors de la connexion. Veuillez réessayer !", [
//                     {
//                         text: 'OK',
//                     },
//                 ]);
//             });
//     }

//     return (
//         <View style={styles.container}>
//             <View style={styles.headerContainer}>
//                 <Image source={require('../assets/images/Maidika-logo.png')}
//                     style={styles.logoStyles}
//                 />
//                 <Text style={styles.headingTextStyles}>Connexion</Text>
//             </View>
//             <View style={styles.bodyContainer}>
//                 <Text style={styles.subHeadingTextStyles}>Compte personnel:</Text>
//                 <View>
//                     <Text style={styles.labelText}>Email</Text>
//                     <TextInputComponent
//                         placeholder='Entrez votre email'
//                         autocapitalize='none'
//                         keyboardType='email-address'
//                         secureTextEntry={false}
//                         value={email}
//                         onChangeText={onChangeEmail}
//                         style={styles.inputField}
//                     />
//                 </View>
//                 <View >
//                     <Text style={styles.labelText}>Mot de passe:</Text>
//                     <TextInputComponent
//                         placeholder='Entrez votre mot de passe '
//                         autocapitalize='words'
//                         keyboardType='default'
//                         secureTextEntry={true}
//                         value={pass}
//                         onChangeText={onChangePass}
//                         style={styles.inputField}
//                     />
//                 </View>
//                 <CheckboxWithText isChecked={rememberMe} onPress={() => setRememberMe(!rememberMe)} />
//                 <TouchableOpacity style={styles.btnContainer} onPress={handleSignIn}>
//                     <Text style={styles.textStyle}>Se Connecter</Text>
//                 </TouchableOpacity>
//                 <View style={styles.signupTextContainer}>
//                     <Text style={styles.signupText}>Vous n'avez pas encore de compte?</Text>
//                     <TouchableOpacity onPress={() => navigation.navigate('Register')}>
//                         <Text style={[styles.signupText, styles.signupLink]}>Inscrivez-vous ici</Text>
//                     </TouchableOpacity>
//                 </View>
//                 <View style={styles.connectTextContainer}>
//                     <Text style={styles.connectText}>Connecte-toi avec:</Text>
//                     <View style={styles.socialIconsContainer}>
//                         <TouchableOpacity>
//                             <Image source={require('../assets/images/facebook.png')} style={styles.socialIcon} />
//                         </TouchableOpacity>
//                         <TouchableOpacity>
//                             <Image source={require('../assets/images/google.png')} style={styles.socialIcon} />
//                         </TouchableOpacity>
//                         <TouchableOpacity>
//                             <Image source={require('../assets/images/twitter.png')} style={styles.socialIcon} />
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </View>
//         </View>
//     );
// }
// export default LoginScreen;

// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     headerContainer: {
//         width: windowWidth,
//         height: windowHeight * 0.3,
//         backgroundColor: Colors.blue,
//     },
//     logoStyles: {
//         marginTop: windowHeight * 0.08,
//         marginHorizontal: windowWidth * 0.4
//     },
//     headingTextStyles: {
//         fontSize: 30,
//         color: 'white',
//         marginTop: windowHeight * 0.04,
//         textAlign: 'center',
//     },
//     bodyContainer: {

//     },
//     subHeadingTextStyles: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         textAlign: 'center',
//         marginTop: windowHeight * 0.04,
//     },
//     labelText: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         marginHorizontal: windowWidth * 0.06,
//         marginTop: windowHeight * 0.03,
//     },
//     inputField: {
//         fontSize: 14,
//     },
//     btnContainer: {
//         width: windowWidth * 0.5,
//         height: windowHeight * 0.06,
//         borderRadius: windowWidth * 0.02,
//         backgroundColor: Colors.blue,
//         marginVertical: windowHeight * 0.03,
//         marginHorizontal: windowWidth * 0.25,
//         paddingTop: windowHeight * 0.015,
//     },
//     textStyle: {
//         fontSize: 16,
//         color: 'white',
//         textAlign: 'center',
//     },
//     signupTextContainer: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         marginTop: 10,
//     },
//     signupText: {
//         fontSize: 12,
//     },
//     signupLink: {
//         color: Colors.blue,
//         marginLeft: 5,
//     },
//     connectTextContainer: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginTop: 20,
//     },
//     connectText: {
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     socialIconsContainer: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         marginTop: 10,
//     },
//     socialIcon: {
//         width: 40,
//         height: 40,
//         marginHorizontal: 10,
//     },
// });




import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { checkUserCredentials } from '../database/sqlite-database';
import GlobalData from '../utils/GlobalData';
import Colors from '../constants/Colors';
import TextInputComponent from '../components/TextInputComponent';
import CheckboxWithText from '../components/CheckboxWithText';
import Button from '../components/Button';

const LoginScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const [email, onChangeEmail] = useState('');
    const [pass, onChangePass] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            onChangeEmail('');
            onChangePass('');
        });
        return unsubscribe;
    }, []);

    const handleSignIn = () => {
        checkUserCredentials(email, pass)
            .then((user) => {
                if (user) {
                    console.log('Logged in as:', user);
                    console.log('Name:', user.name);
                    console.log('First Name:', user.fName);

                    GlobalData.user = user;

                    if (rememberMe) {
                        AsyncStorage.setItem('isLoggedIn', 'true');
                    }

                    navigation.replace('Home', { user });
                } else {
                    Alert.alert('Login Failed', 'Email ou mot de passe invalide. Veuillez réessayer !', [
                        {
                            text: 'OK',
                        },
                    ]);
                }
            })
            .catch((error) => {
                console.log('Login error:', error);

                Alert.alert('Login Failed', "Une erreur s'est produite lors de la connexion. Veuillez réessayer !", [
                    {
                        text: 'OK',
                    },
                ]);
            });
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Image source={require('../assets/images/Maidika-logo.png')}
                    style={styles.logoStyles}
                />
                <Text style={styles.headingTextStyles}>Connexion</Text>
            </View>
            <View style={styles.bodyContainer}>
                <View>
                    <Text style={styles.labelText}>Email</Text>
                    <TextInputComponent
                        placeholder='Entrez votre email'
                        autocapitalize='none'
                        keyboardType='email-address'
                        secureTextEntry={false}
                        value={email}
                        onChangeText={onChangeEmail}
                        style={styles.inputField}
                    />
                </View>
                <View >
                    <Text style={styles.labelText}>Mot de passe</Text>
                    <TextInputComponent
                        placeholder='Entrez votre mot de passe '
                        autocapitalize='words'
                        keyboardType='default'
                        secureTextEntry={true}
                        value={pass}
                        onChangeText={onChangePass}
                        style={styles.inputField}
                    />
                </View>
                <CheckboxWithText isChecked={rememberMe} onPress={() => setRememberMe(!rememberMe)} />
                <View style={styles.btnLoginContainer}>
                    <Button type='blue' onPress={handleSignIn}>Se connecter</Button>
                </View>
                <View style={styles.signupTextContainer}>
                    <Text style={styles.signupText}>Vous n'avez pas encore de compte?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                        <Text style={[styles.signupText, styles.signupLink]}>Inscrivez-vous ici</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.connectTextContainer}>
                    <Text style={styles.connectText}>Connecte-toi avec:</Text>
                    <View style={styles.socialIconsContainer}>
                        <TouchableOpacity>
                            <Image source={require('../assets/images/facebook.png')} style={styles.socialIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={require('../assets/images/google.png')} style={styles.socialIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={require('../assets/images/twitter.png')} style={styles.socialIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}
export default LoginScreen;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        width: windowWidth,
        height: windowHeight * 0.275,
        backgroundColor: Colors.blue,
    },
    logoStyles: {
        marginTop: windowHeight * 0.08,
        marginHorizontal: windowWidth * 0.4
    },
    headingTextStyles: {
        fontSize: 30,
        color: 'white',
        marginTop: windowHeight * 0.04,
        textAlign: 'center',
    },
    bodyContainer: {
        padding: 30, 
    },
    subHeadingTextStyles: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: windowHeight * 0.04,
    },
    labelText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginHorizontal: windowWidth * 0.00,
        marginTop: windowHeight * 0.03,
        marginBottom: 8
    },
    inputField: {
        fontSize: 14,
    },
    btnContainer: {
        width: windowWidth * 0.5,
        height: windowHeight * 0.06,
        borderRadius: windowWidth * 0.02,
        backgroundColor: Colors.blue,
        marginVertical: windowHeight * 0.03,
        marginHorizontal: windowWidth * 0.25,
        paddingTop: windowHeight * 0.015,
    },
    textStyle: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
    },
    btnLoginContainer: {
        marginTop: 30,
        marginBottom: 30
    },
    signupTextContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    signupText: {
        fontSize: 12,
    },
    signupLink: {
        color: Colors.blue,
        marginLeft: 5,
    },
    connectTextContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    connectText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    socialIconsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    socialIcon: {
        width: 40,
        height: 40,
        marginHorizontal: 10,
    },
});