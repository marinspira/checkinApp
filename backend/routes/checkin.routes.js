import express from "express"
import { getGuestDetails, saveGuestDetails } from "../controllers/checkin.controllers.js"

const router = express.Router()

router.put("/guest", saveGuestDetails)
router.get('/guest/:userId', getGuestDetails);

export default router