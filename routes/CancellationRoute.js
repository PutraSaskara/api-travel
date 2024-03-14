const express = require('express');
const CancellationController = require('../controllers/CancellationController')



const router = express.Router();

router.get('/cancellation', CancellationController.getCancellations);
router.get('/cancellation/:id', CancellationController.getCancellationById);
router.post('/cancellation', CancellationController.createCancellation);
router.patch('/cancellation/:id', CancellationController.updateCancellation);
router.delete('/cancellation/:id', CancellationController.deleteCancellation);

module.exports = router;
