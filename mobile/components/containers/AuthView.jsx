import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import Btn from "../button/button";
import { router } from "expo-router";

export default function AuthView({ children, logo, mainText, handleSubmit, alternativeText }) {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={{
                    height: "100%"
                }}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                >
                    <View style={styles.content}>
                        {logo && <Image style={styles.logo} source={require('../../assets/images/logo.png')} />}
                        <Text style={styles.title}>{mainText}</Text>
                        <View style={handleSubmit ? styles.form : ''}>
                            {children}
                        </View>
                        {handleSubmit && <Btn customStyle={styles.btn} onPress={handleSubmit} text="Check in" />}
                        {alternativeText && <Text onPress={() => router.push(alternativeText.link)} style={styles.subtitle}>{alternativeText.texto}</Text>}
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 70,
        textAlign: "center",
        marginBottom: 20,
        fontWeight: "700",
    },
    container: {
        backgroundColor: Colors.green,
        display: 'flex',
        alignItems: 'center',
        height: '100%'
    },
    form: {
        backgroundColor: "#fff",
        padding: 30,
        justifyContent: "center",
        borderRadius: 10,
        width: 320,
        marginTop: 20,
        paddingBottom: 45,
    },
    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.green,
        gap: 10,
        maxWidth: 400,
        height: '100%',
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 40,
    },
    btn: {
        marginTop: -35,
        width: '80%'
    },
    subtitle: {
        fontWeight: '600',
        fontSize: 18,
        marginTop: 25
    }
})
