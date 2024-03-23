const express = require('express');
const SingleBlogController = require('../controllers/SingleBlogController')
const authMiddleware = require('../middleware/auth.js'); // Import your authentication middleware

const router = express.Router();

// router.get('/single-blog',authMiddleware, SingleBlogController.getBlogs); // Apply authentication middleware before the route handler
// router.get('/single-blog/:id',authMiddleware, SingleBlogController.getBlogById);
// router.post('/single-blog',authMiddleware, SingleBlogController.createBlog);
// router.patch('/single-blog/:id',authMiddleware, SingleBlogController.updateBlog);
// router.delete('/single-blog/:id',authMiddleware, SingleBlogController.deleteBlog);


router.get('/single-blog', SingleBlogController.getBlogs); // Apply authentication middleware before the route handler
router.get('/single-blog/:id', SingleBlogController.getBlogById);
router.get('/single-blog-slug/:slug', SingleBlogController.getBlogBySlug);
router.post('/single-blog', SingleBlogController.createBlog);
router.patch('/single-blog/:id', SingleBlogController.updateBlog);
router.delete('/single-blog/:id', SingleBlogController.deleteBlog);

module.exports = router;
