import Colors from "../../../constants/Colors";
import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export  const styles = StyleSheet.create({
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