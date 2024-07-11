import express from "express"
import { uploadImage } from "../controllers/images.controllers.js"
import { upload } from "../controllers/images.controllers.js"

const router = express.Router()

router.post("/upload", upload.single('photo'), uploadImage)

export default router