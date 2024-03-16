const express = require('express');
const TourController = require('../controllers/TourController.js');
const authMiddleware = require('../middleware/auth.js'); // Import your authentication middleware

const router = express.Router();

// router.get('/tours',authMiddleware ,  TourController.getTours); // Apply authentication middleware before the route handler
// router.get('/tours/:id',authMiddleware, TourController.getTourById);
// router.post('/tours',authMiddleware, TourController.createTour);
// router.patch('/tours/:id',authMiddleware, TourController.updateTour);
// router.delete('/tours/:id',authMiddleware, TourController.deleteTour);

router.get('/tours' ,  TourController.getTours); // Apply authentication middleware before the route handler
router.get('/tours/:id', TourController.getTourById);
router.post('/tours', TourController.createTour);
router.patch('/tours/:id', TourController.updateTour);
router.delete('/tours/:id', TourController.deleteTour);

module.exports = router;
