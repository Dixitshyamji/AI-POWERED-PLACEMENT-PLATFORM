const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getCompanyPlaylists } = require('../controllers/companyController');

router.get('/', protect, getCompanyPlaylists);

module.exports = router;
