import Guest from '../models/guest.model.js';
import User from '../models/user.model.js';

export const saveGuestDetails = async (req, res) => {
    try {
        const {
            fullName,
            phoneNumber,
            idImg,
            passaportImg,
            // profileImg,
            appearPermission,
            country,
            userId
        } = req.body.guestDetails;

        const user = await User.findById(userId);

        if (user) {
            let guest = await Guest.findOne({ userId });

            if (guest) {
                guest.fullName = fullName;
                guest.phoneNumber = phoneNumber;
                guest.idImg = idImg;
                guest.passaportImg = passaportImg;
                // guest.profileImg = profileImg;
                guest.appearPermission = appearPermission;
                guest.country = country;
            } else {
                guest = new Guest({
                    fullName,
                    phoneNumber,
                    idImg,
                    passaportImg,
                    // profileImg,
                    appearPermission,
                    country,
                    userId
                });
            }

            await guest.save();
            res.status(201).json({ message: "Guest details saved successfully", guest });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.log("Error in saveGuestDetails controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getGuestDetails = async (req, res) => {
    try {
        const { userId } = req.params;

        // console.log(userId)
        // console.log('userId')

        const guest = await Guest.findOne({ userId });

        if (guest) {
            res.status(200).json({ guest });
        } else {
            res.status(404).json({ error: "Guest details not found" });
        }
    } catch (error) {
        console.error("Error in getGuestDetails controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};