import axios from 'axios'

export const saveGuestDetails = async (guestDetails) => {
    try {
        const response = await axios.put(`https://9ebf-171-6-240-7.ngrok-free.app/api/checkin/guest`, {
            guestDetails
        });

        const guest = response.data;
        console.log('front', guest);
        return { success: true };

    } catch (error) {
        console.error('Check in error', error);
        return { success: false, error: error.response?.data?.error || 'Check in failed' };
    }
};

export const getGuestDetails = async (userId) => {
    try {
        const response = await axios.get(`https://9ebf-171-6-240-7.ngrok-free.app/api/checkin/guest/${userId}`);

        const guestDetails = response.data;
        // console.log(guestDetails);

        return { success: true, guestDetails };

    } catch (error) {
        console.error('Guest details request error', error);
        return { success: false, error: error.response?.data?.error || 'Guest details request failed' };
    }
}

export const saveImg = async (formData) => {
    try {
        const response = await axios.post('https://9ebf-171-6-240-7.ngrok-free.app/api/upload/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        return { success: true };

    } catch (error) {
        console.error('Checkin front-end service error', error)
        console.error(error)
    }
}