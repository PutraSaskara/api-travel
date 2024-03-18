const Detail = require("../models/DetailModel");
const Tour = require('../models/TourModel');

// Get all details
exports.getDetails = async (req, res) => {
    try {
        const details = await Detail.findAll();
        res.status(200).json(details);
    } catch (error) {
        console.error("Error getting details:", error.message);
        res.status(500).json({ error: "Could not retrieve details" });
    }
};

// Get detail by ID
exports.getDetailById = async (req, res) => {
    try {
        const detail = await Detail.findByPk(req.params.id);
        if (!detail) {
            return res.status(404).json({ error: "Detail not found" });
        }
        res.status(200).json(detail);
    } catch (error) {
        console.error("Error getting detail by ID:", error.message);
        res.status(500).json({ error: "Could not retrieve detail" });
    }
};


// Get detail by tourId
exports.getDetailByTourId = async (req, res) => {
    try {
        const { tourId } = req.params;
        const detail = await Detail.findOne({ where: { tourId } });
        if (!detail) {
            return res.status(404).json({ error: "Detail not found" });
        }

        res.status(200).json(detail);
    } catch (error) {
        console.error("Error getting detail:", error.message);
        res.status(500).json({ error: "Could not retrieve detail" });
    }
};

// Create a new detail
// exports.createDetail = async (req, res) => {
//     try {
//         // Extract necessary data from request body
//         const { tourId, detail1, detail2, detail3, detail4, detail5, detail6, detail7, detail8, detail9 } = req.body;

//         // Check if a detail with the same tourId already exists
//         const existingDetail = await Detail.findOne({ where: { tourId } });
//         if (existingDetail) {
//             return res.status(400).json({ error: 'A detail with the same tourId already exists' });
//         }

//         // Check if the associated tour exists
//         const tourInstance = await Tour.findByPk(tourId);
//         if (!tourInstance) {
//             return res.status(404).json({ error: 'Tour not found' });
//         }

//         // Create the detail and associate it with the tour
//         await Detail.create({
//             tourId,
//             detail1,
//             detail2,
//             detail3,
//             detail4,
//             detail5,
//             detail6,
//             detail7,
//             detail8,
//             detail9,
//         });

//         return res.status(201).json({ message: 'Detail created successfully' });
//     } catch (error) {
//         console.error('Error creating detail:', error);
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// };


exports.createDetail = async (req, res) => {
    try {
        // Extract necessary data from request body
        const { tourId, detail1, detail2, detail3, detail4, detail5, detail6, detail7, detail8, detail9 } = req.body;

        // Check if a detail with the same tourId already exists
        const existingDetail = await Detail.findOne({ where: { tourId } });
        if (existingDetail) {
            return res.status(400).json({ error: 'A detail with the same tourId already exists' });
        }

        // Check if the associated tour exists
        const tourInstance = await Tour.findByPk(tourId);
        if (!tourInstance) {
            return res.status(404).json({ error: 'Tour not found' });
        }

        // Create the detail and associate it with the tour
        await Detail.create({
            tourId,
            detail1,
            detail2,
            detail3,
            detail4,
            detail5,
            detail6,
            detail7,
            detail8,
            detail9,
        });

        return res.status(201).json({ message: 'Detail created successfully' });
    } catch (error) {
        console.error('Error creating detail:', error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


// Update an existing detail
exports.updateDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const detail = await Detail.findByPk(id);
        if (!detail) {
            return res.status(404).json({ error: "Detail not found" });
        }

        // Update the detail
        await detail.update(req.body);

        res.status(200).json({ message: "Detail updated successfully" });
    } catch (error) {
        console.error("Error updating detail:", error.message);
        res.status(400).json({ error: "Could not update detail" });
    }
};


// update with tourId
exports.updateDetailByTourId = async (req, res) => {
    try {
        const { tourId } = req.params;
        const detail = await Detail.findOne({ where: { tourId } });
        if (!detail) {
            return res.status(404).json({ error: "Detail not found" });
        }

        // Update the detail
        await detail.update(req.body);

        res.status(200).json({ message: "Detail updated successfully" });
    } catch (error) {
        console.error("Error updating detail:", error.message);
        res.status(400).json({ error: "Could not update detail" });
    }
};



// Delete a detail
exports.deleteDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRowCount = await Detail.destroy({ where: { id } });
        if (deletedRowCount === 0) {
            return res.status(404).json({ error: "Detail not found" });
        }
        res.status(200).json({ message: "Detail deleted successfully" });
    } catch (error) {
        console.error("Error deleting detail:", error.message);
        res.status(500).json({ error: "Could not delete detail" });
    }
};
