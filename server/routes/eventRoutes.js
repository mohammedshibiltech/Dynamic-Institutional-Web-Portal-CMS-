const express = require('express');
const router = express.Router();
const { getEvents, addEvent, updateEvent, deleteEvent } = require('../controllers/eventController');
const { protect } = require('../controllers/authController');
const upload = require('../middleware/upload');

router.get('/', getEvents);
router.post('/', protect, upload.single('image'), addEvent);
router.put('/:id', protect, upload.single('image'), updateEvent);
router.delete('/:id', protect, deleteEvent);

module.exports = router;
