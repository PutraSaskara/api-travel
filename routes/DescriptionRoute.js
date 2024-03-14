// routes/tours.js
const express = require('express');
const DescriptionController = require('../controllers/DescriptionController')
// const authMiddleware = require('../middleware/auth.js'); 



const router = express.Router();

router.get('/desc', DescriptionController.getDescriptions);
router.get('/desc/:id', DescriptionController.getDescriptionById);
router.post('/desc', DescriptionController.createDescription);
router.patch('/desc/:id', DescriptionController.updateDescription);
router.delete('/desc/:id', DescriptionController.deleteDescription);

module.exports = router;
