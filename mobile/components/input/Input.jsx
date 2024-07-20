import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomSelect from "./Select";
import { countries } from "@/utils/countries";

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
    defaultValue,
    maxLength,
    required
}) => {
    const [value, setValue] = useState(defaultValue);
    const [error, setError] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(countries[0]);
    const [isPasswordVisible, setIsPasswordVisible] = useState(password);
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
        if (defaultValue) {
            setValue(defaultValue);
        }
    }, [defaultValue]);

    const handleChange = (text) => {
        if (phone) {
            text = text.replace(/[^0-9]/g, '');
            setPhoneNumber(text);
        } else {
            setValue(text);
        }

        if (validator) {
            const validationError = validator(text, selectedCountry.phoneLength);
            setError(!validationError);
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
                {phone && (
                    <View style={styles.countryCode}>
                        <Text style={styles.countryCodeText}>{selectedCountry.code}</Text>
                    </View>
                )}
                <TextInput
                    style={[
                        styles.input,
                        style2 ? styles.input2 : {},
                        ((error && value && defaultValue !== null) || (required && defaultValue === '')) && { borderColor: 'red', borderWidth: 2 },
                        phone && { paddingLeft: 120 }
                    ]}
                    placeholder={placeholder}
                    placeholderTextColor="#888"
                    onChangeText={handleChange}
                    secureTextEntry={isPasswordVisible}
                    value={phone ? phoneNumber : value}
                    editable={!disable}
                    maxLength={phone ? selectedCountry.phoneLength : maxLength}
                    keyboardType={phone ? 'numeric' : 'default'}
                    defaultValue={defaultValue}
                />
                {icon && <View style={styles.icon}>{icon}</View>}
                {password && (
                    <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                        <Icon name={isPasswordVisible ? "eye-slash" : "eye"} size={18} color="#888" />
                    </TouchableOpacity>
                )}
                {phone &&
                    <View style={{ width: 85, position: 'absolute', top: 2, left: 2, height: 60 }}>
                        <CustomSelect
                            options={countries}
                            placeholder="US"
                            onSelect={handleSelect}
                            selectedValue={selectedCountry.value}
                        />
                    </View>
                }
            </View>
            {((error && (value && defaultValue !== null))) &&
                <Text style={styles.errorText}>{errorMessage}</Text>
            }
            {(required && (value === '')) &&
                <Text style={styles.errorText}>Please fill this field</Text>
            }
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
    countryCode: {
        position: 'absolute',
        top: 15,
        left: 10,
    },
    countryCodeText: {
        fontSize: 16,
        color: '#888',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: -5,
    },
});

export default CustomInput;
