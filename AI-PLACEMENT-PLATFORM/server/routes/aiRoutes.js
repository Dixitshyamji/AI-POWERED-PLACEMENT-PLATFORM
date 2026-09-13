const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { explainCode, dryRun, studyPlan, mockInterview } = require('../controllers/aiController');

router.post('/explain-code', protect, explainCode);
router.post('/dry-run', protect, dryRun);
router.post('/study-plan', protect, studyPlan);
router.post('/mock-interview', protect, mockInterview);

module.exports = router;
