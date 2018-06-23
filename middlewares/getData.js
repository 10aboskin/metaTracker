const rp = require('request-promise')
const cheerio = require('cheerio')
const cheerioTableparser = require('cheerio-tableparser')

const heroRoles = require('../helpers/heroRoles')

const requestOptions = {
  uri: `https://www.hotslogs.com/Default`,
  transform: (body) => cheerio.load(body)
}

const _getVectorMagnitude = (x, y) => {
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)).toFixed(2)
}

const _calculateMetaScores = (popularites, winrates) => {
  const normalizedPopularites = _normalize(popularites)
  const normalizedWinrates = _normalize(winrates)
  let metaScores = []
  for (let i = 0; i < popularites.length; i++) {
    metaScores[i] = _getVectorMagnitude(normalizedPopularites[i], normalizedWinrates[i])
  }
  return _normalize(metaScores)
}

const _normalize = (dataSet) => {
  const max = Math.max(...dataSet)
  const min = Math.min(...dataSet)
  return dataSet.map(value => {
    const newValue = ((value - min) / (max - min)) * 100
    return Math.floor(newValue)
  })
}

const _createHeroObjects = (heroes, popularities, winrates) => {
  const parsedPopularites = popularities.map(value => parseFloat(value))
  const parsedWinrates = winrates.map(value => parseFloat(value))
  const metaScores = _calculateMetaScores(parsedPopularites, parsedWinrates)

  let heroObjects = []
  for (let i = 0; i < heroes.length; i++) {
    const name = heroes[i]
    const role = heroRoles[name.toUpperCase()]
    const popularity = parsedPopularites[i]
    const winrate = parsedWinrates[i]
    const metaScore = metaScores[i]
    heroObjects[i] = { name, popularity, winrate, metaScore, role }
  }
  return heroObjects
}

const getData = (req, res, next) => {
  rp(requestOptions)
    .then($ => {
      // get data from table
      cheerioTableparser($)
      const [, heroes,,, popularities, winrates,] = $('table')
        .parsetable(true, true, true)
        .map(col => col.slice(2))
      // attach hero objects to request
      req.heroObjects = _createHeroObjects(heroes, popularities, winrates)
      next()
    })
    .catch((err) => {
      console.log(err)
      next()
    });
}

module.exports = getData
