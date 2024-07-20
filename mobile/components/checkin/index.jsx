import React, { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { AuthContext } from '@/contexts/AuthContext/AuthContext.js';
import { Colors } from "@/constants/Colors";

// components
import { FlatList, StyleSheet, View } from "react-native";
import AuthView from "@/components/containers/AuthView";
import CustomInput from "@/components/input/Input";
import ToogleButton from "@/components/input/ToogleButton";
import CustomSelect from "@/components/input/Select";
import ImageInput from "@/components/input/ImageInput";

// validators
import isValidEmail from "@/utils/isValidEmail";
import isValidName from "@/utils/isValidName";
import isValidPhone from "@/utils/isValidPhone";
import isValidPassword from "@/utils/isValidPassword.js";

import { countries } from "@/utils/countries";
import { showToast } from "../toast";
import GuestProfileContext from "@/contexts/GuestProfileContext";

export default function Checkin({ closeWindow }) {

    const { user } = useContext(AuthContext);
    const { saveImg, saveGuestDetails, guestDetails, getGuestDetails, setGuestDetails } = useContext(GuestProfileContext)

    const [required, setRequired] = useState(false);
    const [hostelCountry, SetHostelCountry] = useState('');
    const [profileImg, setProfileImg] = useState(null);
    const [idImg, setIdImg] = useState(null);
    const [passaportImg, setPassaportImg] = useState(null);

    const [btnDisable, setBtnDisable] = useState(true)

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        fullName: "",
        phoneNumber: "",
        selectedCountry: "",
        appearPermission: true,
    });

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
            placeholder: '21 0 0000-0000',
            label: "Your phone number",
            key: "phoneNumber",
            phone: true,
            validator: isValidPhone,
            errorMessage: 'Please type a valid phone number.',
            required: required
        },
    ];

    useEffect(() => {
        if (guestDetails !== null) {
            setFormData({
                email: guestDetails?.email || "",
                fullName: guestDetails?.fullName || "",
                password: guestDetails?.password || "",
                phoneNumber: guestDetails?.phoneNumber || "",
                selectedCountry: guestDetails?.selectedCountry || "",
                appearPermission: guestDetails?.appearPermission || true,
            });
            setProfileImg(guestDetails?.profileImg || null);
            setIdImg(guestDetails?.idImg || null);
            setPassaportImg(guestDetails?.passaportImg || null);

        } else {
            const fetchGuestDetails = async () => {
                const reqGuestDetails = await getGuestDetails(user._id);

                if (reqGuestDetails.success) {
                    setGuestDetails(reqGuestDetails.guestDetails)
                } else {
                    showToast('error', 'Error loading your data', '');
                }
            }
            fetchGuestDetails();
        }
    }, [guestDetails, user._id, closeWindow]);

    const handleInputChange = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
        setBtnDisable(false)
    };

    const handleImageChange = async (key, result) => {
        const imageUri = result.assets[0].uri;
        const filename = result.assets[0].fileName;
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;

        const formData = new FormData();
        const userId = user._id;

        formData.append('photo', { uri: imageUri, name: filename, type });
        formData.append('userId', userId);

        const savedImg = await saveImg(formData);
        if (savedImg.success) {
            showToast('success', 'New profile image saved!', '');
        } else {
            showToast('error', 'Sorry, we could not save your image.', '');
        }

        // Update the local state
        if (key === 'profileImg') setProfileImg(imageUri);
        if (key === 'idImg') setIdImg(imageUri);
        if (key === 'passaportImg') setPassaportImg(imageUri);
    };

    const handleSubmit = async () => {
        let allValid = true;

        for (const item of inputText) {
            const value = formData[item.key];
            let isValid = item.validator ? item.validator(value) : true;

            if (!isValid) {
                allValid = false;
                break;
            }
        }

        let isSelectValid = formData.selectedCountry === '' ? false : true

        const isAnyFieldEmpty = inputText.some(item => item.required && (!formData[item.key] || formData[item.key] === item.placeholder));

        if (!isAnyFieldEmpty && allValid && isSelectValid) {
            setRequired(false);

            const guestDetails = {
                ...formData,
                userId: user._id,
                profileImg,
                idImg,
                passaportImg
            }

            const reqGuest = await saveGuestDetails(guestDetails);

            if (reqGuest.success) {
                showToast('success', 'Guest data saved!', '');
            } else {
                showToast('error', 'Please correct the errors in the form.', '');
            }
        } else {
            setRequired(true);
            showToast('error', 'Please correct the errors in the form.', '');
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <AuthView
                profileImg={{
                    profileImg: profileImg,
                    onProfileChange: (result) => handleImageChange('profileImg', result)
                }}
                handleSubmit={handleSubmit}
                errorMessage={required && 'Please correct the errors in the form.'}
                closeWindow={closeWindow}
                btnDisable={btnDisable}
            >
                <FlatList
                    data={inputText}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        (item.key !== 'password' || formData.password === '') &&
                        <CustomInput
                            placeholder={item.placeholder}
                            label={item.label}
                            onChangeText={value => handleInputChange(item.key, value)}
                            keyboardType={item.keyboardType || "default"}
                            password={item?.password}
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
                        imageUri={idImg}
                    />
                }
                <ImageInput
                    onProfileChange={(result) => handleImageChange('passaportImg', result)}
                    label="Your passport image"
                    imageUri={passaportImg}
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
