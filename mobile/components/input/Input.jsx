import { StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../constants/Colors";

export default function CustomInput({ label, placeholder, style2, icon, onChangeText, error, password }) {
    return (
        <View>
            {label && <Text style={styles.label}>{label}</Text>}
            {icon && (
                <View style={styles.icon}>
                    {icon}
                </View>
            )}
            <TextInput
                style={[
                    (style2 ? styles.input2 : styles.input),
                    (error && { borderColor: 'red', borderWidth: 2 })
                ]}
                placeholder={placeholder}
                placeholderTextColor="#888"
                onChangeText={onChangeText}
                secureTextEntry={password}
            >
            </TextInput>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: "#fff",
        padding: 15,
        marginTop: 5,
        marginBottom: 10,
        fontSize: 18,
        borderRadius: 5,
        minWidth: 300,
    },
    label: {
        fontSize: 15,
        fontWeight: "700"
    },
    input2: {
        borderBottomWidth: 1,
        borderColor: "#c9c9c9",
        paddingVertical: 12,
        marginTop: 5,
        marginBottom: 20,
        fontSize: 18,
        // borderRadius: 8,
        // backgroundColor: "#f1f1f1"
    },
    icon: {
        position: 'absolute',
        zIndex: 2,
        top: 18,
        right: 15
    }
})