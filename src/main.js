const { prune } = require('./utils/memory')
const countRoles = require('./utils/countRoles')

const roles = {
  harvester: require('./roles/harvester'),
  upgrader: require('./roles/upgrader'),
}

function loop() {
  prune()
  const creeps = Object.keys(Game.creeps).map(name => Game.creeps[name])
  const stats = countRoles(creeps)
  console.log(JSON.stringify(stats))

  if (stats.harvester < 1) {
    const harvester = Game.spawns.alpha.createCreep([WORK, CARRY, MOVE, MOVE], undefined, { role: 'harvester' })
    console.log(`Spawning new harvester: ${harvester}`)
  }

  if (stats.upgrader < 2) {
    const upgrader = Game.spawns.alpha.createCreep([WORK, CARRY, MOVE, MOVE], undefined, { role: 'upgrader' })
    console.log(`Spawning new upgrader: ${upgrader}`)
  }

  creeps.forEach(creep => roles[creep.memory.role].run(creep))
}

module.exports.loop = loop
