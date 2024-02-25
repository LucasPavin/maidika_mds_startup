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
    }
})

export default styles