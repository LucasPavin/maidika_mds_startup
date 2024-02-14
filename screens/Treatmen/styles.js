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
    },
    medicationsContainer: {
        marginVertical: 20,
    },
    medicationContainer : {
        flex: 1,
        flexDirection: 'row',
        paddingBottom: 20,
        columnGap: 10,
    },
    medicationContainerImage : {
        height: 60,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#B2B2B24D',
        borderRadius: 20,
    },
    medicationContainerContent: {
        width: 150,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',   
    },
    medicationContainerContentName: {
        fontWeight: '600',
        fontSize: 16,
    },
    medicationContainerTime : {
        width: 50,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    medicationContainerTimeTake: {
        fontSize: 16,
    }
});



