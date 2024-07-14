import express from "express"
import { getGuestDetails, saveGuestDetails, saveProfilePhotoGuest } from "../controllers/checkin.controllers.js"
import { upload } from "../utils/convertToBase64.js";

const router = express.Router()

router.put("/guest", saveGuestDetails)

router.get('/guest/:userId', getGuestDetails);

router.post("/guest/saveProfilePhoto", upload.single('photo'), saveProfilePhotoGuest)

export default router