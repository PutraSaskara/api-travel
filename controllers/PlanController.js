const Plan = require("../models/PlanModel");
const Tour = require("../models/TourModel");

// Get all plans
exports.getPlans = async (req, res) => {
  try {
    const plans = await Plan.findAll();
    res.status(200).json(plans);
  } catch (error) {
    console.error("Error getting plans:", error.message);
    res.status(500).json({ error: "Could not retrieve plans" });
  }
};

// Get plan by ID
exports.getPlanById = async (req, res) => {
  try {
    const plan = await Plan.findByPk(req.params.id);
    if (!plan) {
      return res.status(404).json({ error: "Plan not found" });
    }
    res.status(200).json(plan);
  } catch (error) {
    console.error("Error getting plan by ID:", error.message);
    res.status(500).json({ error: "Could not retrieve plan" });
  }
};

// Create a new plan
exports.createPlan = async (req, res) => {
  try {
    // Extract necessary data from request body
    const {
      tourId,
      title1,
      description1,
      link1,
      title2,
      description2,
      link2,
      title3,
      description3,
      link3,
      title4,
      description4,
      link4,
      title5,
      description5,
      link5,
      title6,
      description6,
      link6,
      title7,
      description7,
      link7,
      title8,
      description8,
      link8,
      title9,
      description9,
      link9,
    } = req.body;

    // Check if a plan with the same tourId already exists
    const existingPlan = await Plan.findOne({ where: { tourId } });
    if (existingPlan) {
      return res
        .status(400)
        .json({ error: "A plan with the same tourId already exists" });
    }

    // Check if the associated tour exists
    const tourInstance = await Tour.findByPk(tourId);
    if (!tourInstance) {
      return res.status(404).json({ error: "Tour not found" });
    }

    // Create the plan and associate it with the tour
    const planInstance = await Plan.create({
      title1,
      description1,
      link1,
      title2,
      description2,
      link2,
      title3,
      description3,
      link3,
      title4,
      description4,
      link4,
      title5,
      description5,
      link5,
      title6,
      description6,
      link6,
      title7,
      description7,
      link7,
      title8,
      description8,
      link8,
      title9,
      description9,
      link9,
      tourId: tourInstance.id, // Set the foreign key to the id of the associated Tour
    });

    return res
      .status(201)
      .json({ message: "Plan created successfully", plan: planInstance });
  } catch (error) {
    console.error("Error creating plan:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Update an existing plan
exports.updatePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const plan = await Plan.findByPk(id);
    if (!plan) {
      return res.status(404).json({ error: "Plan not found" });
    }

    // Partially update the plan with the fields provided in the request body
    await plan.update(req.body);

    res.status(200).json({ message: "Plan updated successfully" });
  } catch (error) {
    console.error("Error updating plan:", error.message);
    res.status(400).json({ error: "Could not update plan" });
  }
};

// Delete a plan
exports.deletePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRowCount = await Plan.destroy({ where: { id } });
    if (deletedRowCount === 0) {
      return res.status(404).json({ error: "Plan not found" });
    }
    res.status(200).json({ message: "Plan deleted successfully" });
  } catch (error) {
    console.error("Error deleting plan:", error.message);
    res.status(500).json({ error: "Could not delete plan" });
  }
};
