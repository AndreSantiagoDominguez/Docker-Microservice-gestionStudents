

const express = require('express');
const router = express.Router();
const SystemController = require('../controllers/systemController');

router.get('/info', SystemController.info);

module.exports = router;