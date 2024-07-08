import { StatusBar } from "expo-status-bar";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";
import profileDefault from '@/assets/images/unnamed.png'
import AuthView from "@/components/containers/AuthView";
import CustomInput from "@/components/input/Input";
import { useState } from "react";
import ToogleButton from "@/components/input/ToogleButton";
import CustomSelect from "../../components/input/Select";
import ImageInput from "../../components/input/ImageInput";

export default function Account() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [appearPermission, setAppearPermission] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [erro, setErro] = useState(false)
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [hostelCountry, SetHostelCountry] = useState('');

    const countries = [
        { label: 'Select your country', value: '' },
        { label: 'United States', value: 'US' },
        { label: 'Canada', value: 'CA' },
        { label: 'Brazil', value: 'BR' },
        { label: 'United Kingdom', value: 'GB' },
        { label: 'France', value: 'FR' },
        { label: 'Germany', value: 'DE' },
        // Add more countries as needed
    ];

    const handleSelect = (value) => {
        setSelectedCountry(value);
    };

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
        fullName: fullName,
        email: email,
        password: password
    }

    const profile = {
        profileImg: profileDefault,
        // document: documentImg || documentPDF

    }

    const data = [
        {
            id: '1',
            placeholder: "João da Silva Ferreira",
            label: "Your name",
            key: "fullName"
        },
        {
            id: '2',
            placeholder: "Email@hostelApp.com",
            label: "Your email",
            key: "email",
            keyboardType: "email-address"
        },
        {
            id: '3',
            placeholder: 'Your password here',
            label: "Your password",
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

    function handleSubmit() {
        return null
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <AuthView handleSubmit={handleSubmit}>
                {data && <FlatList
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <CustomInput
                            style2={false}
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
                <CustomSelect
                    label="Country"
                    options={countries}
                    placeholder="Select your country"
                    onSelect={handleSelect}
                    selectedValue={selectedCountry}
                />
                {selectedCountry === hostelCountry &&
                    <ImageInput />
                }
                <ImageInput style2={true} />
                <ToogleButton
                    selected={appearPermission}
                    label="I want to apper and view other guests."
                    onPress={() => setAppearPermission(!appearPermission)}
                />
            </AuthView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.gray,
        flex: 1
    },
    form: {
        marginTop: 10
    },
    container2: {
        gap: 20,
        paddingVertical: 30
    }
})