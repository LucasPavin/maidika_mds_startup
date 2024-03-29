import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
    container : {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        padding: 15,
        marginVertical: 8
    },
    redbg : {
        backgroundColor: "#B20000",
    },
    whitebg : {
        backgroundColor: Colors.white,
    },
    greenbg : {
        backgroundColor: Colors.teal,
    },
    bluebg : {
        backgroundColor: Colors.blue,
    },
    text : {
        color : Colors.white,
        fontSize: 16,
        fontWeight: '300',
    },
    whiteBackground : {
        color: "#000000",
        fontSize: 16,
        fontWeight: '300',
    },
    whiteText: {
        color: '#fff',
    },
    blackText: {
    color: '#000',
    },

})

export default styles