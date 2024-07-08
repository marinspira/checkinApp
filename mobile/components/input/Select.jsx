import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';

const CustomSelect = ({ label, options, placeholder, onSelect, selectedValue }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleSelect = (value) => {
        onSelect(value);
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.selectContainer}>
                <Text style={[styles.selectedValue, !selectedValue && styles.placeholder]}>
                    {selectedValue || placeholder}
                </Text>
                <Icon name="chevron-down" size={16} color="#888" />
            </TouchableOpacity>
            <Modal
                transparent={true}
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <FlatList
                            data={options}
                            keyExtractor={(item) => item.value}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => handleSelect(item.value)} style={styles.option}>
                                    <Text style={styles.optionText}>{item.label}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </Modal>
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
        fontWeight: '700',
        marginBottom: 5,
    },
    selectContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.gray,
        padding: 15,
        borderRadius: 8,
    },
    selectedValue: {
        fontSize: 16,
        color: '#000',
    },
    placeholder: {
        color: '#888',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        margin: 20,
        borderRadius: 8,
        padding: 20,
    },
    option: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    optionText: {
        fontSize: 16,
    },
});

export default CustomSelect;
