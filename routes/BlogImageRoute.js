const express = require('express');
const BlogImage = require('../controllers/BlogImageController.js')
const upload = require ('../middleware/uploadMiddleware.js');
// const authMiddleware = require('../middleware/auth.js'); 



const router = express.Router();

router.get('/blog-image', BlogImage.getBlogImages);
router.get('/blog-image/:id', BlogImage.getBlogImageById);
router.post('/blog-image', upload.array('image', 3), BlogImage.createBlogImage);
router.patch('/blog-image/:id', upload.array('image', 3), BlogImage.updateBlogImage);
router.delete('/blog-image/:id',  BlogImage.deleteBlogImage);

module.exports = router;
