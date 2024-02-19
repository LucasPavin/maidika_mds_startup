import React from "react"
import { Text, TouchableOpacity } from "react-native"
import styles from "./styles"

const ButtonTreatmenDetails = ({ onPress, type, children}) => {

    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, type === 'red' ? styles.redbg : styles.greenbg]}>
            <Text style={styles.text}>{children}</Text>
        </TouchableOpacity>
    )
}
export default React.memo(ButtonTreatmenDetails)

