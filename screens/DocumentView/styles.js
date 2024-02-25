import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
    background: {
        backgroundColor: Colors.white,
        height: '100%',
    },
    container: {
        padding: 20,
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
    containerTitle : {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 20
    },
    containerContentItem : {
        backgroundColor: Colors.white,
        marginBottom: 20,
        borderRadius: 10,
        shadowColor: '#171717',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.25,
        shadowRadius: 2,
    },
    contentItemTopOpen : {
        backgroundColor: Colors.blue,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        color: Colors.white,
    },
    contentItemTopClose : {
        backgroundColor: Colors.white,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    contentItemTopOpenDate: {
        fontSize: 16,
        marginBottom: 10,
        color: Colors.white,
    },
    contentItemTopCloseDate: {
        fontSize: 16,
        marginBottom: 10,
        color: Colors.black,
    },
    contentItemTopOpenTitle : {
        fontSize: 16,
        color: Colors.white,
        marginBottom: 10,
    },
    contentItemTopCloseTitle : {
        fontSize: 16,
        marginBottom: 10,
    },
    contentItemTopOpenComment : {
        fontSize: 16,
        color: Colors.white,
        fontWeight: 'bold',
    },
    contentItemTopCloseComment : {
        fontSize: 16,
        fontWeight: 'bold',
    },
    contentItemTopOpenDesc : {
        fontSize: 10,
        color: Colors.white,
        fontStyle: 'italic',
    },
    contentItemTopCloseDesc : {
        fontSize: 10,
        fontStyle: 'italic',
    },
    bgModalDelete: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', 
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    containerContentItemBottom : {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    containerContentItemBottomImage : {
        width: '30%',
    },
    containerContentItemBottomButtons: {
        width: '65%',
    },
    bgModalDeleteContent: { 
        backgroundColor: 'white', 
        paddingHorizontal: 20, 
        paddingVertical: 40,
        borderRadius: 10,
        width: '70%',
    },
    bgModalDeleteButtons : {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 30,
    },
    bgModalDeleteContentSubject : {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center'
    },
    nonePrescription : {
        display: 'flex',
        flexDirection: 'column',   
        gap: 40,
        justifyContent: 'center',
        alignItems: 'center',
        height: '90%',
    },
    containerAnimateLottie: {
        width: 100, 
        height: 100,
    },
    containerContentFirstTextDosageUnderlineComment : {
        fontWeight: 'bold',
        fontSize: 20,
    }
});