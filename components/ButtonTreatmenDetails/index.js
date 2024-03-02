import React from "react"
import { Text, TouchableOpacity } from "react-native"
import styles from "./styles"

const ButtonTreatmenDetails = ({ onPress, type, children}) => {
    let backgroundColor, textColor;
    switch(type) {
        case 'blue':
            backgroundColor = styles.bluebg;
            textColor = styles.whiteText;
            break;
        case 'teal':
            backgroundColor = styles.greenbg;
            textColor = styles.whiteText;
            break;
        case 'red':
            backgroundColor = styles.redbg;
            textColor = styles.whiteText; 
            break;
        case 'white':
            backgroundColor = styles.whitebg;
            textColor = styles.blackText;
            break;
        default:
            backgroundColor = styles.greenbg;
            textColor = styles.whiteText; 
    }
    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, backgroundColor]}>
            <Text style={[styles.text, textColor]}>{children}</Text>
        </TouchableOpacity>
    )
}
export default React.memo(ButtonTreatmenDetails)