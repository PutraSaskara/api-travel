const Desc = require("../models/DescriptionModel");

// Get all description
exports.getDesc = async (req, res) => {
    try {
        const description = await Desc.findAll();
        res.status(200).json(description);
    } catch (error) {
        console.error("Error getting description:", error.message);
        res.status(500).json({ error: "Could not retrieve description" });
    }
};

// Get description by ID
exports.getDescById = async (req, res) => {
    try {
        const description = await Desc.findByPk(req.params.id);
        if (!description) {
            return res.status(404).json({ error: "description not found" });
        }
        res.status(200).json(description);
    } catch (error) {
        console.error("Error getting description by ID:", error.message);
        res.status(500).json({ error: "Could not retrieve description" });
    }
};

// Create a new description
exports.createDesc = async (req, res) => {
    try {
        await Desc.create(req.body);
        res.status(201).json({ message: "description created successfully" });
    } catch (error) {
        console.error("Error creating description:", error.message);
        res.status(400).json({ error: "Could not create description" });
    }
};

// Update an existing description
exports.updateDesc = async (req, res) => {
    try {
        const { id } = req.params;
        const [updatedRows] = await Desc.update(req.body, { where: { id } });
        if (updatedRows === 0) {
            return res.status(404).json({ error: "description not found" });
        }
        res.status(200).json({ message: "description updated successfully" });
    } catch (error) {
        console.error("Error updating description:", error.message);
        res.status(400).json({ error: "Could not update description" });
    }
};

// Delete an description
exports.deleteDesc = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRowCount = await Desc.destroy({ where: { id } });
        if (deletedRowCount === 0) {
            return res.status(404).json({ error: "description not found" });
        }
        res.status(200).json({ message: "description deleted successfully" });
    } catch (error) {
        console.error("Error deleting description:", error.message);
        res.status(500).json({ error: "Could not delete description" });
    }
};
