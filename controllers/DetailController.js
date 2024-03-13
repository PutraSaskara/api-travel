const Detail = require("../models/DetailModel");

// Get all detail;
exports.getDetail = async (req, res) => {
    try {
        const detail = await Detail.findAll();
        res.status(200).json(detail);
    } catch (error) {
        console.error("Error getting detail:", error.message);
        res.status(500).json({ error: "Could not retrieve detail" });
    }
};

// Get detail by ID
exports.getDetailById = async (req, res) => {
    try {
        const detail = await Detail.findByPk(req.params.id);
        if (!detail) {
            return res.status(404).json({ error: "detail not found" });
        }
        res.status(200).json(detail);
    } catch (error) {
        console.error("Error getting detail by ID:", error.message);
        res.status(500).json({ error: "Could not retrieve detail" });
    }
};

// Create a new detail
exports.createDetail = async (req, res) => {
    try {
        await Detail.create(req.body);
        res.status(201).json({ message: "detail created successfully" });
    } catch (error) {
        console.error("Error creating detail:", error.message);
        res.status(400).json({ error: "Could not create detail" });
    }
};

// Update an existing detail
exports.updateDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const [updatedRows] = await Detail.update(req.body, { where: { id } });
        if (updatedRows === 0) {
            return res.status(404).json({ error: "detail not found" });
        }
        res.status(200).json({ message: "detail updated successfully" });
    } catch (error) {
        console.error("Error updating detail:", error.message);
        res.status(400).json({ error: "Could not update detail" });
    }
};

// Delete an detail
exports.deleteDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRowCount = await Detail.destroy({ where: { id } });
        if (deletedRowCount === 0) {
            return res.status(404).json({ error: "detail not found" });
        }
        res.status(200).json({ message: "detail deleted successfully" });
    } catch (error) {
        console.error("Error deleting detail:", error.message);
        res.status(500).json({ error: "Could not delete detail" });
    }
};
