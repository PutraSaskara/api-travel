const Tour = require("../models/TourModel.js");
const Plan = require("../models/PlanModel.js");
const Include = require("../models/IncludeMode.js");
const NotInclude = require("../models/NotIncludeModel.js");
const Image = require("../models/ImageModel.js");
const Detail = require("../models/DetailModel.js");
const Description = require("../models/DescriptionModel.js");
const Cancellation = require("../models/CancellationModel.js");
const fs = require("fs");
const path = require("path");
const { validationResult } = require('express-validator');

// exports.getTours = async function (req, res) {
//     try {
//         const tours = await Tour.findAll();
//         res.status(200).json(tours);
//     } catch (error) {
//         console.error("Error getting tours:", error.message);
//         res.status(500).json({ error: "Could not retrieve tours" });
//     }
// };

exports.getTours = async function (req, res) {
  try {
    const tours = await Tour.findAll({
      include: [
        { model: Detail },
        { model: Plan },
        { model: Description },
        { model: Include },
        { model: NotInclude },
        { model: Cancellation },
        { model: Image },
      ],
    });
    res.status(200).json(tours);
  } catch (error) {
    console.error("Error getting tours:", error.message);
    res.status(500).json({ error: "Could not retrieve tours" });
  }
};

exports.getTourById = async function (req, res) {
  try {
    const id = req.params.id;
    const tour = await Tour.findByPk(id, {
      include: [
        { model: Detail },
        { model: Plan },
        { model: Description },
        { model: Include },
        { model: NotInclude },
        { model: Cancellation },
        { model: Image },
      ],
    });

    if (!tour) {
      return res.status(404).json({ error: "Tour not found" });
    }

    res.json({
      tour
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.getTourBySlug = async function (req, res) {
  try {
    const slug = req.params.slug; // Get the slug from request parameters
    const tour = await Tour.findOne({
      where: { slug }, // Find the tour with the provided slug
      include: [
        { model: Detail },
        { model: Plan },
        { model: Description },
        { model: Include },
        { model: NotInclude },
        { model: Cancellation },
        { model: Image },
      ],
    });

    if (!tour) {
      return res.status(404).json({ error: "Tour not found" });
    }

    res.json({
      tour
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.getTourByIdSimple = async function (req, res) {
  try {
    const { id } = req.params;
    const tour = await Tour.findByPk(id);
    if (!tour) {
      return res.status(404).json({ error: "Tour not found" });
    }
    res.status(200).json(tour);
  } catch (error) {
    console.error("Error fetching tour:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// exports.updateTour = async function (req, res) {
//   try {
//     const { id } = req.params;
//     let tour = await Tour.findByPk(id);
//     if (!tour) {
//       return res.status(404).json({ error: "Tour not found" });
//     }
//     const { 
//         title,
//         price1,
//         pricenote1,
//         price2,
//         pricenote2,
//         price3,
//         pricenote3, } = req.body;

//     await tour.update({
//         title,
//         price1,
//         pricenote1,
//         price2,
//         pricenote2,
//         price3,
//         pricenote3,
//       // Add other fields to update
//     });

//     tour = await Tour.findByPk(id);
//     res.status(200).json(tour);
//   } catch (error) {
//     console.error("Error updating tour:", error.message);
//     res.status(400).json({ error: "Could not update tour" });
//   }
// };

exports.updateTour = async function (req, res) {
  try {
    const { id } = req.params;
    let tour = await Tour.findByPk(id);
    if (!tour) {
      return res.status(404).json({ error: "Tour not found" });
    }
    const { 
        title,
        price1,
        pricenote1,
        price2,
        pricenote2,
        price3,
        pricenote3,
        keywords,
       } = req.body;

    await tour.update({
        title,
        price1,
        pricenote1,
        price2,
        pricenote2,
        price3,
        pricenote3,
        keywords,
      // Add other fields to update
    });

    tour = await Tour.findByPk(id);
    res.status(200).json(tour);
  } catch (error) {
    console.error("Error updating tour:", error.message);
    if (error.name === 'SequelizeValidationError') {
      // Handle validation errors
      const errors = error.errors.map(err => ({ field: err.path, message: err.message }));
      res.status(400).json({ error: "Validation failed", errors });
    } else if (error.name === 'SequelizeUniqueConstraintError') {
      // Handle unique constraint violation errors
      res.status(400).json({ error: "Unique constraint violation", message: error.message });
    } else {
      // Handle other errors
      res.status(500).json({ error: "Internal server error" });
    }
  }
};


// exports.deleteTour = async function (req, res) {
//     try {
//         const { id } = req.params;
//         const tour = await Tour.findByPk(id);
//         if (!tour) {
//             return res.status(404).json({ error: "Tour not found" });
//         }
//         await tour.destroy();
//         res.status(200).json({ message: "Tour deleted successfully" });
//     } catch (error) {
//         console.error("Error deleting tour:", error.message);
//         res.status(500).json({ error: "Could not delete tour" });
//     }
// };

exports.deleteTour = async function (req, res) {
  try {
    const { id } = req.params;

    // Find the tour to be deleted
    const tour = await Tour.findByPk(id);

    if (!tour) {
      return res.status(404).json({ error: "Tour not found" });
    }

    // Get the tourId
    const tourId = tour.id;

    // Find and delete all associated images
    const images = await Image.findAll({ where: { tourId } });
    images.forEach(async (image) => {
      // Delete the associated files in the public/uploads directory
      if (image.image1) {
        const imagePath1 = path.join(
          __dirname,
          "../public/uploads",
          image.image1
        );
        fs.unlinkSync(imagePath1);
      }
      if (image.image2) {
        const imagePath2 = path.join(
          __dirname,
          "../public/uploads",
          image.image2
        );
        fs.unlinkSync(imagePath2);
      }
      if (image.image3) {
        const imagePath3 = path.join(
          __dirname,
          "../public/uploads",
          image.image3
        );
        fs.unlinkSync(imagePath3);
      }
    });

    // Delete all other associated records with the same tourId
    await Promise.all([
      Plan.destroy({ where: { tourId } }),
      Include.destroy({ where: { tourId } }),
      NotInclude.destroy({ where: { tourId } }),
      Detail.destroy({ where: { tourId } }),
      Description.destroy({ where: { tourId } }),
      Cancellation.destroy({ where: { tourId } }),
      // Add other associations here
    ]);

    // Delete the tour
    await tour.destroy();

    res
      .status(200)
      .json({
        message: "Tour, associated records, and images deleted successfully",
      });
  } catch (error) {
    console.error("Error deleting tour:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// exports.createTour = async function (req, res) {
//   try {
//     const {
//       title,
//       price1,
//       pricenote1,
//       price2,
//       pricenote2,
//       price3,
//       pricenote3,
//     } = req.body;
//     const newTour = await Tour.create({
//       title,
//       price1,
//       pricenote1,
//       price2,
//       pricenote2,
//       price3,
//       pricenote3,
//       // Add other fields here
//     });
//     res.status(201).json(newTour);
//   } catch (error) {
//     console.error("Error creating tour:", error.message);
//     res.status(400).json({ error: error.message });
//   }
// };



exports.createTour = async function (req, res) {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      price1,
      pricenote1,
      price2,
      pricenote2,
      price3,
      pricenote3,
      keywords,
    } = req.body;

    // Example: Check if title is provided
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    // Example: Check if price1 is provided
    if (!price1) {
      return res.status(400).json({ error: "Price1 is required" });
    }

    // Example: Add more specific validation checks for other fields

    // Create the tour
    const newTour = await Tour.create({
      title,
      price1,
      pricenote1,
      price2,
      pricenote2,
      price3,
      pricenote3,
      keywords,
      // Add other fields here
    });
    res.status(201).json(newTour);
  } catch (error) {
    console.error("Error creating tour:", error.message);
    res.status(400).json({ error: error.message });
  }
};
