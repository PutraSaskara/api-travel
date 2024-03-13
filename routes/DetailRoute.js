// routes/tours.js
const express = require('express');
const DetailControllers = require('../controllers/DetailController')



const router = express.Router();

router.get('/detail', DetailControllers.getDetail);
router.get('/detail/:id', DetailControllers.getDetailById);
router.post('/detail', DetailControllers.createDetail);
router.patch('/detail', DetailControllers.updateDetail);
router.delete('/detail', DetailControllers.deleteDetail);

module.exports = router;
