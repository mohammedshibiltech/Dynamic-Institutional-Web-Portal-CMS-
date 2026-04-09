const express = require('express');
const router = express.Router();
const { getAnnouncements, addAnnouncement, updateAnnouncement, deleteAnnouncement } = require('../controllers/announcementController');
const { protect } = require('../controllers/authController');

router.get('/', getAnnouncements);
router.post('/', protect, addAnnouncement);
router.put('/:id', protect, updateAnnouncement);
router.delete('/:id', protect, deleteAnnouncement);

module.exports = router;
