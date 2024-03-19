// routes/tours.js
const express = require('express');
const PlanController = require('../controllers/PlanController')
const authMiddleware = require('../middleware/auth.js'); 



const router = express.Router();

// router.get('/plan',authMiddleware, PlanController.getPlans);
// router.get('/plan/:id',authMiddleware, PlanController.getPlanById);
// router.post('/plan',authMiddleware, PlanController.createPlan);
// router.patch('/plan/:id',authMiddleware, PlanController.updatePlan);
// router.delete('/plan/:id',authMiddleware, PlanController.deletePlan);

router.get('/plan', PlanController.getPlans);
router.get('/plan/:id', PlanController.getPlanById);
router.post('/plan', PlanController.createPlan);
router.patch('/plan/:id', PlanController.updatePlan);
router.delete('/plan/:id', PlanController.deletePlan);

// By tourId

router.get('/plans/:tourId', PlanController.getPlanByTourId);
router.patch('/plans/:tourId', PlanController.updatePlanByTourId);



module.exports = router;
