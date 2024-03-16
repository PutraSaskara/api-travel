const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Define a function to filter files
const fileFilter = (req, file, cb) => {
    // Check if the file type is webp
    if (file.mimetype === 'image/webp') {
        cb(null, true); // Accept the file
    } else {
        console.error('Only webp images are allowed');
        cb(new Error('Only webp images are allowed'), false); // Reject the file
    }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads'); // Specify the destination folder for storing images
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        cb(null, uuidv4() + uniqueSuffix + fileExtension); // Generate a unique filename
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter, // Apply the file filter
    limits: {
        fileSize: 5 * 1024 * 1024 // Set the maximum file size to 5MB (5 * 1024 * 1024 bytes)
    }
});

module.exports = upload;
