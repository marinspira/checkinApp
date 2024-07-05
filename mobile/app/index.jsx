import { StyleSheet, Text, View, SafeAreaView, Image, StatusBar } from 'react-native';
import React, { useState } from 'react';
import { AntDesign, MaterialIcons, Octicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import AuthView from '../components/containers/AuthView.jsx';

export default function index() {

    const [view, setView] = useState('');

    return (
        <AuthView logo={true}>
            <Link href="/(auth)/signup">
                <View style={[styles.btn]}>
                    <View>
                        <Text style={styles.btnText}>Sou Hóspede</Text>
                        <Text style={styles.btnTextBold}>Check in</Text>
                    </View>
                    <MaterialIcons name="airplane-ticket" size={30} color="black" />
                </View>
            </Link>
            <Link href="/(auth)/staff">
                <View style={[styles.btn]}>
                    <View>
                        <Text style={styles.btnText}>Sou voluntário</Text>
                        <Text style={styles.btnTextBold}>Voluntariados</Text>
                    </View>
                    <Octicons name="workflow" size={24} color="black" />
                </View>
            </Link>
            <Link href="/(auth)/owner">
                <View onPress={() => setView('owner')} style={[styles.btn]}>
                    <View>
                        <Text style={styles.btnText}>Sou Host</Text>
                        <Text style={styles.btnTextBold}>Gerenciar</Text>
                    </View>
                    <AntDesign name="arrowright" size={24} color="black" />
                </View>
            </Link>
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
        // borderWidth: 1,
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
