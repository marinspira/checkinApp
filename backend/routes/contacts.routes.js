import express from "express"
import protectRoute from "../middleware/protectRoute.js"
import { getContactsForSidebar } from "../controllers/contacts.controllers.js"

const router = express.Router()

router.get("/", protectRoute, getContactsForSidebar)

export default router