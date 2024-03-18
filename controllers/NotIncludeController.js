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

// Get notInclude by ID
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

// Create a new notInclude
// exports.createNotInclude = async (req, res) => {
//     try {
//         const { tourId, notinclude1, notinclude2, notinclude3 } = req.body;

//         // Check if a NotInclude with the same tourId already exists
//         const existingNotInclude = await NotInclude.findOne({ where: { tourId } });
//         if (existingNotInclude) {
//             return res.status(400).json({ error: "NotInclude with the same tourId already exists" });
//         }

//         await NotInclude.create({ tourId, notinclude1, notinclude2, notinclude3 });
//         res.status(201).json({ message: "NotInclude created successfully" });
//     } catch (error) {
//         console.error("Error creating NotInclude:", error.message);
//         res.status(400).json({ error: "Could not create NotInclude" });
//     }
// };

// Update an existing notInclude

exports.createNotInclude = async (req, res) => {
    try {
        const { tourId, notinclude1, notinclude2, notinclude3 } = req.body;

        // Check if a NotInclude with the same tourId already exists
        const existingNotInclude = await NotInclude.findOne({ where: { tourId } });
        if (existingNotInclude) {
            return res.status(400).json({ error: "NotInclude with the same tourId already exists" });
        }

        // Check if at least one not include field is provided
        if (!notinclude1 && !notinclude2 && !notinclude3) {
            return res.status(400).json({ error: 'At least one not include field is required' });
        }

        await NotInclude.create({ tourId, notinclude1, notinclude2, notinclude3 });
        res.status(201).json({ message: "NotInclude created successfully" });
    } catch (error) {
        console.error("Error creating NotInclude:", error);
        if (error.name === 'SequelizeValidationError') {
            // Handle validation errors
            const errors = error.errors.map(err => ({ field: err.path, message: err.message }));
            return res.status(400).json({ error: "Validation failed", errors });
        } else {
            // Handle other errors
            return res.status(500).json({ error: "Internal server error" });
        }
    }
};







// exports.updateNotInclude = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { tourId, notinclude1, notinclude2, notinclude3 } = req.body;

//         // Check if a NotInclude with the same tourId already exists
//         const existingNotInclude = await NotInclude.findOne({ where: { tourId } });
//         if (existingNotInclude && existingNotInclude.id !== id) {
//             return res.status(400).json({ error: "NotInclude with the same tourId already exists" });
//         }

//         const [updatedRows] = await NotInclude.update(
//             { tourId, notinclude1, notinclude2, notinclude3 },
//             { where: { id } }
//         );

//         if (updatedRows === 0) {
//             return res.status(404).json({ error: "NotInclude not found" });
//         }

//         res.status(200).json({ message: "NotInclude updated successfully" });
//     } catch (error) {
//         console.error("Error updating NotInclude:", error.message);
//         res.status(400).json({ error: "Could not update NotInclude" });
//     }
// };

// Delete a notInclude

exports.updateNotInclude = async (req, res) => {
    try {
        const { id } = req.params;
        const { tourId, notinclude1, notinclude2, notinclude3 } = req.body;

        // Check if the NotInclude entry with the provided ID exists
        const existingNotInclude = await NotInclude.findByPk(id);
        if (!existingNotInclude) {
            return res.status(404).json({ error: "NotInclude not found" });
        }

        // Check if a NotInclude with the same tourId already exists
        const otherNotInclude = await NotInclude.findOne({ where: { tourId } });
        if (otherNotInclude && otherNotInclude.id !== id) {
            return res.status(400).json({ error: "Another NotInclude with the same tourId already exists" });
        }

        // Update the NotInclude entry
        await existingNotInclude.update({ tourId, notinclude1, notinclude2, notinclude3 });

        res.status(200).json({ message: "NotInclude updated successfully" });
    } catch (error) {
        console.error("Error updating NotInclude:", error);
        if (error.name === 'SequelizeValidationError') {
            // Handle validation errors
            const errors = error.errors.map(err => ({ field: err.path, message: err.message }));
            return res.status(400).json({ error: "Validation failed", errors });
        } else {
            // Handle other errors
            return res.status(500).json({ error: "Internal server error" });
        }
    }
};




exports.deleteNotInclude = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRowCount = await NotInclude.destroy({ where: { id } });
        if (deletedRowCount === 0) {
            return res.status(404).json({ error: "NotInclude not found" });
        }
        res.status(200).json({ message: "NotInclude deleted successfully" });
    } catch (error) {
        console.error("Error deleting NotInclude:", error.message);
        res.status(500).json({ error: "Could not delete NotInclude" });
    }
};
