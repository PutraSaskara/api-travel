const express = require('express');
const CancellationController = require('../controllers/CancellationController')



const router = express.Router();

router.get('/cancellation', CancellationController.getCancel);
router.get('/cancellation/:id', CancellationController.getCancelById);
router.post('/cancellation', CancellationController.createCancel);
router.patch('/cancellation', CancellationController.updateCancel);
router.delete('/cancellation', CancellationController.deleteCancel);

module.exports = router;
