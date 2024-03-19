const express = require('express');
const ImageController = require('../controllers/ImageController')
const upload = require ('../middleware/uploadMiddleware.js');
const authMiddleware = require('../middleware/auth.js'); 



const router = express.Router();

// router.get('/image',authMiddleware, ImageController.getImage);
// router.get('/image/:id',authMiddleware, ImageController.getImageById);
// router.post('/image',authMiddleware, upload.array('image', 3), ImageController.createImage);
// router.patch('/image/:tourId',authMiddleware, upload.array('image', 3), ImageController.updateImage);
// router.delete('/image/:id',authMiddleware,  ImageController.deleteImage);

router.get('/image', ImageController.getImage);
router.get('/image/:id', ImageController.getImageById);
router.get('/images/:tourId', ImageController.getImageByTourId);
router.post('/image', upload.array('image', 3), ImageController.createImage);
router.patch('/image/:tourId', upload.array('image', 3), ImageController.updateImage);
router.delete('/image/:id',  ImageController.deleteImage);

module.exports = router;
