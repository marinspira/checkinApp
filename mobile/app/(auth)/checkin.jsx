import React, { useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Colors } from "../../constants/Colors";
import { CustomCheckbox } from "../../components/input/CheckBox";
import CustomInput from "../../components/input/Input";
import Btn from "../../components/button/button";
import ImageInput from "../../components/input/ImageInput";
// import axios from 'axios'

export default function Checkin() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [gender, setGender] = useState("");
    const [appearPermission, setAppearPermission] = useState(true);
    const [profilePic, setProfilePic] = useState(null);

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
            case 'confirmPassword':
                setConfirmPassword(value);
                break;
            case 'gender':
                setGender(value);
                break;
            default:
                break;
        }
    }

    function handleImageChange(imageUri) {
        setProfilePic(imageUri);
    }

    const user = {
        fullName: fullName,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        gender: gender,
        appearPermission: appearPermission,
        profilePic: profilePic
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
            placeholder: "email@hostelApp.com",
            label: "Your best e-mail",
            key: "email"
        },
        {
            id: '3',
            placeholder: "",
            label: "Gender",
            key: "gender"
        },
        {
            id: '4',
            placeholder: 'Your password here',
            label: "Password",
            key: "password"
        },
        {
            id: '5',
            placeholder: "Confirm your password",
            label: "Confirm your password",
            key: "confirmPassword"
        },
    ];

    async function handleSubmit() {

        console.log(user);

        const response = await fetch('http://localhost:8000/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        });
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.container2}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.scrollContainer}>
                    <ImageInput onImageChange={handleImageChange} />
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
                        <CustomCheckbox
                            isChecked={appearPermission}
                            onToggle={() => setAppearPermission(!appearPermission)}
                            label="Quero aparecer e visualizar outros hóspedes do hostel que eu estou associada"
                        />
                        <Btn onPress={handleSubmit} text="Check in" />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        padding: 16,
        justifyContent: "center",
        paddingHorizontal: 30,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flex: 1,
        marginTop: 60
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: Colors.lilac,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingTop: 50
    },
    form: {
        paddingTop: 40
    },
    title: {
        fontSize: 40,
        textAlign: "center",
        marginBottom: 20,
        fontWeight: "600",
    },
    container2: {
        flex: 1,
        position: 'absolute',
        height: "100%"
        // top: 180
    },
    header: {
        paddingVertical: 20,
        alignItems: "center",
        backgroundColor: Colors.green,
        flex: 1,
    },
    logo: {
        width: 60,
        height: 60
    }
});
