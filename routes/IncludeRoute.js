// routes/tours.js
const express = require('express');
const IncludeController = require('../controllers/IncludeController')



const router = express.Router();

router.get('/include', IncludeController.getInclude);
router.get('/include/:id', IncludeController.getIncludeById);
router.post('/include', IncludeController.createInclude);
router.patch('/include', IncludeController.updateInclude);
router.delete('/include', IncludeController.deleteInclude);

module.exports = router;
