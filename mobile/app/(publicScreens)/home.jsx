import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { AntDesign, MaterialIcons, Octicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import AuthView from '@/components/containers/AuthView.jsx';
import WidgetWhite from '@/components/widget/index.jsx';

export default function Home() {
    return (
        <AuthView logo={true}>
            <StatusBar barStyle="dark-content" />
            <Link href="/(publicScreens)/signup">
                <View style={[styles.btn]}>
                    <View>
                        <Text style={styles.btnText}>Sou Hóspede</Text>
                        <Text style={styles.btnTextBold}>Check in</Text>
                    </View>
                    <MaterialIcons name="airplane-ticket" size={30} color="black" />
                </View>
            </Link>
            <Link href="/(publicScreens)/volunteers">
                <View style={[styles.btn]}>
                    <View>
                        <Text style={styles.btnText}>Sou voluntário</Text>
                        <Text style={styles.btnTextBold}>Voluntariados</Text>
                    </View>
                    <Octicons name="workflow" size={24} color="black" />
                </View>
            </Link>
            <WidgetWhite
                link="/(publicScreens)/owner"
                onPress={() => setView('owner')}
                subtitle="Sou Host"
                title="Gerenciar"
                icon={<AntDesign name="arrowright" size={24} color="black" />}
            />
        </AuthView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    salutation: {
        fontSize: 25,
        marginBottom: 40,
    },
    btn: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderColor: "#000",
        marginBottom: 5,
        width: 250,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        justifyContent: "space-between",
    },
    btnText: {
        fontFamily: "SpaceMono",
        textTransform: "lowercase",
        color: "#000",
        fontSize: 17,
    },
    btnTextBold: {
        fontSize: 20,
        fontWeight: "600",
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
});