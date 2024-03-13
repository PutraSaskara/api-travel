const Plan = require("../models/PlanModel");

// Get all plan
exports.getPlan = async (req, res) => {
    try {
        const plan = await Plan.findAll();
        res.status(200).json(plan);
    } catch (error) {
        console.error("Error getting plan:", error.message);
        res.status(500).json({ error: "Could not retrieve plan" });
    }
};

// Get plan by ID
exports.getPlanById = async (req, res) => {
    try {
        const plan = await Plan.findByPk(req.params.id);
        if (!plan) {
            return res.status(404).json({ error: "plan not found" });
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
        await Plan.create(req.body);
        res.status(201).json({ message: "plan created successfully" });
    } catch (error) {
        console.error("Error creating plan:", error.message);
        res.status(400).json({ error: "Could not create plan" });
    }
};

// Update an existing plan
exports.updatePlan = async (req, res) => {
    try {
        const { id } = req.params;
        const [updatedRows] = await Plan.update(req.body, { where: { id } });
        if (updatedRows === 0) {
            return res.status(404).json({ error: "plan not found" });
        }
        res.status(200).json({ message: "plan updated successfully" });
    } catch (error) {
        console.error("Error updating plan:", error.message);
        res.status(400).json({ error: "Could not update plan" });
    }
};

// Delete an plan
exports.deletePlan = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRowCount = await Plan.destroy({ where: { id } });
        if (deletedRowCount === 0) {
            return res.status(404).json({ error: "plan not found" });
        }
        res.status(200).json({ message: "plan deleted successfully" });
    } catch (error) {
        console.error("Error deleting plan:", error.message);
        res.status(500).json({ error: "Could not delete plan" });
    }
};
