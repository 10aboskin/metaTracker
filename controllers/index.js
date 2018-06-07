const express = require('express'),
      router = express.Router(),
      getData = require('../middleware/getData'),
      renderLists = require('../middleware/renderLists')

router.get('/', getData, renderLists)

module.exports = router
