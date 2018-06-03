const rp = require('request-promise')
const cheerio = require('cheerio')
const cheerioTableparser = require('cheerio-tableparser')

const heroRoles = require('./heroRoles')

const requestOptions = {
  uri: `https://www.hotslogs.com/Default`,
  transform: (body) => cheerio.load(body)
}

const _calculateMetaScore = (popularity, winrate) => {
  return Math.floor(Math.sqrt(Math.pow(popularity, 2) + Math.pow(winrate, 2)))
}

const _createHeroObjects = (heroes, popularities, winrates) => {
  let heroObjects = []
  for (let i = 0; i < heroes.length; i++) {
    const name = heroes[i]
    const role = heroRoles[name.toUpperCase()]
    const popularity = parseFloat(popularities[i])
    const winrate = parseFloat(winrates[i])
    const metaScore = _calculateMetaScore(popularity, winrate)
    heroObjects[i] = { name, metaScore, role }
  }
  return heroObjects
}

const getData = (req, res, next) => {
  rp(requestOptions)
    .then($ => {
      cheerioTableparser($)
      const [, heroes,,, popularities, winrates,] = $('table')
        .parsetable(true, true, true)
        .map(col => col.slice(2))
      req.heroObjects = _createHeroObjects(heroes, popularities, winrates)
      next()
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = getData
