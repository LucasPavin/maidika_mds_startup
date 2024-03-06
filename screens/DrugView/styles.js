import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    previewPictureBack : {
        backgroundColor: Colors.lightGrey,
        padding: 5,
        marginBottom: 10,
        borderRadius: 50,
        zIndex: 100,
        alignSelf: 'flex-start', 
    },
    previewPictureBackTouchable : {
        display: 'flex', 
        flexDirection: 'row',
        gap: 5,
    },
    inputSearchDrug: {
        marginTop: 20,
        backgroundColor: Colors.white,
        shadowColor: '#171717',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.25,
        shadowRadius: 2,
        marginBottom: 20,
        borderRadius: 10,
        padding: 10,
    }, 
    listDrugs : {
        backgroundColor: Colors.white,
        shadowColor: '#171717',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.25,
        shadowRadius: 2,
        marginBottom: 10,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 30,
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight: 20,
    },
    bgModalPicture : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', 
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    bgModalPictureContent: {
        width: '80%',
        paddingHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: Colors.white,
        borderRadius: 10,
    },
    bgModalPictureContentTop: {
        height: 400,
    },
    containerNameGeneric : {
        paddingBottom: 10,
        fontSize: 14,
    },
    titleDrug : {
        fontSize: 16,
        fontWeight: 'bold',
        paddingBottom: 10,
    },
    nameGeneric : {
        fontWeight: 'bold',
    },
    containerDescription : {
        paddingBottom: 10,
        flexDirection: 'column',
    },
    textDescription : {
        fontSize: 12,
        fontStyle: 'italic',
    }
});
