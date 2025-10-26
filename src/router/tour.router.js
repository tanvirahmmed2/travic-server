const express= require('express')
const { getTour, newTour, removeTour } = require('../controller/tour.controller')
const tourRouter= express.Router()



tourRouter.get('/', getTour)
tourRouter.post('/new', newTour),
tourRouter.delete('/remove', removeTour)




module.exports= tourRouter