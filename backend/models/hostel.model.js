import mongoose from "mongoose";

const Schema = mongoose.Schema;

const hostelSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Owner',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    facilities: {
        type: [String],
        required: true
    },
    vacancies: [{
        type: Schema.Types.ObjectId,
        ref: 'Position'
    }]
});

module.exports = mongoose.model('Hostel', hostelSchema);
