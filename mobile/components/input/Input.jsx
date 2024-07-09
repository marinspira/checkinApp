import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import Icon from 'react-native-vector-icons/FontAwesome';

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
    showErrors // Nova prop
}) => {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(password);

    const handleChange = (text) => {
        setValue(text);
        if (validator) {
            const validationError = validator(text);
            setError(validationError);
        } else {
            setError('');
        }
        if (onChangeText) {
            onChangeText(text);
        }
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    useEffect(() => {
        if (validator) {
            const validationError = validator(value);
            setError(validationError);
        }
    }, [value]);

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={styles.inputContainer}>
                <TextInput
                    style={[
                        styles.input,
                        style2 ? styles.input2 : {},
                        (showErrors && (error || errorMessage)) ? styles.errorBorder : styles.removeBorder
                    ]}
                    placeholder={placeholder}
                    placeholderTextColor="#888"
                    onChangeText={handleChange}
                    secureTextEntry={isPasswordVisible}
                    value={value}
                    editable={!disable}
                />
                {icon && <View style={styles.icon}>{icon}</View>}
                {password && (
                    <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                        <Icon name={isPasswordVisible ? "eye-slash" : "eye"} size={18} color="#888" />
                    </TouchableOpacity>
                )}
            </View>
            {showErrors && (error || errorMessage) && <Text style={styles.errorText}>{error || errorMessage}</Text>}
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
        borderWidth: 0,
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
        marginTop: 0,
    },
    errorBorder: {
        borderColor: 'red',
        borderWidth: 2,
    },
});

export default CustomInput;
