import React, { useContext, useState } from "react";
import { FlatList, StyleSheet, Text, View, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { Colors } from "../../constants/Colors";
import AuthView from "../../components/containers/AuthView";
import { CustomCheckbox } from "../../components/input/CheckBox";
import CustomInput from "../../components/input/Input";
import isValidEmail from "../../utils/isValidEmail";
import isValidName from "../../utils/isValidName";
import AuthContext from "../../contexts/AuthContext/AuthContext";

export default function Signup() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [appearPermission, setAppearPermission] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [erro, setErro] = useState(false)

    const { signup } = useContext(AuthContext);

    function handleInputChange(key, value) {
        switch (key) {
            case 'fullName':
                setFullName(value);
                break;
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
        fullName: fullName,
        email: email,
        password: password,
        appearPermission: appearPermission,
    }

    async function handleSubmit() {

        isValidName(fullName)
        isValidEmail(email)

        try {
            if (!fullName || !email || !password) {
                setErrorMessage("All fields are required");
                return;
            }

            if (!isValidName(fullName)) {
                setErrorMessage("Name must be at least 8 characters long and contain only letters and spaces");
                return;
            }

            if (!isValidEmail(email)) {
                setErrorMessage("Invalid email format");
                return;
            }

            setErrorMessage("");

            const response = await signup(fullName, email, password, appearPermission);

            if (response.success) {
                router.push("/(guest)/home");
            } else {
                setErrorMessage(response.error || "Something went wrong. Please try again.");
            }

        } catch (error) {
            setErrorMessage("An unexpected error occurred. Please try again.");
            console.log(error);
        }
    }

    const data = [
        {
            id: '1',
            placeholder: "João da Silva Ferreira",
            label: "Your full name",
            key: "fullName"
        },
        {
            id: '2',
            placeholder: "Email@hostelApp.com",
            label: "Your best e-mail",
            key: "email",
            keyboardType: "email-address"
        },
        {
            id: '3',
            placeholder: 'Your password here',
            label: "Password",
            key: "password",
            password: true
        },
    ];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.green }}>
            <StatusBar barStyle="dark-content" />
                <AuthView
                    mainText="Sign Up"
                    handleSubmit={handleSubmit}
                    alternativeText={{
                        link: "/(auth)/login",
                        texto: "Already have an account?"
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
                                keyboardType={item.keyboardType || "default"}
                                error={erro}
                                password={item?.password}
                            />
                        )}
                        style={styles.form}
                        scrollEnabled={false}
                    />}
                    <CustomCheckbox
                        isChecked={appearPermission}
                        onToggle={() => setAppearPermission(!appearPermission)}
                        label="I want to appear and view other guests."
                    />
                    {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

                </AuthView>
        </SafeAreaView >
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
    form: {
        paddingTop: 20,
    },
    title: {
        fontSize: 60,
        textAlign: "center",
        marginBottom: 20,
        fontWeight: "700",
    },
    btn: {
        marginTop: -35,
        width: '80%',
        opacity: 1,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
    },
    subtitle: {
        fontWeight: '600',
        fontSize: 18,
        marginTop: 25
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    eyeIcon: {
        position: 'absolute',
        right: 10,
    }
});