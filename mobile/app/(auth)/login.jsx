import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Colors } from "../../constants/Colors";
import AuthView from "../../components/containers/AuthView";
import { CustomCheckbox } from "../../components/input/CheckBox";
import CustomInput from "../../components/input/Input";
import Btn from "../../components/button/button";
import { router } from "expo-router";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleInputChange(key, value) {
        switch (key) {
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                break;
        }
    }

    const user = {
        email: email,
        password: password,
    }

    const data = [
        {
            id: '2',
            placeholder: "Email@hostelApp.com",
            label: "Your best e-mail",
            key: "email"
        },
        {
            id: '3',
            placeholder: 'Your password here',
            label: "Password",
            key: "password"
        },
    ];

    async function handleSubmit() {

        // console.log(user);

        // const response = await fetch('http://localhost:8000/api/auth/login', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(user)
        // });

        router.push("/(guest)/home");

    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.green }}>
            <StatusBar barStyle="dark-content" />
            <AuthView>
                <Text style={styles.title}>Login</Text>
                <View style={styles.container}>
                    {data && <FlatList
                        data={data}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <CustomInput
                                style2={true}
                                placeholder={item.placeholder}
                                label={item.label}
                                value={user[item.key]}
                                onChangeText={value => handleInputChange(item.key, value)}
                            />
                        )}
                        style={styles.form}
                        scrollEnabled={false}
                    />}
                    <Text>Forgot your password?</Text>
                </View>
                <Btn customStyle={styles.btn} onPress={handleSubmit} text="Check in" />
                <Text onPress={() => router.push("/(auth)/signup")} style={styles.subtitle}>Not have an account yet?</Text>
            </AuthView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        padding: 30,
        justifyContent: "center",
        borderRadius: 10,
        width: 320,
        marginTop: 20,
        paddingBottom: 45,
    },
    title: {
        fontSize: 40,
        textAlign: "center",
        marginBottom: 20,
        fontWeight: "700",
    },
    btn: {
        marginTop: -35,
        width: '80%'
    },
    container2: {
        flex: 1,
        position: 'absolute',
        height: "100%"
    },
    header: {
        alignItems: "center",
        backgroundColor: Colors.green,
        flex: 1,
    },
    logo: {
        width: 60,
        height: 60
    },
    title: {
        fontSize: 80,
        fontWeight: '600',
        zIndex: 2,
    },
    subtitle: {
        fontWeight: '600',
        fontSize: 18,
        marginTop: 25
    }
});
