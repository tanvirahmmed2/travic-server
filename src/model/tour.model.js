const mongoose = require('mongoose')

const tourSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: String,
        required: true,
        trim: true
    },
    duration: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    departureDates: [
        {
            type: Date,
            required: true,
            trim: true
        }
    ],
    highlights: [
        {
            type: String,
            required: true,
            trim: true
        }
    ],
    image: {
        type: String,
        required: true,
        trim: true
    },
    imageId: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
})

const Tour = mongoose.model('tours', tourSchema)
module.exports = Tour