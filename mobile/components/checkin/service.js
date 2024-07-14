import axios from 'axios'

export const saveGuestDetails = async (guestDetails) => {
    try {
        const response = await axios.put(`https://8d13-171-6-244-48.ngrok-free.app/api/checkin/guest`, {
            guestDetails
        });

        const guest = response.data;
        console.log('Save checkin details',guest)
        return { success: true };

    } catch (error) {
        console.error('Save guest details service', error);
        return { success: false, error: error.response?.data?.error || 'Check in failed' };
    }
};

export const getGuestDetails = async (userId) => {
    try {
        const response = await axios.get(`https://8d13-171-6-244-48.ngrok-free.app/api/checkin/guest/${userId}`);

        const guestDetails = response.data;
        console.log(guestDetails);

        return { success: true, guestDetails };

    } catch (error) {
        console.error('Get guest details service error', error);
        return { success: false, error: error.response?.data?.error || 'Guest details request failed' };
    }
}

export const saveImg = async (formData) => {
    try {
        const response = await axios.post('https://8d13-171-6-244-48.ngrok-free.app/api/checkin/guest/saveProfilePhoto', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        return { success: true };

    } catch (error) {
        console.error('Save img service error', error)
        console.error(error)
    }
}