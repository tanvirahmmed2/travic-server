const mongoose = require('mongoose')


const blogSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    imageId: { type: String, required: true, trim: true },
    tags: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now() },

})

const Blog = mongoose.model('blogs', blogSchema)

module.exports = Blog