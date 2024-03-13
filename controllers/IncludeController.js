const Include = require("../models/IncludeMode");

// Get all include;
exports.getInclude = async (req, res) => {
    try {
        const include = await Include.findAll();
        res.status(200).json(include);
    } catch (error) {
        console.error("Error getting include:", error.message);
        res.status(500).json({ error: "Could not retrieve include" });
    }
};

// Get include by ID
exports.getIncludeById = async (req, res) => {
    try {
        const include = await Include.findByPk(req.params.id);
        if (!include) {
            return res.status(404).json({ error: "include not found" });
        }
        res.status(200).json(include);
    } catch (error) {
        console.error("Error getting include by ID:", error.message);
        res.status(500).json({ error: "Could not retrieve include" });
    }
};

// Create a new include
exports.createInclude = async (req, res) => {
    try {
        await Include.create(req.body);
        res.status(201).json({ message: "include created successfully" });
    } catch (error) {
        console.error("Error creating include:", error.message);
        res.status(400).json({ error: "Could not create include" });
    }
};

// Update an existing include
exports.updateInclude = async (req, res) => {
    try {
        const { id } = req.params;
        const [updatedRows] = await Include.update(req.body, { where: { id } });
        if (updatedRows === 0) {
            return res.status(404).json({ error: "include not found" });
        }
        res.status(200).json({ message: "include updated successfully" });
    } catch (error) {
        console.error("Error updating include:", error.message);
        res.status(400).json({ error: "Could not update include" });
    }
};

// Delete an include
exports.deleteInclude = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRowCount = await Include.destroy({ where: { id } });
        if (deletedRowCount === 0) {
            return res.status(404).json({ error: "include not found" });
        }
        res.status(200).json({ message: "include deleted successfully" });
    } catch (error) {
        console.error("Error deleting include:", error.message);
        res.status(500).json({ error: "Could not delete include" });
    }
};
