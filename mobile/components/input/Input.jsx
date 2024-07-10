import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomSelect from "./Select";
import { countries } from "@/utils/countries";
import isValidPhone from "../../utils/isValidPhone";

const CustomInput = ({
    label,
    placeholder,
    style2,
    icon,
    onChangeText,
    errorMessage,
    password,
    validator,
    disable,
    phone,
    maxLength,
    required
}) => {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(countries[0]);
    const [isPasswordVisible, setIsPasswordVisible] = useState(password);

    const handleChange = (text) => {
        if (phone) {
            text = text.replace(/[^0-9]/g, '');
        }
        setValue(text);
        if (validator) {
            const validationError = validator(text, selectedCountry.phoneLength);
            setError(validationError);
        }
        if (onChangeText) {
            onChangeText(text);
        }
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleSelect = (value) => {
        const country = countries.find(country => country.value === value);
        setSelectedCountry(country);
    };

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={styles.inputContainer}>
                <TextInput
                    style={[
                        styles.input,
                        style2 ? styles.input2 : {},
                        (error === false || (required && value === '')) && { borderColor: 'red', borderWidth: 2 },
                        phone && { paddingLeft: 90 }
                    ]}
                    placeholder={placeholder}
                    placeholderTextColor="#888"
                    onChangeText={handleChange}
                    secureTextEntry={isPasswordVisible}
                    value={value}
                    editable={!disable}
                    maxLength={phone ? selectedCountry.phoneLength : maxLength}
                    keyboardType={phone ? 'numeric' : 'default'}
                />
                {icon && <View style={styles.icon}>{icon}</View>}
                {password && (
                    <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                        <Icon name={isPasswordVisible ? "eye-slash" : "eye"} size={18} color="#888" />
                    </TouchableOpacity>
                )}
                {phone &&
                    <View style={{ width: selectedCountry === countries[0] ? '100%' : 85, position: 'absolute', top: 2, left: 2, height: 60 }}>
                        <CustomSelect
                            options={countries}
                            placeholder="+55 21 9 0000-0000"
                            onSelect={handleSelect}
                            selectedValue={selectedCountry.code}
                        />
                    </View>
                }
            </View>
            {((error === false && value !== '')) && <Text style={styles.errorText}>{errorMessage}</Text>}
            {(required && value === '') && <Text style={styles.errorText}>Please fill this field</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 10,
    },
    label: {
        fontSize: 15,
        fontWeight: "700",
        marginBottom: 5,
    },
    inputContainer: {
        position: 'relative',
    },
    input: {
        backgroundColor: Colors.gray,
        padding: 15,
        fontSize: 16,
        borderRadius: 8,
        width: '100%',
        marginBottom: 8
    },
    input2: {
        borderBottomWidth: 1,
        borderColor: "#c9c9c9",
        paddingTop: 12,
        paddingBottom: 8,
        marginBottom: 20,
    },
    icon: {
        position: 'absolute',
        top: 18,
        right: 45,
    },
    eyeIcon: {
        position: 'absolute',
        top: 15,
        right: 15,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: -5,
    },
});

export default CustomInput;