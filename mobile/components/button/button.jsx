import { Link } from "expo-router";
import { StyleSheet, Text, TextInput, Pressable, View } from "react-native";

export default function Btn({ text, link, onPress, customStyle }) {
    if (link) {
        return (
            <Link href={link}>
                <Pressable style={[styles.btn, customStyle, { backgroundColor: "#000" }]}>
                    <Text style={styles.btnText}>{text}</Text>
                </Pressable>
            </Link>
        )
    }

    if (onPress) {
        return (
            <Pressable onPress={onPress} style={[styles.btn, customStyle, { backgroundColor: "#000" }]}>
                <Text style={styles.btnText}>{text}</Text>
            </Pressable>
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