const express = require('express');
const { getNews, getNewsImage, getNewsById, createNews, updateNews, deleteNews } = require('../controllers/NewsController');

const router = express.Router();

router.get('/', getNews);
router.get('/image/:imageName', getNewsImage);
router.get('/:id', getNewsById);
router.post('/', createNews);
router.put('/:id', updateNews);
router.delete('/:id', deleteNews);

module.exports = router;