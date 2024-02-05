import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../constants/Colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    container: {
        padding: 20,
    }
});