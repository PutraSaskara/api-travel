const express = require('express');
const CancellationController = require('../controllers/CancellationController')
const authMiddleware = require('../middleware/auth.js'); 



const router = express.Router();

router.get('/cancellation', CancellationController.getCancellations);
router.get('/cancellation/:id', CancellationController.getCancellationById);
router.post('/cancellation', CancellationController.createCancellation);
router.patch('/cancellation/:id', CancellationController.updateCancellation);
router.delete('/cancellation/:id', CancellationController.deleteCancellation);

// By tourId

router.get('/cancellations/:tourId', CancellationController.getCancellationByTourId)
router.patch('/cancellations/:tourId', CancellationController.updateCancellationByTourId)

module.exports = router;
