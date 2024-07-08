import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import Btn from "@/components/button/button";
import ImageInput from "@/components/input/ImageInput";
import { router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

export default function AuthView({ children, logo, mainText, handleSubmit, alternativeText }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ maxHeight: '75%' }}>
            <Ionicons name="close-circle-outline" style={styles.closeButton} size={35} color="black" />
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                >
                    <View style={styles.content}>
                        {logo && <Image style={styles.logo} source={require('@/assets/images/logo.png')} />}
                        <Text style={styles.title}>{mainText}</Text>
                        <ImageInput style={styles.img} />
                        <View style={handleSubmit ? styles.form : ''}>
                            <ScrollView>
                                {children}
                            </ScrollView>
                        </View>
                        {handleSubmit && <Btn customStyle={styles.btn} onPress={handleSubmit} text="Check in" />}
                        {alternativeText && <Text onPress={() => router.push(alternativeText.link)} style={styles.subtitle}>{alternativeText.texto}</Text>}
                    </View>
                </KeyboardAvoidingView>
            </View>
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
        height: '100%',
        justifyContent: 'center'
    },
    form: {
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        justifyContent: "center",
        borderRadius: 10,
        width: 340,
        paddingBottom: 45,
        paddingTop: 50,
        height: '100%',
        position: 'relative'
    },
    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.green,
        gap: 10,
        maxWidth: 400,
        // height: '100%',
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
    },
    img: {
        marginBottom: -55,
        zIndex: 2
    },
    closeButton: {
        position: 'absolute',
        right: -8,
        top: 25,
        zIndex: 3
    }
})
