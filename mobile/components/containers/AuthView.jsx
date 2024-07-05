import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Colors } from "../../constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthView({ children, logo }) {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={{
                    height: "100%"
                }}
            >
                <View style={styles.content}>
                    {logo && <Image style={styles.logo} source={require('../../assets/images/logo.png')} />}
                    {children}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.green,
        display: 'flex',
        alignItems: 'center'
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
        // marginTop: -80,
        marginBottom: 40,
    },
})
