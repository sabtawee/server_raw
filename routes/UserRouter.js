const express = require('express');

const { Login, Authen } = require('../controllers/UserController');

const router = express.Router();

router.post('/login', Login);
router.get('/authen', Authen);

module.exports = router;