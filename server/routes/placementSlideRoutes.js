const express = require('express');
const router = express.Router();
const placementSlideController = require('../controllers/placementSlideController');
const upload = require('../middleware/upload');
const { protect } = require('../controllers/authController');

router.get('/', placementSlideController.getPlacementSlides);
router.post('/', protect, upload.single('image'), placementSlideController.addPlacementSlide);
router.put('/:id', protect, upload.single('image'), placementSlideController.updatePlacementSlide);
router.delete('/:id', protect, placementSlideController.deletePlacementSlide);

module.exports = router;
