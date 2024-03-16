// routes/tours.js
const express = require('express');
const DetailControllers = require('../controllers/DetailController')
const authMiddleware = require('../middleware/auth.js'); 



const router = express.Router();

router.get('/detail',authMiddleware, DetailControllers.getDetails);
router.get('/detail/:id',authMiddleware, DetailControllers.getDetailById);
router.post('/detail',authMiddleware, DetailControllers.createDetail);
router.patch('/detail/:id',authMiddleware, DetailControllers.updateDetail);
router.delete('/detail/:id',authMiddleware, DetailControllers.deleteDetail);

module.exports = router;
