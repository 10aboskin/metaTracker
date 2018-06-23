const _getVectorMagnitude = (x, y) => {
  return Math.floor(Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)))
}

const _normalize = (max, min, value) => {
  return ((value - min) / (max - min)) * 100
}

const calculateScores = (req, res, next) => {
  const popularities = req.heroObjects.map(hero => hero.popularity)
  const winrates = req.heroObjects.map(hero => hero.winrate)
  const maxPopularity = Math.max(...popularities)
  const minPopularity = Math.min(...popularities)
  const maxWinrate = Math.max(...winrates)
  const minWinrate = Math.min(...winrates)
  req.heroObjects.map(hero => {
    const normalizedPopularity = _normalize(maxPopularity, minPopularity, hero.popularity)
    const normalizedWinrate = _normalize(maxWinrate, minWinrate, hero.winrate)
    return hero.metaScore = _getVectorMagnitude(normalizedPopularity, normalizedWinrate)
  })
  next()
}

module.exports = calculateScores
