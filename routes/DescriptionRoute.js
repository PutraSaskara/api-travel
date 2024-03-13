// routes/tours.js
const express = require('express');
const DescriptionController = require('../controllers/DescriptionController')



const router = express.Router();

router.get('/desc', DescriptionController.getDesc);
router.get('/desc/:id', DescriptionController.getDescById);
router.post('/desc', DescriptionController.createDesc);
router.patch('/desc', DescriptionController.updateDesc);
router.delete('/desc', DescriptionController.deleteDesc);

module.exports = router;
