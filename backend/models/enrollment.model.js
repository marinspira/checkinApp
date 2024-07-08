import mongoose from "mongoose";

const Schema = mongoose.Schema;

const enrollmentSchema = new Schema({
    positionId: {
        type: Schema.Types.ObjectId,
        ref: 'Position', required: true
    },
    volunteerId: {
        type: Schema.Types.ObjectId,
        ref: 'Volunteer',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);
