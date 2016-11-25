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
  const roleCounts = creeps.reduce((counts, creep) => {
    const role = creep.memory.role
    const existing = counts[role]
    const count = existing ? existing + 1 : 1

    return Object.assign({}, counts, { [role]: count })
  }, {})

  Memory.roleCounts = roleCounts

  const spawn = spawns[0]

  if (!spawn) {
    console.log('No spawns found!')
    return
  }

  if (roleCounts.harvester < 1) {
    spawn.createCreep([WORK, WORK, CARRY, MOVE], undefined, { role: 'harvester' })
  }
  if (roleCounts.upgrader < 3) {
    spawn.createCreep([WORK, WORK, CARRY, MOVE], undefined, { role: 'upgrader' })
  }
  if (roleCounts.builder < 1) {
    spawn.createCreep([WORK, WORK, CARRY, MOVE], undefined, { role: 'builder' })
  }

  creeps.forEach(creep => roles[creep.memory.role].run(creep))
}

module.exports.loop = loop
