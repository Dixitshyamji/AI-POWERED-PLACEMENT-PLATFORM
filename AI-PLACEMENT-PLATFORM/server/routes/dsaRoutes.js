const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getTopics, getProblems, getProblemById, submitSolution } = require('../controllers/dsaController');

router.get('/topics', protect, getTopics);
router.get('/problems', protect, getProblems);
router.get('/problems/:id', protect, getProblemById);
router.post('/problems/:id/submit', protect, submitSolution);

module.exports = router;
