import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import Btn from "@/components/button/button";
import ImageInput from "@/components/input/ImageInput";
import { router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

export default function AuthView({
    children,
    errorMessage,
    logo,
    mainText,
    handleSubmit,
    alternativeText,
    profileImg,
    closeWindow,
    btnDisable,
    alternativeStyle
}) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={handleSubmit ? { maxHeight: '75%' } : { flex: 1 }}>
                {closeWindow &&
                    <Ionicons
                        onPress={closeWindow}
                        name="close-circle-outline"
                        style={styles.closeButton}
                        size={35}
                        color="black"
                    />
                }
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                    <View style={{ width: 340, color: 'white', height: 150, backgroundColor: 'white', left: 0, position: 'absolute', top: 120, borderTopLeftRadius: 100, borderBottomLeftRadius: 100 }} />
                    {/* <View style={{ width: 340, color: 'white', height: 40, backgroundColor: 'white', right: 0, position: 'absolute', bottom: 43, borderTopRightRadius: 100, borderBottomRightRadius: 100 }} /> */}
                    <View style={styles.content}>
                        {mainText &&
                            <Text style={styles.title}>
                                {mainText}
                            </Text>
                        }
                        {profileImg &&
                            <ImageInput
                                profileImg={profileImg.profileImg}
                                onProfileChange={profileImg.onProfileChange}
                                style={handleSubmit ? styles.img : ''}
                                width={profileImg.width}
                                height={profileImg.height}
                            />
                        }
                        <View style={[handleSubmit ? styles.form : '']}>
                            <ScrollView
                                contentContainerStyle={[
                                    alternativeStyle ? alternativeStyle : '',
                                    logo ? { justifyContent: 'center', alignItems: 'center' } : '',
                                ]}
                                showsVerticalScrollIndicator={false}
                            >
                                {logo &&
                                    <Image
                                        style={styles.logo}
                                        source={require('@/assets/images/logo.png')}
                                    />
                                }
                                {children}
                            </ScrollView>
                            {errorMessage &&
                                <Text style={styles.errorMessage}>
                                    {errorMessage}
                                </Text>
                            }
                        </View>
                        {handleSubmit &&
                            <Btn
                                disabled={btnDisable}
                                customStyle={styles.btn}
                                onPress={handleSubmit}
                                text="Check in"
                            />
                        }
                        {alternativeText &&
                            <Text
                                onPress={() => router.push(alternativeText.link)}
                                style={styles.subtitle}
                            >
                                {alternativeText.texto}
                            </Text>
                        }
                    </View>
                </KeyboardAvoidingView>
            </View >
        </SafeAreaView >
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
        flex: 1,
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
        gap: 10,
        maxWidth: 400,
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
    },
    errorMessage: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: -5
    }
})
