const Image = require("../models/ImageModel");

// Get all image;

exports.getImage = async (req, res) => {
    try {
        const images = await Image.findAll();
        res.status(200).json(images);
    } catch (error) {
        console.error("Error retrieving images:", error.message);
        res.status(500).json({ error: "Could not retrieve images" });
    }
};


// Get image by ID

exports.getImageById = async (req, res) => {
    try {
        const { id } = req.params; // Assuming you're passing the ID of the image to retrieve in the URL params

        // Find the image record by ID
        const image = await Image.findByPk(id);

        if (!image) {
            throw new Error("Image not found");
        }

        res.status(200).json(image);
    } catch (error) {
        console.error("Error retrieving image:", error.message);
        res.status(404).json({ error: error.message });
    }
};


// Create a new image

exports.createImage = async (req, res) => {
    try {
        // Check if files are uploaded
        if (!req.files || req.files.length !== 3) {
            throw new Error("Please upload three images");
        }

        // Create image record with image names and URLs
        const newImages = await Image.create({
            image1: "http://localhost:5000/uploads/" + req.files[0].filename, // Save the first image URL to image1 field
            image2: "http://localhost:5000/uploads/" + req.files[1].filename, // Save the second image URL to image2 field
            image3: "http://localhost:5000/uploads/" + req.files[2].filename, // Save the third image URL to image3 field
        });

        res.status(201).json(newImages);
    } catch (error) {
        console.error("Error creating images:", error.message);
        res.status(400).json({ error: error.message });
    }
};



// Update an existing image
exports.updateImage = async (req, res) => {
    try {
        const { id } = req.params; // Assuming you're passing the ID of the image to update in the URL params
        const { image1, image2, image3 } = req.body; // Assuming you're passing the image filenames in the request body

        // Find the image record by ID
        const image = await Image.findByPk(id);

        if (!image) {
            throw new Error("Image not found");
        }

        // Update the image record with new image filenames
        await image.update({
            image1,
            image2,
            image3
        });

        res.status(200).json({ message: "Image updated successfully" });
    } catch (error) {
        console.error("Error updating image:", error.message);
        res.status(400).json({ error: error.message });
    }
};


// Delete an image

exports.deleteImage = async (req, res) => {
    try {
        const { id } = req.params; // Assuming you're passing the ID of the image to delete in the URL params

        // Find the image record by ID
        const image = await Image.findByPk(id);

        if (!image) {
            throw new Error("Image not found");
        }

        // Delete the image record
        await image.destroy();

        res.status(200).json({ message: "Image deleted successfully" });
    } catch (error) {
        console.error("Error deleting image:", error.message);
        res.status(400).json({ error: error.message });
    }
};
