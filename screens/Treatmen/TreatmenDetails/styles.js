import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../../constants/Colors';

export const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        height : '100%'
    },
    containerAnimate :{
        height : '30%',
        backgroundColor: Colors.teal,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerAnimateLottie: {
        width: 250, 
        height: 250,
    },
    containerContent: {
        height : '55%',
        width: '100%',
        padding: 16
    },
    containerContentBack : {
        flexDirection: 'row',
    },
    containerContentBackText : {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: "#B2B2B24D",
        borderRadius: 10,
    },
    image : {
        width: 15,
        height: 15,
        marginRight: 5,
    },
    containerContentFirst :{ 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    containerContentFirstText: {
        width: '70%',
    },
    containerContentFirstTextName : {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    containerContentFirstTextDosage : {
        fontSize: 17,
        flexDirection: 'row',
    },
    containerContentFirstTextDosageUnderline : {
        fontSize: 18,
        textDecorationLine: 'underline',
        fontWeight: '600',
        marginRight: 7.5
    },
    containerContentFirstTextDosageUnderlineComment : {
        fontSize: 18,
        textDecorationLine: 'underline',
        fontWeight: '600',
        marginBottom: 7.5
    },
    containerContentFirstImage: {
        width: '30%',
        backgroundColor: "#4966994D",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        height: 100,
    },
    containerContentFirstImageLogo: {
        width: 100,
        resizeMode: 'contain'
    },
    containerContentSecond : {
        marginVertical: 20,
    },
    containerContentSecondItem : {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    containerContentSecondComment : {
        flexDirection: 'column',
        marginBottom: 20,
    },
    containerButtons: {
        height : '15%',
        width: '100%',
        paddingBottom: 20,
        paddingHorizontal: 16,
        flexDirection: 'column',
        justifyContent: 'center',
    },
});



