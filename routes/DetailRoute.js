// routes/tours.js
const express = require('express');
const DetailControllers = require('../controllers/DetailController')
const authMiddleware = require('../middleware/auth.js'); 



const router = express.Router();

// router.get('/detail',authMiddleware, DetailControllers.getDetails);
// router.get('/detail/:id',authMiddleware, DetailControllers.getDetailById);
// router.post('/detail',authMiddleware, DetailControllers.createDetail);
// router.patch('/detail/:id',authMiddleware, DetailControllers.updateDetail);
// router.delete('/detail/:id',authMiddleware, DetailControllers.deleteDetail);

router.get('/detail', DetailControllers.getDetails);
router.get('/detail/:id', DetailControllers.getDetailById);
router.post('/detail', DetailControllers.createDetail);
router.patch('/detail/:id', DetailControllers.updateDetail);
router.delete('/detail/:id', DetailControllers.deleteDetail);

// update with tourId
router.patch('/details/:tourId', DetailControllers.updateDetailByTourId)
router.get('/details/:tourId', DetailControllers.getDetailByTourId)

module.exports = router;
