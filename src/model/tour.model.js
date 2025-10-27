const mongoose = require('mongoose')

const tourSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        trim: true
    },
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
    departureDates: { type: [String], default: [] },
    highlights: { type: [String], default: [] },
    includes: { type: [String], default: [] },
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