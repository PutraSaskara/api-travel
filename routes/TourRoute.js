// routes/tours.js
const express = require('express');
const TourController = require('../controllers/TourController.js')



const router = express.Router();

router.get('/tours', TourController.getTours);
router.get('/tours/:id', TourController.getTourById);
router.post('/tours', TourController.createTour);
router.patch('/tours/:id', TourController.updateTour);
router.delete('/tours/:id', TourController.deleteTour);

module.exports = router;
