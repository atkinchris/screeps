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
  console.log(JSON.stringify(roleCounts))

  const spawn = spawns[0]

  if (!spawn) {
    console.log('No spawns found!')
    return
  }

  Object.keys(roles).forEach((role) => {
    const count = roleCounts[role] || 0
    const expectation = roles[role].expectation
    if (count < expectation) {
      spawn.createCreep([WORK, WORK, CARRY, MOVE], undefined, { role })
    }
  })

  creeps.forEach(creep => roles[creep.memory.role].run(creep))
}

module.exports.loop = loop
