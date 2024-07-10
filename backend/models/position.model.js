const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const slotSchema = new Schema({
    maxHoursPerWeek: {
        type: Number,
        required: true
    },
    shifts: [
        {
            day: {
                type: String,
                required: true
            },
            startTime: {
                type: String,
                required: true
            },
            endTime: {
                type: String,
                required: true
            },
        }
    ],
    availability: [
        {
            date: {
                type: Date,
                required: true
            },
            status: {
                type: Boolean, // True: Available, False: Unavailable
                required: true
            },
        }
    ]
});

const positionSchema = new Schema({
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'Owner',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    confirmedVolunteers: [{
        type: Schema.Types.ObjectId,
        ref: 'Volunteer'
    }],
    slots: [slotSchema],
    requirements: [{
        age: {
            type: String,
            required: true
        },
        languages: {
            type: [String],
            required: true
        }
    }]

});

module.exports = mongoose.model('Position', positionSchema);
