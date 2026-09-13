const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getQuestions, submitTest } = require('../controllers/aptitudeController');

router.get('/questions', protect, getQuestions);
router.post('/submit', protect, submitTest);

module.exports = router;
