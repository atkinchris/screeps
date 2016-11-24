const { prune } = require('./utils/memory')

const roles = {
  harvester: require('./roles/harvester'),
  builder: require('./roles/builder'),
  upgrader: require('./roles/upgrader'),
}

function loop() {
  prune()

  const creeps = Object.keys(Game.creeps).map(key => Game.creeps[key])
  const spawns = Object.keys(Game.spawns).map(key => Game.spawns[key])

  const spawn = spawns[0]

  if (!spawn) {
    console.log('No spawns found!')
    return
  }

  if (creeps.filter(creep => creep.memory.role === 'harvester').length < 1) {
    spawn.createCreep([WORK, WORK, CARRY, MOVE], undefined, { role: 'harvester' })
  }

  if (creeps.filter(creep => creep.memory.role === 'upgrader').length < 3) {
    spawn.createCreep([WORK, WORK, CARRY, MOVE], undefined, { role: 'upgrader' })
  }

  if (creeps.filter(creep => creep.memory.role === 'builder').length < 1) {
    spawn.createCreep([WORK, WORK, CARRY, MOVE], undefined, { role: 'builder' })
  }

  creeps.forEach(creep => roles[creep.memory.role].run(creep))
}

module.exports.loop = loop
