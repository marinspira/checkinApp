import axios from 'axios'

export const checkinService = async (guestDetails) => {
    
    try {
        const response = await axios.put(`https://cb0e-171-6-238-84.ngrok-free.app/api/checkin/guest`, {
            guestDetails
        });

        const guest = response.data;
        console.log(guest);
        return { success: true };

    } catch (error) {
        console.error('Login error', error);
        return { success: false, error: error.response?.data?.error || 'Check in failed' };
    }
};