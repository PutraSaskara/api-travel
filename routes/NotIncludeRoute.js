// routes/tours.js
const express = require('express');
const NotIncludeController = require('../controllers/NotIncludeController')



const router = express.Router();

router.get('/not-include', NotIncludeController.getNotInclude);
router.get('/not-include/:id', NotIncludeController.getNotIncludeById);
router.post('/not-include', NotIncludeController.createNotInclude);
router.patch('/not-include', NotIncludeController.updateNotInclude);
router.delete('/not-include', NotIncludeController.deleteNotInclude);

module.exports = router;