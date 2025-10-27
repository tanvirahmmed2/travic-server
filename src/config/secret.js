require('dotenv').config()

const PORT= process.env.PORT
const MONGO_URI= process.env.MONGO_URI
const CLOUDINARY_NAME=process.env.CLOUDINARY_NAME
const CLOUDINARY_API_KEY= process.env.CLOUDINARY_API_KEY
const CLOUDINARY_API_SECRET= process.env.CLOUDINARY_API_SECRET
const JWT_SECRET= process.env.JWT_SECRET
const BREVO_API_KEY=process.env.BREVO_API_KEY
const SENDER_EMAIL=process.env.SENDER_EMAIL






module.exports={
    PORT,
    MONGO_URI,
    CLOUDINARY_API_KEY,
    CLOUDINARY_NAME,
    CLOUDINARY_API_SECRET,
    JWT_SECRET,
    BREVO_API_KEY,
    SENDER_EMAIL

}