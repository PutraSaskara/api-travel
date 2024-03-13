const Cancel = require("../models/CancellationModel");

// Get all cancel;
exports.getCancel = async (req, res) => {
    try {
        const cancel = await Cancel.findAll();
        res.status(200).json(cancel);
    } catch (error) {
        console.error("Error getting Cancellation:", error.message);
        res.status(500).json({ error: "Could not retrieve Cancellation" });
    }
};

// Get cancel by ID
exports.getCancelById = async (req, res) => {
    try {
        const cancel = await Cancel.findByPk(req.params.id);
        if (!cancel) {
            return res.status(404).json({ error: "Cancellation not found" });
        }
        res.status(200).json(cancel);
    } catch (error) {
        console.error("Error getting cancel by ID:", error.message);
        res.status(500).json({ error: "Could not retrieve Cancellation" });
    }
};

// Create a new cancel
exports.createCancel = async (req, res) => {
    try {
        await Cancel.create(req.body);
        res.status(201).json({ message: "Cancellation created successfully" });
    } catch (error) {
        console.error("Error creating Cancellation:", error.message);
        res.status(400).json({ error: "Could not create Cancellation" });
    }
};

// Update an existing cancel
exports.updateCancel = async (req, res) => {
    try {
        const { id } = req.params;
        const [updatedRows] = await Cancel.update(req.body, { where: { id } });
        if (updatedRows === 0) {
            return res.status(404).json({ error: "Cancellation not found" });
        }
        res.status(200).json({ message: "Cancellation updated successfully" });
    } catch (error) {
        console.error("Error updating Cancellation:", error.message);
        res.status(400).json({ error: "Could not update Cancellation" });
    }
};

// Delete an cancel
exports.deleteCancel = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRowCount = await Cancel.destroy({ where: { id } });
        if (deletedRowCount === 0) {
            return res.status(404).json({ error: "Cancellation not found" });
        }
        res.status(200).json({ message: "Cancellation deleted successfully" });
    } catch (error) {
        console.error("Error deleting Cancellation:", error.message);
        res.status(500).json({ error: "Could not delete Cancellation" });
    }
};
