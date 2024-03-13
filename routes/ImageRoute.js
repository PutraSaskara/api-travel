const express = require('express');
const ImageController = require('../controllers/ImageController')
const upload = require ('../middleware/uploadMiddleware.js');



const router = express.Router();

router.get('/image', ImageController.getImage);
router.get('/image/:id', ImageController.getImageById);
router.post('/image',upload.array('image', 3), ImageController.createImage);
router.patch('/image',upload.array('image', 3), ImageController.updateImage);
router.delete('/image', ImageController.deleteImage);

module.exports = router;
