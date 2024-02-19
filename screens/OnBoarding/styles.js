import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
    container : {
        flex: 1
    },
    image : {
        width: '100%',
        flex: 1
    },
    content: {
        backgroundColor: Colors.white,
        padding: 30,
        paddingTop: 0
    },
    title: {
        color : Colors.blue,
        textAlign: 'center',
        fontSize: 22,
        fontWeight: "bold"
    },
    subtitle: {
        color: Colors.grey,
        textAlign: 'center',
        fontSize: 15,
        marginVertical: 16
    },
    footer: {
        position: "absolute",
        bottom: 0,
        height: 40,
        backgroundColor: Colors.white,
        width: '100%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,

    }
})

export default styles