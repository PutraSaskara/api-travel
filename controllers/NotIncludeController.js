const NotInclude = require("../models/NotIncludeModel");

// Get all notInclude;
exports.getNotInclude = async (req, res) => {
    try {
        const notInclude = await NotInclude.findAll();
        res.status(200).json(notInclude);
    } catch (error) {
        console.error("Error getting notInclude:", error.message);
        res.status(500).json({ error: "Could not retrieve notInclude" });
    }
};

// Get include by ID
exports.getNotIncludeById = async (req, res) => {
    try {
        const notInclude = await NotInclude.findByPk(req.params.id);
        if (!notInclude) {
            return res.status(404).json({ error: "notInclude not found" });
        }
        res.status(200).json(notInclude);
    } catch (error) {
        console.error("Error getting notInclude by ID:", error.message);
        res.status(500).json({ error: "Could not retrieve notInclude" });
    }
};

// Create a new include
exports.createNotInclude = async (req, res) => {
    try {
        await NotInclude.create(req.body);
        res.status(201).json({ message: "notInclude created successfully" });
    } catch (error) {
        console.error("Error creating notInclude:", error.message);
        res.status(400).json({ error: "Could not create notInclude" });
    }
};

// Update an existing include
exports.updateNotInclude = async (req, res) => {
    try {
        const { id } = req.params;
        const [updatedRows] = await NotInclude.update(req.body, { where: { id } });
        if (updatedRows === 0) {
            return res.status(404).json({ error: "notInclude not found" });
        }
        res.status(200).json({ message: "notInclude updated successfully" });
    } catch (error) {
        console.error("Error updating notInclude:", error.message);
        res.status(400).json({ error: "Could not update notInclude" });
    }
};

// Delete an include
exports.deleteNotInclude = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRowCount = await NotInclude.destroy({ where: { id } });
        if (deletedRowCount === 0) {
            return res.status(404).json({ error: "notInclude not found" });
        }
        res.status(200).json({ message: "notInclude deleted successfully" });
    } catch (error) {
        console.error("Error deleting notInclude:", error.message);
        res.status(500).json({ error: "Could not delete notInclude" });
    }
};
