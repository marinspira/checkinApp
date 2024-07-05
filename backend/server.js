import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import contactsRoutes from "./routes/contacts.routes.js"
import connectToMongoDB from "./db/connectToMongoDB.js"
import cookieParser from "cookie-parser"
import cors from 'cors'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000;

app.use(
    cors(),
);

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/contacts", contactsRoutes)

app.listen(PORT, () => {
    connectToMongoDB()
    console.log(`Server running on port ${PORT}`)
})