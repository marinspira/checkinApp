import mongoose from "mongoose";

const Schema = mongoose.Schema;

const volunteerSchema = new Schema({
    guestId: {
        type: Schema.Types.ObjectId,
        ref: 'Guest', required: true
    },
    experiences: [
        { type: String }
    ],
});

module.exports = mongoose.model('Volunteer', volunteerSchema);
