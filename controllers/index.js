const express = require('express'),
      router = express.Router(),
      getData = require('../middlewares/getData'),
      calculateScores = require('../middlewares/calculateScores')
      renderLists = require('../middlewares/renderLists')

router.get('/', getData, calculateScores, renderLists)

module.exports = router
