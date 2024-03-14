const BlogImage = require("../models/BlogImageModel");
const fs = require('fs');
const path = require('path');
const baseURL = require('../config');

// Get all blog images
exports.getBlogImages = async (req, res) => {
    try {
        const blogImages = await BlogImage.findAll();
        res.status(200).json(blogImages);
    } catch (error) {
        console.error("Error retrieving blog images:", error.message);
        res.status(500).json({ error: "Could not retrieve blog images" });
    }
};

// Get blog image by ID
exports.getBlogImageById = async (req, res) => {
    try {
        const { id } = req.params;
        const blogImage = await BlogImage.findByPk(id);

        if (!blogImage) {
            throw new Error("Blog image not found");
        }

        res.status(200).json(blogImage);
    } catch (error) {
        console.error("Error retrieving blog image:", error.message);
        res.status(404).json({ error: error.message });
    }
};

// Create a new blog image
exports.createBlogImage = async (req, res) => {
    try {
        if (!req.files || req.files.length !== 3) {
            throw new Error("Please upload three images");
        }

        const { blogId } = req.body;

        // Check if an image with the same blogId already exists
        const existingImage = await BlogImage.findOne({ where: { blogId } });

        if (existingImage) {
            throw new Error("Image for this blog already exists");
        }

        const images = req.files.map(file => ({
            filename: file.filename,
            url: `${baseURL}/uploads/${file.filename}`
        }));

        const newImages = await BlogImage.create({
            blogId,
            image1: images[0].filename,
            imageUrl1: images[0].url,
            image2: images[1].filename,
            imageUrl2: images[1].url,
            image3: images[2].filename,
            imageUrl3: images[2].url
        });

        res.status(201).json(newImages);
    } catch (error) {
        console.error("Error creating blog images:", error.message);
        res.status(400).json({ error: error.message });
    }
};


// Update an existing blog image
exports.updateBlogImage = async (req, res) => {
    try {
        // Your update blog image logic here
    } catch (error) {
        console.error("Error updating blog image:", error.message);
        res.status(400).json({ error: error.message });
    }
};

// Delete a blog image
exports.deleteBlogImage = async (req, res) => {
    try {
        const { id } = req.params;
        const blogImage = await BlogImage.findByPk(id);

        if (!blogImage) {
            throw new Error("Blog image not found");
        }

        const filesToDelete = [];

        for (let i = 1; i <= 3; i++) {
            const imageField = `image${i}`;
            const imageUrlField = `imageUrl${i}`;
            if (blogImage[imageField]) {
                const imagePath = path.join(__dirname, '../public/uploads', blogImage[imageField]);
                fs.unlinkSync(imagePath);
                filesToDelete.push(blogImage[imageField]);
                filesToDelete.push(blogImage[imageUrlField]);
            }
        }

        await blogImage.destroy();

        res.status(200).json({ message: "Blog image deleted successfully", deletedFiles: filesToDelete });
    } catch (error) {
        console.error("Error deleting blog image:", error.message);
        res.status(400).json({ error: error.message });
    }
};
