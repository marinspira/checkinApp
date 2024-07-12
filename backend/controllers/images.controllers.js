import multer from "multer";
import fs from 'fs'
import Guest from "../models/guest.model.js";
import User from "../models/user.model.js";

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, './images');
    },
    filename(req, file, callback) {
        callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
    },
});

export const upload = multer({ storage });

async function base64Encode(file) {
    var body = await fs.promises.readFile(file);
    return body.toString('base64');
}

export const uploadImage = async (req, res) => {
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