// routes/tours.js
const express = require('express');
const DescriptionController = require('../controllers/DescriptionController')
const authMiddleware = require('../middleware/auth.js'); 



const router = express.Router();

// router.get('/desc',authMiddleware, DescriptionController.getDescriptions);
// router.get('/desc/:id',authMiddleware, DescriptionController.getDescriptionById);
// router.post('/desc',authMiddleware, DescriptionController.createDescription);
// router.patch('/desc/:id',authMiddleware, DescriptionController.updateDescription);
// router.delete('/desc/:id',authMiddleware, DescriptionController.deleteDescription);

router.get('/desc', DescriptionController.getDescriptions);
router.get('/desc/:id', DescriptionController.getDescriptionById);
router.post('/desc', DescriptionController.createDescription);
router.patch('/desc/:id', DescriptionController.updateDescription);
router.delete('/desc/:id', DescriptionController.deleteDescription);

// by tourId
router.get('/descs/:tourId', DescriptionController.getDescriptionByTourId);
router.patch('/descs/:tourId', DescriptionController.updateDescriptionByTourId);

module.exports = router;
