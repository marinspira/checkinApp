import mongoose from "mongoose";

const Schema = mongoose.Schema;

const guestSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    idPhoto: {
        data: Buffer,
        contentType: String 
    },
    passaportPhoto: {
        data: Buffer,
        contentType: String 
    },
    profilePicture: {
        data: Buffer,
        contentType: String
    },
    appearPermission: {
        type: Boolean,
        default: false,
        required: true
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

const Guest = mongoose.model('Guest', guestSchema);

export default Guest