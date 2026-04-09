const express = require('express');
const router = express.Router();
const { getSlides, addSlide, updateSlide, deleteSlide } = require('../controllers/slideController');
const { protect } = require('../controllers/authController');
const upload = require('../middleware/upload');

router.get('/', getSlides);
router.post('/', protect, upload.single('image'), addSlide);
router.put('/:id', protect, upload.single('image'), updateSlide);
router.delete('/:id', protect, deleteSlide);

module.exports = router;
