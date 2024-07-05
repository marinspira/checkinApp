import { Link } from "expo-router";
import { StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native";

export default function Btn({ text, link, onPress, customStyle }) {
    if (link) {
        return (
            <Link href={link}>
                <TouchableHighlight style={[styles.btn, customStyle, { backgroundColor: "#000" }]}>
                    <Text style={styles.btnText}>{text}</Text>
                </TouchableHighlight>
            </Link>
        )
    }

    if (onPress) {
        return (
            <TouchableHighlight onPress={onPress} style={[styles.btn, customStyle, { backgroundColor: "#000" }]}>
                <Text style={styles.btnText}>{text}</Text>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    btn: {
        padding: 10,
        width: '100%',
        alignItems: "center",
        padding: 15,
        borderRadius: 5,
    },
    btnText: {
        color: "#fff",
        fontSize: 16
    }
})