// routes/tours.js
const express = require('express');
const PlanController = require('../controllers/PlanController')
// const authMiddleware = require('../middleware/auth.js'); 



const router = express.Router();

router.get('/plan', PlanController.getPlans);
router.get('/plan/:id', PlanController.getPlanById);
router.post('/plan', PlanController.createPlan);
router.patch('/plan/:id', PlanController.updatePlan);
router.delete('/plan/:id', PlanController.deletePlan);

module.exports = router;
