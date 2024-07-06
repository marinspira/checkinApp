import React, { useState, useContext } from "react";
import { FlatList, StyleSheet, Text, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Colors } from "../../constants/Colors";
import AuthView from "../../components/containers/AuthView";
import CustomInput from "../../components/input/Input";
import { router } from "expo-router";
import isValidEmail from "../../utils/isValidEmail";
import AuthContext from "../../contexts/AuthContext/AuthContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const { login } = useContext(AuthContext);

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
            id: '1',
            placeholder: "Email@hostelApp.com",
            label: "Your best e-mail",
            key: "email"
        },
        {
            id: '2',
            placeholder: 'Your password here',
            label: "Password",
            key: "password",
            password: true
        },
    ];

    async function handleSubmit() {

        isValidEmail(email)

        try {
            if (!email || !password) {
                setErrorMessage("All fields are required");
                return;
            }

            if (!isValidEmail(email)) {
                setErrorMessage("Invalid email format");
                return;
            }

            setErrorMessage("");

            // const response = await login(email, password);

            // if (response.success) {
            //     router.push("/(guest)/home");
            // } else {
            //     setErrorMessage(response.error || "Something went wrong. Please try again.");
            // }

            router.push("/(guest)/home");

        } catch (error) {
            setErrorMessage("An unexpected error occurred. Please try again.");
            console.log(error);
        }

    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.green }}>
            <StatusBar barStyle="dark-content" />
            <AuthView
                handleSubmit={handleSubmit}
                mainText="Login"
                alternativeText={{
                    link: "/(auth)/signup",
                    texto: 'Not have an account yet?'
                }}
            >
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
                            password={item?.password}
                        />
                    )}
                    style={styles.form}
                    scrollEnabled={false}
                />}
                <Text style={styles.passwordText}>Forgot your password?</Text>
                {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
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
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 30,
    },
    passwordText: {
        fontWeight: '600',
        marginTop: 15,
        marginBottom: 10,
        fontSize: 16
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
