const Description = require("../models/DescriptionModel");
const Tour = require('../models/TourModel');

// Get all descriptions
exports.getDescriptions = async (req, res) => {
    try {
        const descriptions = await Description.findAll();
        res.status(200).json(descriptions);
    } catch (error) {
        console.error("Error getting descriptions:", error.message);
        res.status(500).json({ error: "Could not retrieve descriptions" });
    }
};

// Get description by ID
exports.getDescriptionById = async (req, res) => {
    try {
        const description = await Description.findByPk(req.params.id);
        if (!description) {
            return res.status(404).json({ error: "Description not found" });
        }
        res.status(200).json(description);
    } catch (error) {
        console.error("Error getting description by ID:", error.message);
        res.status(500).json({ error: "Could not retrieve description" });
    }
};

// Create a new description
// exports.createDescription = async (req, res) => {
//     try {
//         // Extract necessary data from request body
//         const { tourId, paragraf1, paragraf2, paragraf3 } = req.body;

//         // Check if a description with the same tourId already exists
//         const existingDescription = await Description.findOne({ where: { tourId } });
//         if (existingDescription) {
//             return res.status(400).json({ error: 'A description with the same tourId already exists' });
//         }

//         // Check if the associated tour exists
//         const tourInstance = await Tour.findByPk(tourId);
//         if (!tourInstance) {
//             return res.status(404).json({ error: 'Tour not found' });
//         }

//         // Create the description and associate it with the tour
//         await Description.create({
//             tourId,
//             paragraf1,
//             paragraf2,
//             paragraf3,
//         });

//         return res.status(201).json({ message: 'Description created successfully' });
//     } catch (error) {
//         console.error('Error creating description:', error);
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// };

// Update an existing description

exports.createDescription = async (req, res) => {
    try {
        // Extract necessary data from request body
        const { tourId, paragraf1, paragraf2, paragraf3 } = req.body;

        // Check if a description with the same tourId already exists
        const existingDescription = await Description.findOne({ where: { tourId } });
        if (existingDescription) {
            return res.status(400).json({ error: 'A description with the same tourId already exists' });
        }

        // Check if the associated tour exists
        const tourInstance = await Tour.findByPk(tourId);
        if (!tourInstance) {
            return res.status(404).json({ error: 'Tour not found' });
        }

        // Create the description and associate it with the tour
        await Description.create({
            tourId,
            paragraf1,
            paragraf2,
            paragraf3,
        });

        return res.status(201).json({ message: 'Description created successfully' });
    } catch (error) {
        console.error('Error creating description:', error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
};




// exports.updateDescription = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const description = await Description.findByPk(id);
//         if (!description) {
//             return res.status(404).json({ error: "Description not found" });
//         }

//         // Update the description
//         await description.update(req.body);

//         res.status(200).json({ message: "Description updated successfully" });
//     } catch (error) {
//         console.error("Error updating description:", error.message);
//         res.status(400).json({ error: "Could not update description" });
//     }
// };

// Delete a description

exports.updateDescription = async (req, res) => {
    try {
        const { id } = req.params;
        const description = await Description.findByPk(id);
        if (!description) {
            return res.status(404).json({ error: "Description not found" });
        }

        // Update the description
        await description.update(req.body);

        res.status(200).json({ message: "Description updated successfully" });
    } catch (error) {
        console.error("Error updating description:", error.message);
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ error: error.message });
        } else {
            return res.status(500).json({ error: "Internal server error" });
        }
    }
};





exports.deleteDescription = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRowCount = await Description.destroy({ where: { id } });
        if (deletedRowCount === 0) {
            return res.status(404).json({ error: "Description not found" });
        }
        res.status(200).json({ message: "Description deleted successfully" });
    } catch (error) {
        console.error("Error deleting description:", error.message);
        res.status(500).json({ error: "Could not delete description" });
    }
};
