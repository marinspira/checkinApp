import React, { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";
import AuthView from "@/components/containers/AuthView";
import CustomInput from "@/components/input/Input";
import ToogleButton from "@/components/input/ToogleButton";
import CustomSelect from "@/components/input/Select";
import ImageInput from "@/components/input/ImageInput";
import { getGuestDetails, saveGuestDetails } from "./service";
import { AuthContext } from '@/contexts/AuthContext/AuthContext.js';
import isValidEmail from "@/utils/isValidEmail";
import isValidName from "@/utils/isValidName";
import { countries } from "@/utils/countries";
import isValidPhone from "@/utils/isValidPhone";
import isValidPassword from '@/utils/isValidPassword.js';

export default function Checkin() {
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchGuestDetails = async () => {
            const response = await getGuestDetails(user._id);
            if (response.success) {
                setFormData(prev => ({
                    ...prev,
                    email: response.guestDetails.guest.email || "",
                    fullName: response.guestDetails.guest.fullName || "",
                    phoneNumber: response.guestDetails.guest.phoneNumber || "",
                    selectedCountry: response.guestDetails.guest.selectedCountry || "",
                    appearPermission: response.guestDetails.guest.appearPermission || true,
                    profileImage: response.guestDetails.guest.profileImage || null,
                    idImg: response.guestDetails.guest.idImg || null,
                    passaportImg: response.guestDetails.guest.passaportImg || null
                }));
                console.log(userData.fullName)
            } else {
                setError(response.error);
            }
            setLoading(false);
        };

        fetchGuestDetails()
    }, [user])

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        fullName: "",
        phoneNumber: "",
        selectedCountry: "",
        appearPermission: true,
        profileImage: null,
        idImg: null,
        passaportImg: null
    });

    const [required, setRequired] = useState(false);
    const [hostelCountry, SetHostelCountry] = useState('');

    const handleInputChange = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleImageChange = (key, result) => {
        setFormData(prev => ({ ...prev, [key]: result }));
    };

    const inputText = [
        {
            id: '1',
            placeholder: "João da Silva Ferreira",
            label: "Your name",
            key: "fullName",
            validator: isValidName,
            errorMessage: 'Please type your full name',
            required: required
        },
        {
            id: '2',
            placeholder: "Email@hostelApp.com",
            label: "Your email",
            key: "email",
            keyboardType: "email-address",
            validator: isValidEmail,
            errorMessage: 'Please enter a valid email address',
            required: required
        },
        {
            id: '3',
            placeholder: 'Your password here',
            label: "Your password",
            key: "password",
            password: true,
            validator: isValidPassword,
            errorMessage: 'The password must be at least 8 characters long, including upper and lower case letters, numbers and special characters.',
            required: required
        },
        {
            id: '4',
            placeholder: '+55 21 0 0000-0000',
            label: "Your phone number",
            key: "phoneNumber",
            phone: true,
            validator: isValidPhone,
            errorMessage: 'Please type a valid phone number.',
            required: required
        },
    ];

    const guestDetails = {
        ...formData,
        userId: user._id
    };

    const handleSubmit = () => {

        const isAnyFieldEmpty = inputText.some(item => item.required && item.isEmpty);

        let allValid = true;

        inputText.forEach(item => {
            const value = formData[item.key];
            const isValid = item.validator ? item.validator(value) : true;
            // console.log(`Field: ${item.label}, Value: ${value}, Valid: ${isValid}`);

            if (!isValid) {
                allValid = false;
                console.log(`Field: ${item.label}, Value: ${value}, Valid: ${isValid}`);
                setRequired(true)
            }
        });

        if (!isAnyFieldEmpty && allValid) {
            setRequired(false)
            saveGuestDetails(guestDetails);

        } else {
            setRequired(true)
            console.log("Please correct the errors in the form.");
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <AuthView
                onProfileChange={(result) => handleImageChange('profileImage', result)}
                handleSubmit={handleSubmit}
                errorMessage={(required === true) && 'Please correct the errors in the form.'}
            >
                <FlatList
                    data={inputText}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <CustomInput
                            placeholder={item.placeholder}
                            label={item.label}
                            onChangeText={value => handleInputChange(item.key, value)}
                            keyboardType={item.keyboardType || "default"}
                            password={item.password}
                            validator={item.validator}
                            errorMessage={item.errorMessage}
                            phone={item.phone}
                            required={item.required}
                            defaultValue={formData[item.key]}
                        />
                    )}
                    style={styles.form}
                    scrollEnabled={false}
                />
                <CustomSelect
                    label="Where are you from?"
                    options={countries}
                    placeholder="Select your country"
                    onSelect={(value) => handleInputChange('selectedCountry', value)}
                    selectedValue={formData.selectedCountry}
                    required={required}
                />
                {formData.selectedCountry === hostelCountry &&
                    <ImageInput
                        onProfileChange={(result) => handleImageChange('idImg', result)}
                        label="Your ID image"
                    />
                }
                <ImageInput
                    onProfileChange={(result) => handleImageChange('passaportImg', result)}
                    label="Your passport image"
                />
                <ToogleButton
                    selected={formData.appearPermission}
                    label="I want to appear and view other guests."
                    onPress={() => handleInputChange('appearPermission', !formData.appearPermission)}
                />
            </AuthView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.gray,
        flex: 1
    },
    form: {
        marginTop: 10,
    },
});