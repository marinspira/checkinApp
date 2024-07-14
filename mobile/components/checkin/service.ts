import axios from 'axios';

interface GuestDetails {
    userId: string;
    email: string;
    password: string;
    fullName: string;
    phoneNumber: string;
    selectedCountry: string;
    appearPermission: boolean;
    profileImg: string | null;
    idImg: string | null;
    passaportImg: string | null;
}

interface ApiResponse<T> {
    success: boolean;
    error?: string;
    guestDetails?: T;
}

export const saveGuestDetails = async (guestDetails: GuestDetails): Promise<ApiResponse<null>> => {
    try {
        const response = await axios.put(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/checkin/guest`, {
            guestDetails
        });

        return { success: true };

    } catch (error: any) {
        console.error('Save guest details service', error);
        return { success: false, error: error.response?.data?.error || 'Check in failed' };
    }
};

export const getGuestDetails = async (userId: string): Promise<ApiResponse<GuestDetails>> => {
    try {
        const response = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/checkin/guest/${userId}`);

        const guestDetails = response.data;
        return { success: true, guestDetails };

    } catch (error: any) {
        console.error('Get guest details service error', error);
        return { success: false, error: error.response?.data?.error || 'Guest details request failed' };
    }
};

export const saveImg = async (formData: FormData): Promise<ApiResponse<null>> => {
    try {
        const response = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/checkin/guest/saveProfilePhoto`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return { success: true };

    } catch (error: any) {
        console.error('Save img service error', error);
        return { success: false, error: error.response?.data?.error || 'Image upload failed' };
    }
};
