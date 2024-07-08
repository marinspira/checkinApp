import mongoose from "mongoose";

const Schema = mongoose.Schema;

const guestSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    documentType: {
        type: String,
        enum: ['ID', 'Passport'],
        required: true
    },
    documentNumber: {
        type: String,
        required: true
    },
    documentPhoto: {
        data: Buffer,
        contentType: String 
    },
    profilePicture: {
        data: Buffer,
        contentType: String
    },
    appearPermission: {
        type: Boolean,
        default: false
    },
    isVolunteer: {
        type: Boolean,
        default: false
    },
    hostelAssociation: {
        type: Schema.Types.ObjectId,
        ref: 'Hostel'
    }
});

module.exports = mongoose.model('Guest', guestSchema);
