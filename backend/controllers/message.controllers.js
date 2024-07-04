import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        // Extract message from the request body
        const { message } = req.body;

        // Extract receiverId from the request parameters
        const { id: receiverId } = req.params;

        // Get the senderId from the authenticated user (attached to the request object)
        const senderId = req.user._id;

        // Find an existing conversation between the sender and receiver
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        // If no conversation exists, create a new one
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        // Create a new message
        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });

        // If the message is created, add its ID to the conversation's messages array
        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        // Save the updated conversation and message to the database in the same time
        await Promise.all([conversation.save(), newMessage.save()])

        // Respond with a 201 status and the new message
        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getMessage = async (req, res) => {
    try {
        // Extract receiverId from the request parameters
        const { id: receiverId } = req.body;
        // Get the senderId from the authenticated user (attached to the request object)
        const senderId = req.user._id;

        // Find a conversation between the sender and receiver and populate the messages
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate("messages");

        // If no conversation is found, respond with an empty array
        if (!conversation) return res.status(400).json({ message: "Conversa não encontrada" });

        // Respond with the messages in the conversation
        res.status(200).json(conversation.messages);

    } catch (error) {
        console.log("Error in getMessage controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}
