import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import contactsRoutes from "./routes/contacts.routes.js";
import checkinRoutes from "./routes/checkin.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Configure environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Define __dirname manually
const __filename = fileURLToPath(import.meta.url);
const backendFiles = path.dirname(__filename);
export const __dirname = path.dirname(backendFiles); 

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/contacts", contactsRoutes);
app.use("/api/checkin", checkinRoutes);

// Static files
app.use('/temp/images', express.static(path.join(__dirname, 'temp/images')));

// Start server
app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server running on port ${PORT}`);
});
