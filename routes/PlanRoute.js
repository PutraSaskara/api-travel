// routes/tours.js
const express = require('express');
const PlanController = require('../controllers/PlanController')



const router = express.Router();

router.get('/plan', PlanController.getPlan);
router.get('/plan/:id', PlanController.getPlanById);
router.post('/plan', PlanController.createPlan);
router.patch('/plan', PlanController.updatePlan);
router.delete('/plan', PlanController.deletePlan);

module.exports = router;
