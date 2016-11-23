const { prune } = require('./utils/memory')
const countRoles = require('./utils/countRoles')

const roles = {
  harvester: require('./roles/harvester'),
  upgrader: require('./roles/upgrader'),
  builder: require('./roles/builder'),
}
const expectations = { harvester: 1, upgrader: 2 }

function loop() {
  prune()
  const creeps = Object.keys(Game.creeps).map(name => Game.creeps[name])
  const stats = countRoles(creeps)

  Memory.stats = stats

  Object.keys(stats).forEach((role) => {
    const expected = expectations[role] || 0
    if (stats[role] < expected) {
      const creep = Game.spawns.alpha.createCreep([WORK, CARRY, MOVE, MOVE], undefined, { role })
      console.log(`Spawning new ${role}: ${creep}`)
    }
  })

  creeps.forEach(creep => roles[creep.memory.role].run(creep))
}

module.exports.loop = loop
