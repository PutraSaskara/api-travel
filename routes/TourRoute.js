// routes/tours.js
const express = require('express');
const TourController = require('../controllers/TourController.js')



const router = express.Router();

router.get('tours/:id', TourController.getTourById);

module.exports = router;
