const Include = require("../models/IncludeMode");
const Tour = require('../models/TourModel');

// Get all includes
exports.getIncludes = async (req, res) => {
    try {
        const includes = await Include.findAll();
        res.status(200).json(includes);
    } catch (error) {
        console.error("Error getting includes:", error.message);
        res.status(500).json({ error: "Could not retrieve includes" });
    }
};

// Get include by ID
exports.getIncludeById = async (req, res) => {
    try {
        const include = await Include.findByPk(req.params.id);
        if (!include) {
            return res.status(404).json({ error: "Include not found" });
        }
        res.status(200).json(include);
    } catch (error) {
        console.error("Error getting include by ID:", error.message);
        res.status(500).json({ error: "Could not retrieve include" });
    }
};

// Create a new include
// Create a new include
// exports.createInclude = async (req, res) => {
//     try {
//         // Extract necessary data from request body
//         const { tourId, include1, include2, include3 } = req.body;

//         // Check if the associated tour exists
//         const tourInstance = await Tour.findByPk(tourId);
//         if (!tourInstance) {
//             return res.status(404).json({ error: 'Tour not found' });
//         }

//         // Check if an include with the same tourId already exists
//         const existingInclude = await Include.findOne({ where: { tourId } });
//         if (existingInclude) {
//             return res.status(400).json({ error: 'Include with the same tourId already exists' });
//         }

//         // Create the include and associate it with the tour
//         await Include.create({
//             tourId,
//             include1,
//             include2,
//             include3,
//         });

//         return res.status(201).json({ message: 'Include created successfully' });
//     } catch (error) {
//         console.error('Error creating include:', error);
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// };


// Update an existing include


exports.createInclude = async (req, res) => {
    try {
        // Extract necessary data from request body
        const { tourId, include1, include2, include3 } = req.body;

        // Check if the associated tour exists
        const tourInstance = await Tour.findByPk(tourId);
        if (!tourInstance) {
            return res.status(404).json({ error: 'Tour not found' });
        }

        // Check if an include with the same tourId already exists
        const existingInclude = await Include.findOne({ where: { tourId } });
        if (existingInclude) {
            return res.status(400).json({ error: 'Include with the same tourId already exists' });
        }

        // Create the include and associate it with the tour
        const newInclude = await Include.create({
            tourId,
            include1,
            include2,
            include3,
        });

        return res.status(201).json({ message: 'Include created successfully', include: newInclude });
    } catch (error) {
        console.error('Error creating include:', error);
        if (error.name === 'SequelizeValidationError') {
            // Handle validation errors
            const errors = error.errors.map(err => ({ field: err.path, message: err.message }));
            return res.status(400).json({ error: 'Validation failed', errors });
        } else {
            // Handle other errors
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
};




// exports.updateInclude = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const include = await Include.findByPk(id);
//         if (!include) {
//             return res.status(404).json({ error: "Include not found" });
//         }

//         // Update the include
//         await include.update(req.body);

//         res.status(200).json({ message: "Include updated successfully" });
//     } catch (error) {
//         console.error("Error updating include:", error.message);
//         res.status(400).json({ error: "Could not update include" });
//     }
// };

// Delete an include

exports.updateInclude = async (req, res) => {
    try {
        const { id } = req.params;
        const include = await Include.findByPk(id);
        if (!include) {
            return res.status(404).json({ error: "Include not found" });
        }

        // Update the include
        await include.update(req.body);

        res.status(200).json({ message: "Include updated successfully" });
    } catch (error) {
        console.error("Error updating include:", error.message);
        if (error.name === 'SequelizeValidationError') {
            // Handle validation errors
            const errors = error.errors.map(err => ({ field: err.path, message: err.message }));
            return res.status(400).json({ error: 'Validation failed', errors });
        } else {
            // Handle other errors
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
};





exports.deleteInclude = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRowCount = await Include.destroy({ where: { id } });
        if (deletedRowCount === 0) {
            return res.status(404).json({ error: "Include not found" });
        }
        res.status(200).json({ message: "Include deleted successfully" });
    } catch (error) {
        console.error("Error deleting include:", error.message);
        res.status(500).json({ error: "Could not delete include" });
    }
};
