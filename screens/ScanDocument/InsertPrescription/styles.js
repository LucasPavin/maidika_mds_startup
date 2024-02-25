import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: Colors.white,
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    input : {
        height: 45,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor: Colors.lightGrey,
        width: '100%',
        shadowColor: '#171717',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.25,
        shadowRadius: 2,
    },
    buttonBottom: {
        position: 'absolute',
        bottom: 0,
    },
    containerImage : {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 10,
    },
    textForm : {
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 5,
    }
});
