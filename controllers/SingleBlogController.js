const SingleBlog = require("../models/SingleBlogModel.js");
const BlogParagraf = require('../models/BlogParagrafModel.js');
const BlogImage = require('../models/BlogImageModel.js');
const fs = require('fs');
const path = require('path');

// exports.getBlogs = async function (req, res) {
//     try {
//         const blogs = await SingleBlog.findAll();
//         res.status(200).json(blogs);
//     } catch (error) {
//         console.error("Error getting blogs:", error.message);
//         res.status(500).json({ error: "Could not retrieve blogs" });
//     }    
// };

exports.getBlogs = async function (req, res) {
    try {
        const blogs = await SingleBlog.findAll({
            include: [
                { model: BlogParagraf },
                { model: BlogImage },
            ]
        });
        res.status(200).json(blogs);
    } catch (error) {
        console.error("Error getting blogs:", error.message);
        res.status(500).json({ error: "Could not retrieve blogs" });
    }
};

exports.getBlogById = async function (req, res) {
    try {
        const id = req.params.id;
        const blog = await SingleBlog.findByPk(id, {
            include: [
                { model: BlogParagraf },
                { model: BlogImage },
            ]
        });

        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        res.json({
            blog
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// exports.updateBlog = async function (req, res) {
//     try {
//         const { id } = req.params;
//         let blog = await SingleBlog.findByPk(id);
//         if (!blog) {
//             return res.status(404).json({ error: "Blog not found" });
//         }
//         const { title, author } = req.body;

//         await blog.update({
//             title,
//             author
//             // Add other fields to update
//         });

//         blog = await SingleBlog.findByPk(id);
//         res.status(200).json(blog);
//     } catch (error) {
//         console.error("Error updating blog:", error.message);
//         res.status(400).json({ error: "Could not update blog" });
//     }
// };


exports.updateBlog = async function (req, res) {
    try {
        const { id } = req.params;
        let blog = await SingleBlog.findByPk(id);
        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }
        const { title, author } = req.body;

        await blog.update({
            title,
            author
            // Add other fields to update
        });

        blog = await SingleBlog.findByPk(id);
        res.status(200).json(blog);
    } catch (error) {
        console.error("Error updating blog:", error.message);
        if (error.name === 'SequelizeValidationError') {
            // Handle validation errors
            const errors = error.errors.map(err => ({ field: err.path, message: err.message }));
            res.status(400).json({ error: "Validation failed", errors });
        } else {
            // Handle other errors
            res.status(500).json({ error: "Internal server error" });
        }
    }
};





exports.deleteBlog = async function (req, res) {
    try {
        const { id } = req.params;

        // Find the blog to be deleted
        const blog = await SingleBlog.findByPk(id);

        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        // Get the tourId
        const blogId = blog.id;

        // Find and delete all associated images
        const images = await BlogImage.findAll({ where: { blogId } });
        images.forEach(async (image) => {
            // Delete the associated files in the public/uploads directory
            if (image.image1) {
                const imagePath1 = path.join(__dirname, '../public/uploads', image.image1);
                fs.unlinkSync(imagePath1);
            }
            if (image.image2) {
                const imagePath2 = path.join(__dirname, '../public/uploads', image.image2);
                fs.unlinkSync(imagePath2);
            }
            if (image.image3) {
                const imagePath3 = path.join(__dirname, '../public/uploads', image.image3);
                fs.unlinkSync(imagePath3);
            }
        });


        // Delete associated blog paragraphs and images
        await Promise.all([
            BlogParagraf.destroy({ where: { blogId: id } }),
            BlogImage.destroy({ where: { blogId: id } })
        ]);

        // Delete the blog
        await blog.destroy();

        res.status(200).json({ message: "Blog and associated records deleted successfully" });
    } catch (error) {
        console.error("Error deleting blog:", error.message);
        res.status(500).json({ error: error.message });
    }
};

// exports.createBlog = async function (req, res) {
//     try {
//         const { title, author } = req.body;
//         const newBlog = await SingleBlog.create({
//             title,
//             author
//             // Add other fields here
//         });
//         res.status(201).json(newBlog);
//     } catch (error) {
//         console.error("Error creating blog:", error.message);
//         res.status(400).json({ error: error.message });
//     }
// };


exports.createBlog = async function (req, res) {
    try {
        const { title, author } = req.body;
        const newBlog = await SingleBlog.create({
            title,
            author
            // Add other fields here
        });
        res.status(201).json(newBlog);
    } catch (error) {
        console.error("Error creating blog:", error.message);
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
