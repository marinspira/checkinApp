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
    cors({
        origin: 'https://2guu2pg-anonymous-8081.exp.direct',
        preflightContinue: true,
    }),
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