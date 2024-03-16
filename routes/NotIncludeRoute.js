// routes/tours.js
const express = require('express');
const NotIncludeController = require('../controllers/NotIncludeController')
const authMiddleware = require('../middleware/auth.js'); 



const router = express.Router();

router.get('/not-include',authMiddleware, NotIncludeController.getNotInclude);
router.get('/not-include/:id',authMiddleware, NotIncludeController.getNotIncludeById);
router.post('/not-include',authMiddleware, NotIncludeController.createNotInclude);
router.patch('/not-include/:id',authMiddleware, NotIncludeController.updateNotInclude);
router.delete('/not-include/:id',authMiddleware, NotIncludeController.deleteNotInclude);

module.exports = router;
