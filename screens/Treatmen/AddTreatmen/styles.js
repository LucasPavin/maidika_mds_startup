import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../../constants/Colors';

export const styles = StyleSheet.create({
    container : {
        marginTop: 60,
        paddingHorizontal: 20,
    }, 
    containerBack : {
        width: 40,
        height: 40,
    },
    imageSelectContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
    },
    ButtonImage : {
        width: 80,
        height: 70,
        borderRadius: 20,
        borderColor: Colors.blue,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedImage : {
        borderWidth: 4,
        backgroundColor: Colors.lightBlue,
    },
    textInput : {
        marginTop: 10,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input : {
        height: 45,
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: Colors.lightGrey,
        width: '100%',
        // shadowColor: '#171717',
        // shadowOffset: {width: 0, height: 4},
        // shadowOpacity: 0.25,
        // shadowRadius: 2,
    },
    inputPicker: {
        height: 50,
        width: '100%',
        // Ajoutez d'autres styles si nécessaire
    },
    secondInput : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 20,
        marginBottom: 20,
    },
    secondInputLeft : {
        width: '48%',
    },
    secondInputRight : {
        width: '48%',
    },
    containerContact : {

    },
    modalContact : {
        height: '70%',
        backgroundColor: Colors.blue,
        padding: 20,
        borderRadius: 10,
    }
});