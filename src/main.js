const pruneMemory = require('./utils/memory').prune

const roles = {
  harvester: require('./roles/harvester'),
  upgrader: require('./roles/upgrader'),
}

function loop() {
  pruneMemory()
  const creeps = Object.keys(Game.creeps).map(name => Game.creeps[name])

  const stats = creeps.reduce((out, creep) => {
    const role = creep.memory.role
    const count = out[role] ? out[role] + 1 : 1

    return Object.assign({}, out, { [role]: count })
  })

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
