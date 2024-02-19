import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";


const styles = StyleSheet.create({
    container : {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 40,
        marginVertical: 8
    },
    bluebg : {
        backgroundColor: Colors.blue,
    },
    greenbg : {
        backgroundColor: Colors.teal,
    },
    text : {
        color : Colors.white,
        fontSize: 16,
        fontWeight: '300',
    }
})

export default styles