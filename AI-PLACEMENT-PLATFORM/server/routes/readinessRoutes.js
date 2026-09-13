const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getReadinessQuestions, submitReadinessTest } = require('../controllers/readinessController');

router.get('/questions', protect, getReadinessQuestions);
router.post('/submit', protect, submitReadinessTest);

module.exports = router;
