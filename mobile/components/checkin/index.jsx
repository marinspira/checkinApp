import { useContext, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";
import AuthView from "@/components/containers/AuthView";
import CustomInput from "@/components/input/Input";
import ToogleButton from "@/components/input/ToogleButton";
import CustomSelect from "@/components/input/Select";
import ImageInput from "@/components/input/ImageInput";
import { checkinService } from "./service";
import { AuthContext } from '@/contexts/AuthContext/AuthContext.js'
export default function Checkin() {

    const { user } = useContext(AuthContext)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [fullName, setFullName] = useState("");
    const [selectedCountry, setSelectedCountry] = useState('');
    const [appearPermission, setAppearPermission] = useState(true);
    const [profileImage, setProfileImage] = useState(null);
    const [idImg, setIdImg] = useState(null)
    const [passaportImg, setPassaportImg] = useState(null)
    const [phoneNumber, setPhoneNumber] = useState('')

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
            case 'fullName':
                setFullName(value)
            case 'phoneNumber':
                setPhoneNumber(value)
            default:
                break;
        }
    }

    const handleImageChange = (key, result) => {
        switch (key) {
            case 'profileImage':
                setProfileImage(result);
                break;
            case 'idImg':
                setIdImg(result);
                break;
            case 'passaportImg':
                setPassaportImg(result);
                break;
            default:
                break;
        }
    };

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
            key: "phoneNumber",
        },
    ];

    // const user = {
    //     email: email,
    //     password: password
    // };

    const guestDetails = {
        fullName: fullName,
        phoneNumber: phoneNumber,
        idPhoto: idImg,
        passaportPhoto: passaportImg,
        profilePicture: profileImage,
        appearPermission: appearPermission,
        country: selectedCountry,
        userId: user._id
    };

    function handleSubmit() {
        console.log(user)
        checkinService(guestDetails);
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <AuthView
                onProfileChange={(result) => handleImageChange('profileImage', result)}
                handleSubmit={handleSubmit}
            >
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
                    <ImageInput
                        onProfileChange={(result) => handleImageChange('idImg', result)}
                        label="Your ID image"
                    />
                }
                <ImageInput onProfileChange={(result) => handleImageChange('passaportImg', result)} label="Your passaport image" />
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
        marginTop: 10,
    },
})