const express = require('express');
const router = express.Router();
const { getAbout, getMissionVision, updateContent } = require('../controllers/contentController');
const { protect } = require('../controllers/authController');

router.get('/about', getAbout);
router.get('/mission-vision', getMissionVision);
router.put('/', protect, updateContent);

module.exports = router;
