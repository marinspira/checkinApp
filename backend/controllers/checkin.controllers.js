import Guest from '../models/guest.model.js';
import User from '../models/user.model.js';
import { base64Encode, base64Decode } from '../utils/convertToBase64.js';
import path from 'path'
import { __dirname } from '../server.js';

export const saveGuestDetails = async (req, res) => {
    try {
        const {
            fullName,
            phoneNumber,
            idImg,
            passaportImg,
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
                guest.appearPermission = appearPermission;
                guest.country = country;
            } else {
                guest = new Guest({
                    fullName,
                    phoneNumber,
                    idImg,
                    passaportImg,
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
        const guest = await Guest.findOne({ userId });

        if (guest) {
            const outputFilePath = `./temp/images/decoded_profile_${userId}.png`;
            const savedFilePath = await base64Decode(guest.profileImg, outputFilePath);

            const user = await User.findOne({ _id: userId });
            const { email, password } = user;

            let guestDetails;

            if (password !== '') {
                guestDetails = {
                    ...guest._doc,
                    email,
                    password: "password",
                    profileImg: savedFilePath,
                };
            } else {
                guestDetails = {
                    ...guest._doc,
                    email,
                    profileImg: savedFilePath,
                };
            }

            console.log(guestDetails);
            res.status(200).json({ guest: guestDetails });
        } else {
            res.status(404).json({ error: "Guest details not found" });
        }
    } catch (error) {
        console.error("Error in getGuestDetails controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const saveProfilePhotoGuest = async (req, res) => {
    try {

        var profileImg = await base64Encode(req.file.path);
        const { userId } = req.body

        if (!req.file || !userId) {
            return res.status(400).json({ success: false, message: 'No file or userId provided' });
        }

        const user = await User.findById(userId);

        if (user) {
            let guest = await Guest.findOne({ userId });

            if (guest) {
                guest.profileImg = profileImg;
            } else {
                guest = new Guest({
                    profileImg,
                });
            }

            await guest.save();
            res.status(201).json({ message: "Guest details saved successfully" });

        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.log('Erro uploadImage Controller', error)
        console.error(error)
    }
}