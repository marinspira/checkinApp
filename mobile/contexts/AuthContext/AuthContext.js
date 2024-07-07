import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUserFromStorage = async () => {
            const storedUser = await AsyncStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
            setLoading(false);
        };

        loadUserFromStorage();
    }, []);

    const signup = async (fullName, email, password, appearPermission) => {
        try {
            const response = await axios.post('https://b9b6-171-6-238-84.ngrok-free.app/api/auth/signup', {
                fullName,
                email,
                password,
                appearPermission
            });

            const newUser = response.data;
            setUser(newUser);
            await AsyncStorage.setItem('user', JSON.stringify(newUser));
            return { success: true };
        } catch (error) {
            console.error('Signup error', error);
            return { success: false, error: error.response?.data?.error || 'Signup failed' };
        }
    };

    const login = async (email, password) => {
        try {
            const response = await axios.post('https://b9b6-171-6-238-84.ngrok-free.app/api/auth/login', {
                email,
                password
            });

            const loggedInUser = response.data;
            setUser(loggedInUser);
            await AsyncStorage.setItem('user', JSON.stringify(loggedInUser));
            return { success: true };
        } catch (error) {
            console.error('Login error', error);
            return { success: false, error: error.response?.data?.error || 'Login failed' };
        }
    };

    const logout = async () => {
        try {
            await axios.post('https://b9b6-171-6-238-84.ngrok-free.app/api/auth/logout');
            setUser(null);
            await AsyncStorage.removeItem('user');
        } catch (error) {
            console.error('Logout error', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
