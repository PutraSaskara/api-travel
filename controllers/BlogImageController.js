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
// exports.createBlogImage = async (req, res) => {
//     try {
//         if (!req.files || req.files.length !== 3) {
//             throw new Error("Please upload three images");
//         }

//         const { blogId } = req.body;

//         // Check if an image with the same blogId already exists
//         const existingImage = await BlogImage.findOne({ where: { blogId } });

//         if (existingImage) {
//             throw new Error("Image for this blog already exists");
//         }

//         const images = req.files.map(file => ({
//             filename: file.filename,
//             url: `${baseURL}/uploads/${file.filename}`
//         }));

//         const newImages = await BlogImage.create({
//             blogId,
//             image1: images[0].filename,
//             imageUrl1: images[0].url,
//             image2: images[1].filename,
//             imageUrl2: images[1].url,
//             image3: images[2].filename,
//             imageUrl3: images[2].url
//         });

//         res.status(201).json(newImages);
//     } catch (error) {
//         // Rollback file uploads if any
//         req.files.forEach(file => {
//             fs.unlinkSync(file.path); // Delete the file from the uploads folder
//         });
        
//         console.error("Error creating blog images:", error.message);
//         res.status(400).json({ error: error.message });
//     }
// };

exports.createBlogImage = async (req, res) => {
    try {
        // Check if files are uploaded and if there are exactly three files
        if (!req.files || req.files.length !== 3) {
            throw new Error("Please upload exactly three images");
        }

        const { blogId } = req.body;

        // Check if an image with the same blogId already exists
        const existingImage = await BlogImage.findOne({ where: { blogId } });
        if (existingImage) {
            throw new Error("An image for this blog already exists");
        }

        const images = req.files.map(file => ({
            filename: file.filename,
            url: `${baseURL}/uploads/${file.filename}`
        }));

        // Create a new blog image entry
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
        // Rollback file uploads if any
        req.files.forEach(file => {
            fs.unlinkSync(file.path); // Delete the file from the uploads folder
        });

        console.error("Error creating blog images:", error.message);
        res.status(400).json({ error: error.message });
    }
};




// Update an existing blog image
exports.updateBlogImage = async (req, res) => {
    try {   
        const { blogId } = req.params;

        // Find the image by tourId
        const existingImage = await BlogImage.findOne({ where: { blogId } });

        if (!existingImage) {
            throw new Error("Image for this tour does not exist");
        }

        // Check if new files are uploaded
        if (!req.files || req.files.length === 0) {
            throw new Error("Please upload at least one image");
        }

        // Delete existing files
        const imageFields = ['image1', 'image2', 'image3'];
        imageFields.forEach((field, index) => {
            if (req.files[index]) {
                const filePath = `public/uploads/${existingImage[field]}`;
                fs.unlinkSync(filePath);
            }
        });

        // Update image details
        const updatedImages = await existingImage.update({
            image1: req.files[0] ? req.files[0].filename : existingImage.image1,
            imageUrl1: req.files[0] ? `${baseURL}/uploads/${req.files[0].filename}` : existingImage.imageUrl1,
            image2: req.files[1] ? req.files[1].filename : existingImage.image2,
            imageUrl2: req.files[1] ? `${baseURL}/uploads/${req.files[1].filename}` : existingImage.imageUrl2,
            image3: req.files[2] ? req.files[2].filename : existingImage.image3,
            imageUrl3: req.files[2] ? `${baseURL}/uploads/${req.files[2].filename}` : existingImage.imageUrl3
        });

        res.status(200).json(updatedImages);
    } catch (error) {
        console.error("Error updating images:", error.message);
        // Rollback file uploads if any
        req.files.forEach(file => {
            fs.unlinkSync(file.path); // Delete the file from the uploads folder
        });
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
