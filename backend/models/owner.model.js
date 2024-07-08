import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ownerSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Owner', ownerSchema);
