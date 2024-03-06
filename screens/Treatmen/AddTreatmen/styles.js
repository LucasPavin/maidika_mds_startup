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
    },
    inputPicker: {
        height: 50,
        width: '100%',
        // Ajoutez d'autres styles si nécessaire
    },
    secondInput : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
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
        height: '80%',
        backgroundColor: Colors.white,
        padding: 20,
        borderRadius: 10,
    },
    containerDescribe : {
        marginBottom: 20,
    },
    chooseConfiance : {
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
    },
    chooseConfianceDescribe : {
        textAlign: 'center',
        fontStyle: 'italic',
    },
    contactItem : {
        borderBottomWidth: 1,
        borderColor: Colors.lightGrey,
        paddingVertical: 15,
    },
    contactSelected : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    contactSelectedName :{
        width: '55%',
        height: 45,
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: Colors.lightGrey,
        justifyContent: 'center',
    },
    containerDateToStart :{
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        marginBottom: 20,
    },
    containerDayStart : {
        width: '48%',
    },
    fullWidth : {
        width: '100%',
        backgroundColor: Colors.lightGrey,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerTimeStart : {
        width: '48%',
    },
    chooseStartDay :{
    },
    containerSelector : {
        marginVertical: 10,
    },
    selector: {
        backgroundColor: Colors.lightGrey,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        width: '100%',
        elevation: 3, // Ajouter de l'ombre sur Android
        shadowColor: '#000', // Ajouter de l'ombre sur iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      text: {
        // Ajuster selon le texte
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },  
      modalOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Arrière-plan semi-transparent
        justifyContent: 'center',
        alignItems: 'center',
      },
      optionItem: {
        // Ajuster le style des options
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#E8E8E8',
        width: '100%',
        alignItems: 'center',
      },
      optionText: {
        // Ajuster le texte des options
      },
});