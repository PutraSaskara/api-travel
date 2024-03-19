const Cancellation = require("../models/CancellationModel");
const Tour = require('../models/TourModel');

// Get all cancellations
exports.getCancellations = async (req, res) => {
    try {
        const cancellations = await Cancellation.findAll();
        res.status(200).json(cancellations);
    } catch (error) {
        console.error("Error getting cancellations:", error.message);
        res.status(500).json({ error: "Could not retrieve cancellations" });
    }
};

// Get cancellation by ID
exports.getCancellationById = async (req, res) => {
    try {
        const cancellation = await Cancellation.findByPk(req.params.id);
        if (!cancellation) {
            return res.status(404).json({ error: "Cancellation not found" });
        }
        res.status(200).json(cancellation);
    } catch (error) {
        console.error("Error getting cancellation by ID:", error.message);
        res.status(500).json({ error: "Could not retrieve cancellation" });
    }
};
exports.getCancellationByTourId = async (req, res) => {
    try {
        const { tourId } = req.params;
        const cancellation = await Cancellation.findOne({ where: { tourId } });
        if (!cancellation) {
            return res.status(404).json({ error: "cancellation not found" });
        }

        res.status(200).json(cancellation);
    } catch (error) {
        console.error("Error getting cancellation:", error.message);
        res.status(500).json({ error: "Could not retrieve cancellation" });
    }
};

// Create a new cancellation
// exports.createCancellation = async (req, res) => {
//     try {
//         // Extract necessary data from request body
//         const { tourId, cancel1, cancel2 } = req.body;

//         // Check if a cancellation with the same tourId already exists
//         const existingCancellation = await Cancellation.findOne({ where: { tourId } });
//         if (existingCancellation) {
//             return res.status(400).json({ error: 'A cancellation with the same tourId already exists' });
//         }

//         // Check if the associated tour exists
//         const tourInstance = await Tour.findByPk(tourId);
//         if (!tourInstance) {
//             return res.status(404).json({ error: 'Tour not found' });
//         }

//         // Create the cancellation and associate it with the tour
//         await Cancellation.create({
//             tourId,
//             cancel1,
//             cancel2,
//         });

//         return res.status(201).json({ message: 'Cancellation created successfully' });
//     } catch (error) {
//         console.error('Error creating cancellation:', error);
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// };

// Update an existing cancellation


exports.createCancellation = async (req, res) => {
    try {
        // Extract necessary data from request body
        const { tourId, cancel1, cancel2 } = req.body;

        // Check if the associated tour exists
        const tourInstance = await Tour.findByPk(tourId);
        if (!tourInstance) {
            return res.status(404).json({ error: 'Tour not found' });
        }

        // Check if a cancellation with the same tourId already exists
        const existingCancellation = await Cancellation.findOne({ where: { tourId } });
        if (existingCancellation) {
            return res.status(400).json({ error: 'A cancellation for this tour already exists' });
        }

        // Check if at least one cancellation field is provided
        if (!cancel1 && !cancel2) {
            return res.status(400).json({ error: 'At least one cancellation field is required' });
        }

        // Create the cancellation and associate it with the tour
        await Cancellation.create({
            tourId,
            cancel1,
            cancel2,
        });

        return res.status(201).json({ message: 'Cancellation created successfully' });
    } catch (error) {
        console.error('Error creating cancellation:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};






// exports.updateCancellation = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const cancellation = await Cancellation.findByPk(id);
//         if (!cancellation) {
//             return res.status(404).json({ error: "Cancellation not found" });
//         }

//         // Update the cancellation
//         await cancellation.update(req.body);

//         res.status(200).json({ message: "Cancellation updated successfully" });
//     } catch (error) {
//         console.error("Error updating cancellation:", error.message);
//         res.status(400).json({ error: "Could not update cancellation" });
//     }
// };

// Delete a cancellation

exports.updateCancellation = async (req, res) => {
    try {
        const { id } = req.params;
        const cancellation = await Cancellation.findByPk(id);
        if (!cancellation) {
            return res.status(404).json({ error: "Cancellation not found" });
        }

        // Update the cancellation
        await cancellation.update(req.body);

        res.status(200).json({ message: "Cancellation updated successfully" });
    } catch (error) {
        console.error("Error updating cancellation:", error.message);
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ error: "Validation error: " + error.message });
        }
        return res.status(500).json({ error: "Could not update cancellation" });
    }
};

exports.updateCancellationByTourId = async (req, res) => {
    try {
        const { tourId } = req.params;
        const cancellation = await Cancellation.findOne({ where: { tourId } });
        if (!cancellation) {
            return res.status(404).json({ error: "Cancellation not found" });
        }

        // Update the cancellation
        await cancellation.update(req.body);

        res.status(200).json({ message: "Cancellation updated successfully" });
    } catch (error) {
        console.error("Error updating cancellation:", error.message);
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ error: "Validation error: " + error.message });
        }
        return res.status(500).json({ error: "Could not update cancellation" });
    }
};



exports.deleteCancellation = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRowCount = await Cancellation.destroy({ where: { id } });
        if (deletedRowCount === 0) {
            return res.status(404).json({ error: "Cancellation not found" });
        }
        res.status(200).json({ message: "Cancellation deleted successfully" });
    } catch (error) {
        console.error("Error deleting cancellation:", error.message);
        res.status(500).json({ error: "Could not delete cancellation" });
    }
};
