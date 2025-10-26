const Tour = require("../model/tour.model");


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
        const { name, email, subject, tour } = req.body
        if (!name || !email || !subject || !tour) {
            return res.status(400).send({
                success: false,
                tour: 'Fill all field'
            });
        }
        const newMessage = new User({ name, email, subject, tour })
        await newMessage.save()
        res.status(200).send({
            success: true,
            tour: `Thank you ${name} fro messaging`
        })

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