const express = require('express');
const CancellationController = require('../controllers/CancellationController')
const authMiddleware = require('../middleware/auth.js'); 



const router = express.Router();

router.get('/cancellation',authMiddleware, CancellationController.getCancellations);
router.get('/cancellation/:id',authMiddleware, CancellationController.getCancellationById);
router.post('/cancellation',authMiddleware, CancellationController.createCancellation);
router.patch('/cancellation/:id',authMiddleware, CancellationController.updateCancellation);
router.delete('/cancellation/:id',authMiddleware, CancellationController.deleteCancellation);

module.exports = router;
