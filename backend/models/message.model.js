import mongoose from "mongoose";

// Define the schema for a message
const messageSchema = new mongoose.Schema({
    // The ID of the user sending the message
    senderId: {
        type: mongoose.Schema.Types.ObjectId, // The type is ObjectId, which references another document
        ref: "User", // This ObjectId refers to a document in the "User" collection
        required: true
    },
    // The ID of the user receiving the message
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true
    },
    // The actual message content
    message: {
        type: String,
        required: true
    }
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

// Create a Mongoose model for the message schema
const Message = mongoose.model("Message", messageSchema);

// Export the Message model so it can be used in other parts of the application
export default Message;
