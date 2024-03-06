import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../constants/Colors";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        padding: 10,
    },
    containerProfil : {
        paddingBottom: 20,
    },
    containerProfilText : {
        fontSize: 20,
        fontWeight: 'bold',
    },
    containerProfilInfo : {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        columnGap: 10,
        paddingVertical: 20,
        borderTopColor: Colors.lightGrey,
        borderTopWidth: 1,
        borderBottomColor: Colors.lightGrey,
        borderBottomWidth: 1,
    },
    containerProfilLeft: {
        width: windowWidth * 0.20,
    },
    containerProfilRight: {
        width: windowWidth * 0.80,
    },
    profileImage: {
        width: 75,
        height: 75,
        borderRadius: 50,
    },
    containerProfilRightName : {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    containerProfilRightProfil : {
        fontStyle: 'italic',
    },
    containerLang : {
        paddingVertical: 20,
        borderBottomColor: Colors.lightGrey,
        borderBottomWidth: 1,
    },
    containerLangTitle : {
        fontSize: 10,
        marginBottom: 20,
    },
    containerLangContent : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    containerLangLeft : {
        flexDirection: 'row',
        columnGap: 10,
    },
    containerLangRight : {
        flexDirection: 'row',
        columnGap: 10,
    },
    containerList : {
        paddingVertical: 20,
    },
    containerListItem : {
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    containerListTextLink : {
        fontSize: 16,
        textDecorationLine: 'underline',
    },
    containerListText: {
        fontSize: 16,
    },
    logout: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10,
        paddingVertical: 20,
        borderTopColor: Colors.lightGrey,
        borderTopWidth: 1,
        borderBottomColor: Colors.lightGrey,
        borderBottomWidth: 1,
    },
    logoutText: {
        fontSize: 16,
    },
});
