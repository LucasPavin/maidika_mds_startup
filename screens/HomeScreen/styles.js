import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../constants/Colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: windowHeight * 0.04,
        height: 60,
    },
    imageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 20,
        height: 20,
        alignSelf: 'center',
    },
    secondImage: {
        width: 70,
        height: 70,
        marginHorizontal: windowHeight * 0.099,
    },
    toggleButton: {
        width: 55,
        height: 40,
    },
    bodyContainer : {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    profileContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: windowHeight * 0.03,
    },
    leftProfile: {
        flex: 1,
        width: '40%'
    },
    rightProfile: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 20,
        paddingVertical: 15,
        borderRadius: 15,
        borderColor: Colors.lightBlue,
        borderWidth: 0.5,
        backgroundColor: Colors.lightBlue,
        width: '60%',
        shadowColor: '#171717',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.25,
        shadowRadius: 2,
    },
    welcome: {
        fontSize: 18,
    },
    nameData: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginHorizontal: windowWidth * 0.04,
    },
    subRight: {
        backgroundColor: 'white',
        borderRadius: 15,
        width: windowWidth * 0.25,
        height: windowHeight * 0.05,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileText: {
        fontSize: 14,
    },
    secondContainer: {
        marginTop: windowHeight * 0.03,
        flexDirection: 'row',
        shadowColor: '#171717',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.25,
        shadowRadius: 2,
    },
    calendarContainer: {
        flex: 1,
        backgroundColor: Colors.blueSecondary,
        width: windowWidth * 0.5,
        height: windowHeight * 0.17,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        overflow: 'hidden',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    calendarContainerDay : {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    calendarTextDate: {
        fontSize: 34,
        textAlign: 'center',
        color: 'white',
    },
    calendarTextMonth: {
        fontSize: 22,
        textAlign: 'center',
        color: 'white',
    },
    calendarContainerButton : {
        height: '25%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    calendarContainerButtonView : {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 20,
    },
    calendarContainerButtonText : {
        color: 'black',
        fontSize: 12,
    },
    calendarText: {
        fontSize: 22,
        fontWeight: '300',
        textAlign: 'center',
        color: 'white',
    },
    med: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: 'white',
        width: windowWidth * 0.5,
        height: windowHeight * 0.17,
        padding: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    medEntry: {
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 5,
    },
    medImageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'lightgray',
    },
    medImage: {
        width: 25,
        height: 25,
    },
    medDetails: {
        flex: 1,
        marginLeft: 10,
    },
    medName: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    detailsMedInfo : {
        flexDirection: 'row',
        width: '100%',
        marginTop: 5,
    },
    medDescription: {
        fontSize: 11,
        width: 50,
        marginTop: 2,
        width: '60%',
        color: 'gray',
    },
    medAdditionalInfo: {
        fontSize: 11,
        marginLeft: 10,
        width: '30%'
    },
    drugContainer: {
        
    },
    thirdContainer : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: windowHeight * 0.03,
    },
    leftContainer: {
        flex: 1,
        width: windowWidth * 0.475,
        borderRadius: 15,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        shadowColor: '#171717',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.25,
        shadowRadius: 2,
    },
    blockImageBlue : {
        backgroundColor: Colors.blueTertiaryLight,
        width: '100%',
        height: windowHeight * 0.12,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    leftBottomTextContainer: {
        width: '100%',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: Colors.blueTertiary,
        padding: 5,
    },
    rightContainer: {
        flex: 1,
        width: windowWidth * 0.475,
        borderRadius: 15,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#171717',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.25,
        shadowRadius: 2,
    },
    blockImageYellow : {
        backgroundColor: '#B6A28345',
        width: '100%',
        height: windowHeight * 0.12,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightBottomTextContainer: {
        width: '100%',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        padding: 5,
        backgroundColor: "#B6A283",
    },
    bottomText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 10,
        fontWeight: 'bold',
    },
    mapStyles: {
        width: '100%',
        borderRadius: 15,
        marginTop: windowHeight * 0.02,
        shadowColor: '#171717',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.25,
        shadowRadius: 2,
    },
    btn: {
        backgroundColor: Colors.bluePrimary,
        borderRadius: 15,
        width: windowWidth * 0.9,
        height: windowHeight * 0.06,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#171717',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.25,
        shadowRadius: 2,
    },
    btnText: {
        color: 'white',
        textAlign: 'center',
    }
});



