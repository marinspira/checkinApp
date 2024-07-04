import { StyleSheet, Text, TextInput, View } from "react-native";
import CustomInput from "../../components/input/Input";
import Btn from "../../components/button/button";
import AuthView from "../../components/containers/AuthView";
import { router } from "expo-router";

export default function Guest() {
    return (
        <AuthView>
            <CustomInput placeholder="Seu código aqui" label="Insira o código enviado para o seu email aqui!" />
            <Btn onPress={() => router.push("/(auth)/checkin")} text="Acessar" />
        </AuthView>
    )
}