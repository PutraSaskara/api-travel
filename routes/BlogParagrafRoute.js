// routes/tours.js
const express = require('express');
const BlogParagraf = require('../controllers/BlogParagrafController')
const authMiddleware = require('../middleware/auth.js'); 



const router = express.Router();

router.get('/paragraf', BlogParagraf.getBlogParagraphs);
router.get('/paragraf/:id', BlogParagraf.getBlogParagraphById);
router.post('/paragraf', BlogParagraf.createBlogParagraph);
router.patch('/paragraf/:id', BlogParagraf.updateBlogParagraph);
router.delete('/paragraf/:id', BlogParagraf.deleteBlogParagraph);

// by tourId
router.get('/paragrafs/:blogId', BlogParagraf.getBlogParagraphByBlogId);
router.patch('/paragrafs/:blogId', BlogParagraf.updateBlogParagraphByBlogId);



module.exports = router;
