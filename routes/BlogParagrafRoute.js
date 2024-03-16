// routes/tours.js
const express = require('express');
const BlogParagraf = require('../controllers/BlogParagrafController')
const authMiddleware = require('../middleware/auth.js'); 



const router = express.Router();

router.get('/paragraf',authMiddleware, BlogParagraf.getBlogParagraphs);
router.get('/paragraf/:id',authMiddleware, BlogParagraf.getBlogParagraphById);
router.post('/paragraf',authMiddleware, BlogParagraf.createBlogParagraph);
router.patch('/paragraf/:id',authMiddleware, BlogParagraf.updateBlogParagraph);
router.delete('/paragraf/:id',authMiddleware, BlogParagraf.deleteBlogParagraph);

module.exports = router;
