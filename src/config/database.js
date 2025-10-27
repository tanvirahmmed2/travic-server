const mongoose = require('mongoose')
const { MONGO_URI } = require('./secret')


const connectDB = async () => {
    try {
        if (!MONGO_URI) {
            console.log(`mongo url missing`)
        } else {
            await mongoose.connect(MONGO_URI)
                .then(() => {
                    console.log(`Successfully connected mongoDB`)
                })
                .catch((error) => {
                    console.log(`Failed to connect mongoDB`)
                    console.log(error)
                })
        }

    } catch (error) {
        console.log(`Server error` + error)
    }
}

module.exports = connectDB