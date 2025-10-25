const mongoose= require('mongoose')

const tourSchema= new mongoose.Schema({

})

const Tour= mongoose.model('tours', tourSchema)
module.exports= Tour