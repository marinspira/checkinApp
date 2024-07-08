import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ToggleButton = ({ label, value, selected, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View style={[styles.toggleContainer, selected && styles.toggleContainerSelected]}>
                <View style={[styles.toggleCircle, selected && styles.toggleCircleSelected]} />
            </View>
            {label && <Text style={styles.label}>{label}</Text>}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        width: '100%'
    },
    toggleContainer: {
        width: 50,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#d1d1d1',
        justifyContent: 'center',
        marginRight: 10,
        padding: 3,
    },
    toggleContainerSelected: {
        backgroundColor: '#007AFF',
    },
    toggleCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#fff',
        elevation: 2,
    },
    toggleCircleSelected: {
        alignSelf: 'flex-end',
    },
    label: {
        fontSize: 16,
    },
});

export default ToggleButton;
