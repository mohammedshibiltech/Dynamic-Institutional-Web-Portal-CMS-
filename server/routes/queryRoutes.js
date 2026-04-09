const express = require('express');
const router = express.Router();
const queryController = require('../controllers/queryController');
const { protect } = require('../controllers/authController');


// Public route to submit a query
router.post('/', queryController.submitQuery);

// Protected admin routes
router.get('/', protect, queryController.getQueries);
router.post('/:id/reply', protect, queryController.replyQuery);
router.delete('/:id', protect, queryController.deleteQuery);

module.exports = router;
