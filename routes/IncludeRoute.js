// routes/tours.js
const express = require('express');
const IncludeController = require('../controllers/IncludeController')
const authMiddleware = require('../middleware/auth.js'); 



const router = express.Router();

router.get('/include',authMiddleware, IncludeController.getIncludes);
router.get('/include/:id',authMiddleware, IncludeController.getIncludeById);
router.post('/include',authMiddleware, IncludeController.createInclude);
router.patch('/include/:id',authMiddleware, IncludeController.updateInclude);
router.delete('/include/:id',authMiddleware, IncludeController.deleteInclude);

module.exports = router;
