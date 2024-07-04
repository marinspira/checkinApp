import User from "../models/user.model.js";

export const getContactsForSidebar = async (req, res) => {
    try {
        // Get the logged-in user's ID from the request object
        const userLoggedIn = req.user._id;

        // Find all users except the logged-in user
        const contacts = await User.find({ _id: { $ne: userLoggedIn } });

        // Respond with the list of contacts
        res.status(200).json(contacts);

    } catch (error) {
        console.log("Error in getContactsForSidebar controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}