// routes/tours.js
const express = require('express');
const NotIncludeController = require('../controllers/NotIncludeController')
const authMiddleware = require('../middleware/auth.js'); 



const router = express.Router();

router.get('/not-include', NotIncludeController.getNotInclude);
router.get('/not-include/:id', NotIncludeController.getNotIncludeById);
router.post('/not-include', NotIncludeController.createNotInclude);
router.patch('/not-include/:id', NotIncludeController.updateNotInclude);
router.delete('/not-include/:id', NotIncludeController.deleteNotInclude);

// By tourId
router.get('/not-includes/:tourId', NotIncludeController.getNotIncludeByTourId);
router.patch('/not-includes/:tourId', NotIncludeController.updateNotIncludeByTourId);

module.exports = router;
