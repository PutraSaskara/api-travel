// routes/tours.js
const express = require('express');
const DescriptionController = require('../controllers/DescriptionController')
const authMiddleware = require('../middleware/auth.js'); 



const router = express.Router();

router.get('/desc',authMiddleware, DescriptionController.getDescriptions);
router.get('/desc/:id',authMiddleware, DescriptionController.getDescriptionById);
router.post('/desc',authMiddleware, DescriptionController.createDescription);
router.patch('/desc/:id',authMiddleware, DescriptionController.updateDescription);
router.delete('/desc/:id',authMiddleware, DescriptionController.deleteDescription);

module.exports = router;
