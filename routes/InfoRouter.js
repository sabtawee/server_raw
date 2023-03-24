const express = require('express');
const router = express.Router();

const { getInfo, createInfo, updateInfo, deleteInfo } = require('../controllers/InfoController');

router.get('/', getInfo);
router.post('/', createInfo);
router.put('/:id', updateInfo);
router.delete('/:id', deleteInfo);

module.exports = router;
