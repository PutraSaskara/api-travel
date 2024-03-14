const BlogParagraf = require("../models/BlogParagrafModel");
const SingleBlog = require('../models/SingleBlogModel');

// Get all blog paragraphs
exports.getBlogParagraphs = async (req, res) => {
    try {
        const blogParagraphs = await BlogParagraf.findAll();
        res.status(200).json(blogParagraphs);
    } catch (error) {
        console.error("Error getting blog paragraphs:", error.message);
        res.status(500).json({ error: "Could not retrieve blog paragraphs" });
    }
};

// Get blog paragraph by ID
exports.getBlogParagraphById = async (req, res) => {
    try {
        const blogParagraph = await BlogParagraf.findByPk(req.params.id);
        if (!blogParagraph) {
            return res.status(404).json({ error: "Blog paragraph not found" });
        }
        res.status(200).json(blogParagraph);
    } catch (error) {
        console.error("Error getting blog paragraph by ID:", error.message);
        res.status(500).json({ error: "Could not retrieve blog paragraph" });
    }
};

// Create a new blog paragraph
exports.createBlogParagraph = async (req, res) => {
    try {
        // Extract necessary data from request body
        const { blogId, paragraf1, titleparagraf2, paragraf2, titleparagraf3, paragraf3, titleparagraf4, paragraf4, titleparagraf5, paragraf5, titleparagraf6, paragraf6, titleparagraf7, paragraf7, Conclusion } = req.body;

        // Check if a blog paragraph with the same blogId already exists
        const existingBlogParagraph = await BlogParagraf.findOne({ where: { blogId } });
        if (existingBlogParagraph) {
            return res.status(400).json({ error: 'A blog paragraph with the same blogId already exists' });
        }

        // Check if the associated blog exists
        const blogInstance = await SingleBlog.findByPk(blogId);
        if (!blogInstance) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        // Create the blog paragraph and associate it with the blog
        await BlogParagraf.create({
            blogId,
            paragraf1,
            titleparagraf2,
            paragraf2,
            titleparagraf3,
            paragraf3,
            titleparagraf4,
            paragraf4,
            titleparagraf5,
            paragraf5,
            titleparagraf6,
            paragraf6,
            titleparagraf7,
            paragraf7,
            Conclusion
        });

        return res.status(201).json({ message: 'Blog paragraph created successfully' });
    } catch (error) {
        console.error('Error creating blog paragraph:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Update an existing blog paragraph
exports.updateBlogParagraph = async (req, res) => {
    try {
        const { id } = req.params;
        const blogParagraph = await BlogParagraf.findByPk(id);
        if (!blogParagraph) {
            return res.status(404).json({ error: "Blog paragraph not found" });
        }

        // Update the blog paragraph
        await blogParagraph.update(req.body);

        res.status(200).json({ message: "Blog paragraph updated successfully" });
    } catch (error) {
        console.error("Error updating blog paragraph:", error.message);
        res.status(400).json({ error: "Could not update blog paragraph" });
    }
};

// Delete a blog paragraph
exports.deleteBlogParagraph = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRowCount = await BlogParagraf.destroy({ where: { id } });
        if (deletedRowCount === 0) {
            return res.status(404).json({ error: "Blog paragraph not found" });
        }
        res.status(200).json({ message: "Blog paragraph deleted successfully" });
    } catch (error) {
        console.error("Error deleting blog paragraph:", error.message);
        res.status(500).json({ error: "Could not delete blog paragraph" });
    }
};
