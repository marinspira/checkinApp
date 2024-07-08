import express from "express"
import { saveGuestDetails } from "../controllers/checkin.controllers.js"

const router = express.Router()

router.put("/guest", saveGuestDetails )

export default router