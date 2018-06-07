const express = require('express'),
      router = express.Router(),
      getData = require('../middlewares/getData'),
      renderLists = require('../middlewares/renderLists')

router.get('/', getData, renderLists)

module.exports = router
