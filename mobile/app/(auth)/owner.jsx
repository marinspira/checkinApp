import { StyleSheet, Text, View } from "react-native";
import CustomInput from "../../components/input/Input";
import Btn from "../../components/button/button";
import AuthView from "../../components/containers/AuthView";

export default function Owner() {
  return (
    <AuthView logo={true}>
      <CustomInput placeholder="E-mail" />
      <CustomInput placeholder="Senha" />
      <Btn text="Acessar" />
      <Text style={styles.signup}>Ainda não tenho cadastro</Text>
    </AuthView>
  )
}

const styles = StyleSheet.create({
  btn: {
    padding: 10,
    width: 300,
    alignItems: "center",
    padding: 15,
    borderRadius: 5
  },
  btnText: {
    color: "#fff",
    fontSize: 16
  },
  signup: {
    marginTop: 25,
    fontSize: 16
  }
})