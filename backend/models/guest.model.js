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
    phoneNumber: {
        type: String,
        required: true
    },
    idImg: {
        data: String,
        contentType: String
    },
    passaportImg: {
        data: String,
        contentType: String
    },
    profileImg: {
        type: String,
    },
    selectedCountry: {
        type: String,
        // required: true
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