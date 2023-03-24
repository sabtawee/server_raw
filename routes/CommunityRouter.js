const express = require('express');

const { getCommunity, getCommunityById, createCommunity, updateCommunity, deleteCommunity } = require('../controllers/CommunityController');

const router = express.Router();

router.get('/', getCommunity);
router.get('/:id', getCommunityById);
router.post('/', createCommunity);
router.put('/:id', updateCommunity);
router.delete('/:id', deleteCommunity);

module.exports = router;

