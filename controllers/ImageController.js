const Image = require("../models/ImageModel");
const fs = require('fs');
const path = require('path');

// Get all images
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
        const { id } = req.params;
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
        if (!req.files || req.files.length !== 3) {
            throw new Error("Please upload three images");
        }

        const { tourId } = req.body;

        // Check if an image with the same tourId already exists
        const existingImage = await Image.findOne({ where: { tourId } });

        if (existingImage) {
            throw new Error("Image for this tour already exists");
        }

        const images = req.files.map(file => ({
            filename: file.filename,
            url: `http://localhost:5000/uploads/${file.filename}`
        }));

        const newImages = await Image.create({
            tourId,
            image1: images[0].filename,
            imageUrl1: images[0].url,
            image2: images[1].filename,
            imageUrl2: images[1].url,
            image3: images[2].filename,
            imageUrl3: images[2].url
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
        // Your update image logic here
    } catch (error) {
        console.error("Error updating image:", error.message);
        res.status(400).json({ error: error.message });
    }
};

// Delete an image
exports.deleteImage = async (req, res) => {
    try {
        const { id } = req.params;
        const image = await Image.findByPk(id);

        if (!image) {
            throw new Error("Image not found");
        }

        const filesToDelete = [];

        for (let i = 1; i <= 3; i++) {
            const imageField = `image${i}`;
            const imageUrlField = `imageUrl${i}`;
            if (image[imageField]) {
                const imagePath = path.join(__dirname, '../public/uploads', image[imageField]);
                fs.unlinkSync(imagePath);
                filesToDelete.push(image[imageField]);
                filesToDelete.push(image[imageUrlField]);
            }
        }

        await image.destroy();

        res.status(200).json({ message: "Image deleted successfully", deletedFiles: filesToDelete });
    } catch (error) {
        console.error("Error deleting image:", error.message);
        res.status(400).json({ error: error.message });
    }
};
