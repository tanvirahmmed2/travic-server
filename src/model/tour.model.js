const mongoose= require('mongoose')

const tourSchema= new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    location:{
        type: String,
        required: true,
        trim: true
    },
    price:{
        type: String,
        required: true,
        trim: true
    },
    duration:{
        type: String,
        required: true,
        trim: true
    },
})

const Tour= mongoose.model('tours', tourSchema)
module.exports= Tour