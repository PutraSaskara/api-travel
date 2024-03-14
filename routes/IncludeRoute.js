// routes/tours.js
const express = require('express');
const IncludeController = require('../controllers/IncludeController')



const router = express.Router();

router.get('/include', IncludeController.getIncludes);
router.get('/include/:id', IncludeController.getIncludeById);
router.post('/include', IncludeController.createInclude);
router.patch('/include/:id', IncludeController.updateInclude);
router.delete('/include/:id', IncludeController.deleteInclude);

module.exports = router;
