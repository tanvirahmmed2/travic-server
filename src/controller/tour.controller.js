const Tour = require("../model/tour.model");

const cloudinary= require('../config/cloudinary')


const getTour = async (req, res) => {
    try {
        const tours = await Tour.find({})
        if (!tours) {
            return res.status(400).send({
                success: false,
                tour: 'No tour found'
            });
        }
        res.status(200).send({
            success: false,
            tour: 'Successfully found tours',
            payload: tours
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            tour: 'Could not fetch tours'
        })
    }
}

const newTour = async (req, res) => {
    try {
        const { title, location, price, duration, rating, category, description } = req.body
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
        const newTour = new Tour({ title, location, price, duration, rating, category, description })
        await newTour.save()
        res.status(200).send({
            success: false,
            tour: 'New tour package added successfully'
        });
    } catch (error) {
        res.status(500).send({
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
        await Tour.findByIdAndDelete(id)
        res.status(200).send({
            success: false,
            tour: 'Successfully deleted tour'
        })

    } catch (error) {
        res.status(500).send({
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