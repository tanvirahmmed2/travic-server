const Tour = require("../model/tour.model");

const cloudinary = require('../config/cloudinary')


const getTour = async (req, res) => {
    try {
        const tours = await Tour.find({})
        if (!tours || tours.length === 0) {
            return res.status(400).send({
                success: false,
                message: 'No tour found'
            });
        }
        return res.status(200).send({
            success: true,
            message: 'Successfully found tours',
            payload: tours
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Could not fetch tours'
        })
    }
}

const newTour = async (req, res) => {
    try {
        const { title, location, price, duration,  description, departure, highlights, includes, tags } = req.body
        if (!title || !location || !price || !duration  ||  !description || !tags || !departure || !highlights || !includes) {
            return res.status(400).send({
                success: false,
                message: 'Fill all inputs'
            });
        }
        const existTour = await Tour.findOne({ title })
        if (existTour) {
            return res.status(400).send({
                success: false,
                message: 'This tour package already exists'
            });
        }
        
        const highlightArry = Array.isArray(highlights)
            ? highlights
            : highlights?.split(",").map((t) => t.trim());

        const includeArry = Array.isArray(includes)
            ? includes
            : includes?.split(",").map((t) => t.trim());

        if (!req.file) {
            return res.status(400).send({
                success: false,
                message: 'Please add an image'
            });
        }
        const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

        const uploadImage = await cloudinary.uploader.upload(fileStr, { folder: 'tours' })



        const newTour = new Tour({ title, location, price, duration,   description, image: uploadImage.secure_url, imageId: uploadImage.public_id, departure, highlights: highlightArry, includes: includeArry })
        await newTour.save()
        return res.status(200).send({
            success: true,
            message: 'New tour package added successfully'
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Operation failed',
            error: error.message,
            stack: error.stack
        })
    }
}



const removeTour = async (req, res) => {
    try {
        const { id } = req.body
        if (!id) {
            return res.status(400).send({
                success: false,
                message: 'Tour id not found'
            });
        }
        const tour = await Tour.findById(id)
        if (!tour) {
            return res.status(400).send({
                success: false,
                message: 'Tour not found'
            });
        }
        await cloudinary.uploader.destroy(tour.imageId)
        await Tour.findByIdAndDelete(id)
        return res.status(200).send({
            success: true,
            message: 'Successfully deleted tour'
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Failed to remove tour'
        })
    }
}



module.exports = {
    getTour,
    removeTour,
    newTour
}