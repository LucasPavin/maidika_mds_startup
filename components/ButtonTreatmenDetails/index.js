import React from "react"
import { Text, TouchableOpacity } from "react-native"
import styles from "./styles"

const ButtonTreatmenDetails = ({ onPress, type, children}) => {
    let backgroundColor;
    switch(type) {
        case 'blue':
            backgroundColor = styles.bluebg;
            break;
        case 'teal':
            backgroundColor = styles.greenbg;
            break;
        case 'red':
            backgroundColor = styles.redbg;
            break;
        default:
            backgroundColor = styles.greenbg;
    }
    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, backgroundColor]}>
            <Text style={styles.text}>{children}</Text>
        </TouchableOpacity>
    )
}
export default React.memo(ButtonTreatmenDetails)

