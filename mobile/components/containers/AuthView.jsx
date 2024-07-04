import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Colors } from "../../constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";

export default function authView({ children }) {
    return (
        <SafeAreaView style={{ backgroundColor: Colors.green }}>
            <ScrollView
                contentContainerStyle={{
                    height: "100%"
                }}
            >
                <View style={styles.container}>
                    <Image style={styles.logo} source={require('../../assets/images/logo.png')} />
                    {children}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.green,
        gap: 10,
        maxWidth: 400
    },
    logo: {
        width: 150,
        height: 150,
        marginTop: -80,
        marginBottom: 40,
    },
})
