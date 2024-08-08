// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { uploadImage, getAllImages, getImageById, deleteImageById, allDataforAdmin,productUpdate } = require('../controllers/productController');
const verifyToken = require('../middleware/authMiddleware');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads'),
  filename: (req, file, cb) => cb(null, file.originalname)
});

const upload = multer({ storage }); 

router.put('/upload/:id', productUpdate)
router.post('/upload', upload.single('testImage'), uploadImage);
router.get('/upload',verifyToken, allDataforAdmin);
router.get('/cards', getAllImages);
router.get('/cards/:id', getImageById);
router.delete('/upload/:id', deleteImageById); 

module.exports = router;
