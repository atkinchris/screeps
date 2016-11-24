const { prune } = require('./utils/memory')
const countRoles = require('./utils/countRoles')

const roles = {
  harvester: require('./roles/harvester'),
  upgrader: require('./roles/upgrader'),
  builder: require('./roles/builder'),
}
const expectations = { harvester: 1, upgrader: 3 }

function loop() {
  prune()
  const creeps = Object.keys(Game.creeps).map(name => Game.creeps[name])
  const stats = countRoles(creeps)

  Object.keys(Game.spawns).forEach((key) => {
    const spawn = Game.spawns[key]
    const sources = spawn.room.lookForAtArea(LOOK_SOURCES, 0, 0, 49, 49, true)
    spawn.room.memory.sources = sources.map(({ x, y }) => ({ x, y }))
  })

  Memory.stats = stats

  Object.keys(stats).forEach((role) => {
    const expected = expectations[role] || 0
    if (stats[role] < expected) {
      const creep = Game.spawns.alpha.createCreep([WORK, CARRY, MOVE, MOVE], undefined, { role })
      if (creep > 0) {
        console.log(`Spawning new ${role}: ${creep}`)
      }
    }
  })

  creeps.forEach(creep => roles[creep.memory.role].run(creep))
}

module.exports.loop = loop
