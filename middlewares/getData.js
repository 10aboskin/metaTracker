const request = require('request-promise')
const cheerio = require('cheerio')
const cheerioTableparser = require('cheerio-tableparser')

const requestOptions = {
  method: 'POST',
  uri: `https://www.hotslogs.com/Sitewide/HeroAndMapStatistics`,
  transform: (body) => cheerio.load(body)
}

const _trimTableData = (tableData) => {
  const trimmedTable = tableData.map(col => col.slice(3))
  trimmedTable.pop()
  trimmedTable.shift()
  return trimmedTable
}

const _createHeroObjects = (stats) => {
  const [heroes, gamesPlayed, gamesBanned, popularities, winrates, deltas, roles, subRoles] = stats
  let heroObjects = []
  for (let i = 0; i < heroes.length; i++) {
    heroObjects[i] = {
      name: heroes[i],
      gamesPlayed: parseInt(gamesPlayed[i]),
      gamesBanned: parseInt(gamesBanned[i]),
      popularity: parseFloat(popularities[i]),
      winrate: parseFloat(winrates[i]),
      delta: parseFloat(deltas[i]),
      role: roles[i],
      subRole: subRoles[i]
    }
  }
  return heroObjects
}

const getData = (req, res, next) => {
  request(requestOptions)
    .then($ => {
      // get data from table
      cheerioTableparser($)
      const tableData = $('table').parsetable(true, true, true)
      const stats = _trimTableData(tableData)
      // attach hero objects to request
      req.heroObjects = _createHeroObjects(stats)
      next()
    })
    .catch((err) => {
      console.log(err)
      next()
    });
}

module.exports = getData
