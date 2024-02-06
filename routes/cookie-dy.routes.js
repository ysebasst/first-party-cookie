const express = require('express');
const router = express.Router();
const cookieDYController = require('../controllers/cookie-dy.controller');

router
  .get('/', cookieDYController.firstPartyCookie)
  .post('/', cookieDYController.firstPartyCookie);

module.exports = router;