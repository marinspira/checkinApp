import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const GuestProfileContext = createContext();

export const GuestProfileProvider = ({ children }) => {

    const [guestDetails, setGuestDetails] = useState(null)

    const saveGuestDetails = async (guestDetails) => {
        try {
            const response = await axios.put(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/checkin/guest`, {
                guestDetails
            });

            return { success: true };

        } catch (error) {
            console.error('Save guest details service', error);
            return { success: false, error: error.response?.data?.error || 'Check in failed' };
        }
    };

    const getGuestDetails = async (userId) => {
        try {
            const response = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/checkin/guest/${userId}`);

            const guest = response.data.guest

            function getFirstName(fullName) {
                if (!fullName) return '';
                const names = fullName.split(' ');
                return names[0];
            }

            const firstName = getFirstName(guest.fullName)

            const guestDetails = {
                ...guest,
                firstName
            }
            setGuestDetails(guestDetails)

            return { success: true, guestDetails };

        } catch (error) {
            console.error('Get guest details service error', error);
            return { success: false, error: error.response?.data?.error || 'Guest details request failed' };
        }
    };

    const saveImg = async (formData) => {
        try {
            const response = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/checkin/guest/saveProfilePhoto`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return { success: true };

        } catch (error) {
            console.error('Save img service error', error);
            return { success: false, error: error.response?.data?.error || 'Image upload failed' };
        }
    };

    return (
        <GuestProfileContext.Provider value={{ saveGuestDetails, getGuestDetails, saveImg, guestDetails, setGuestDetails }}>
            {children}
        </GuestProfileContext.Provider>
    );
};

export default GuestProfileContext;
