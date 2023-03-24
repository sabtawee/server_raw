const express = require('express');

const router = express.Router();

const { createLogUser } = require('../controllers/LogUserController');

router.post('/', createLogUser);

module.exports = router;