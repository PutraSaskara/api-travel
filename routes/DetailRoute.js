// routes/tours.js
const express = require('express');
const DetailControllers = require('../controllers/DetailController')
// const authMiddleware = require('../middleware/auth.js'); 



const router = express.Router();

router.get('/detail', DetailControllers.getDetails);
router.get('/detail/:id', DetailControllers.getDetailById);
router.post('/detail', DetailControllers.createDetail);
router.patch('/detail/:id', DetailControllers.updateDetail);
router.delete('/detail/:id', DetailControllers.deleteDetail);

module.exports = router;
