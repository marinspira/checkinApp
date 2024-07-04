import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors';

export const CustomCheckbox = ({ label, isChecked, onToggle }) => {
    return (
        <TouchableOpacity style={styles.checkboxContainer} onPress={onToggle}>
            <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
                {isChecked && <View style={styles.checkboxInner} />}
            </View>
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    checkboxChecked: {
        backgroundColor: Colors.green,
    },
    checkboxInner: {
        width: 12,
        height: 12,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 14,
    },
    status: {
        fontSize: 18,
    },
});
