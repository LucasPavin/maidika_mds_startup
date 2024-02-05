import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    dayContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    dayNumber: {
        fontSize: 24,
        fontWeight: '200',
    },
    dayName: {
        fontSize: 12,
        color: 'black',
        fontWeight: '300',
    },
    viewMonth: {
        marginTop: 10,
        backgroundColor: Colors.white,
        textAlign: 'center',
    },
    textViewMonth: {
        textAlign: 'center', 
        fontSize: 35,
        fontWeight: '200',
    },
    containerWeek: {
        height: 100,
        marginTop: 20,
        backgroundColor: Colors.white,
    },
    allDay : {
        backgroundColor: Colors.lightGrey,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 10,
    },
    currentDayView: {
        backgroundColor: Colors.tealLight,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal : 20,
    },
    currentDayText: {
        color: Colors.black
    },
    selectedDay: {
        backgroundColor: Colors.teal,
    },
    selectedDayText: {
        color: '#FFFFFF',
    },
    containerRemind : {
        flex: 1,
        marginTop: 20,
        paddingHorizontal: 20,
        position: 'relative',
        height: '40%',
    },
    selectedDateText: {
        fontSize: 24,
        fontWeight: '300',
        color: "#8F8F8F"
    },
    btnAddTreatmen : {
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: 20,
        height: 20,
    }
});



