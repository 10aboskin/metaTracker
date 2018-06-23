const renderLists = (req, res) => {
  const heroObjects = req.heroObjects
  const heroRoles = [ '', 'Assassin', 'Warrior', 'Support', 'Specialist']
  const lists = heroRoles.map(role => {
    return {
      heroes: _getTopEightLists(heroObjects, role),
      role,
    }
  })
  const theTopEight = lists[0].heroes.map(hero => hero.name).slice(0,8)
  console.log(theTopEight);
  res.render('index', { lists })
}

const _getTopEight = (heroObjects) => {
  return heroObjects.sort((a, b) => {
    return b.metaScore - a.metaScore
  }).slice(0, 8)
}

const _getTopEightLists = (heroObjects, role) => {
  return role
    ? _getTopEight(heroObjects.filter(hero => hero.role === role))
    : _getTopEight(heroObjects)
}

module.exports = renderLists
