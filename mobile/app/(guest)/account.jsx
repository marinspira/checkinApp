import { StatusBar } from "expo-status-bar";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { Colors } from "../../constants/Colors";
import ContainerPaddingHorizontal from "../../components/containers/paddingHorinzontal";
import profileDefault from '../../assets/images/unnamed.png'
import ImageInput from "../../components/input/ImageInput";
import AuthView from "../../components/containers/AuthView";
import CustomInput from "../../components/input/Input";

export default function Account() {

    const user = {
        name: "Maria",
        profileImg: profileDefault
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
        {
            id: '4',
            placeholder: '+55 21 0 0000-0000',
            label: "Your phone number",
            key: "phone",
        },
    ];

    return (
        <ScrollView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <ContainerPaddingHorizontal>
                <View style={styles.container2}>
                    <AuthView>
                        <ImageInput />
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
                                        keyboardType={item.keyboardType || "default"}
                                        password={item?.password}
                                    />
                                )}
                                style={styles.form}
                                scrollEnabled={false}
                            />}
                        </View>
                    </AuthView>
                </View>
            </ContainerPaddingHorizontal>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.gray
    },
    container2: {
        gap: 20,
        paddingVertical: 30
    },
})