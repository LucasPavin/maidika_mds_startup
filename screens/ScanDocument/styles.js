import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
    captureButton: {
      backgroundColor: 'white',
      borderRadius: 50,
      padding: 15,
      marginBottom: 20,
    },
    retakeButton: {
      backgroundColor: Colors.teal,
      borderRadius: 5,
      padding: 10,
      margin: 10,
    },
    cropButton: {
      backgroundColor: Colors.blue,
      borderRadius: 5,
      padding: 10,
      margin: 10,
    },
    buttonText: {
      color: 'black',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    permissionDeniedContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    permissionDeniedText: {
      fontSize: 18,
      textAlign: 'center',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingVertical: 20,
      gap: 10,
    },
    buttonContainerRetake : {
        width: '50%',
    },
    buttonContainerSave : {
        width: '50%',
    },
    containerCamera: {
      flex: 1,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingBottom: 40,
    },
    backButton: {
      position: 'absolute',
      top: "7%",
      left: "5%",
      backgroundColor: Colors.lightGrey,
      padding: 5,
      borderRadius: 50,
      zIndex: 100,
    },
    backButtonTouchable : {
        display: 'flex', 
        flexDirection: 'row',
        gap: 5,
    },
    previewPicture : {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.white
    },
    previewPictureBack : {
        backgroundColor: Colors.lightGrey,
        padding: 5,
        marginLeft: 10,
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
    containerPreview : {
        paddingHorizontal: 10,
        backgroundColor: Colors.white,
        height: '100%',
    },
    previewPicture : {
        height: '70%'
    }
});