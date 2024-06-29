const mongoose = require('mongoose');

let Review = new mongoose.Schema({
    breweryId: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    description: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('reviews', Review);
