const Tour = require("../model/tour.model");

const cloudinary = require('../config/cloudinary')


const getTour = async (req, res) => {
    try {
        const tours = await Tour.find({})
        if (tours.length === 0) {
            return res.status(400).send({
                success: false,
                tour: 'No tour found'
            });
        }
        return res.status(200).send({
            success: false,
            tour: 'Successfully found tours',
            payload: tours
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            tour: 'Could not fetch tours'
        })
    }
}

const newTour = async (req, res) => {
    try {
        const { title, location, price, duration, rating, category, description, departureDates, highlights, includes } = req.body
        if (!title || !location || !price || !duration || !rating || !category || !description) {
            return res.status(400).send({
                success: false,
                tour: 'Fill all inputs'
            });
        }
        const existTour = await Tour.findOne({ title })
        if (existTour) {
            return res.status(400).send({
                success: false,
                tour: 'This tour package already exists'
            });
        }
        const departureDateArry = Array.isArray(departureDates)
            ? departureDates
            : departureDates?.split(",").map((t) => t.trim());

        const highlightArry = Array.isArray(highlights)
            ? highlights
            : highlights?.split(",").map((t) => t.trim());

        const includeArry = Array.isArray(includes)
            ? includes
            : includes?.split(",").map((t) => t.trim());

        if (!req.file) {
            return res.status(400).send({
                success: false,
                tour: 'Please add an image'
            });
        }
        const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

        const uploadImage = await cloudinary.uploader.upload(fileStr, { folder: 'blogs' })



        const newTour = new Tour({ title, location, price, duration, rating, category, description, image: uploadImage.secure_url, imageId: uploadImage.public_id, departureDates: departureDateArry, highlights: highlightArry, includes: includeArry })
        await newTour.save()
        return res.status(200).send({
            success: true,
            tour: 'New tour package added successfully'
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            tour: 'Operation failed'
        })
    }
}



const removeTour = async (req, res) => {
    try {
        const { id } = req.body
        if (!id) {
            return res.status(400).send({
                success: false,
                tour: 'Tour id not found'
            });
        }
        const tour = await Tour.findById(id)
        if (!tour) {
            return res.status(400).send({
                success: false,
                tour: 'Tour not found'
            });
        }
        await cloudinary.uploader.destroy(tour.imageId)
        await Tour.findByIdAndDelete(id)
        return res.status(200).send({
            success: true,
            tour: 'Successfully deleted tour'
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            tour: 'Failed to remove tour'
        })
    }
}



module.exports = {
    getTour,
    removeTour,
    newTour
}