const roles = {
  harvester: require('./roles/harvester'),
  upgrader: require('./roles/upgrader'),
}

function pruneMemory() {
  Memory.creeps = Object.keys(Memory.creeps).reduce((creeps, name) => {
    if (!Game.creeps[name]) {
      console.log('Clearing non-existing creep memory:', name)
      return creeps
    }

    return Object.assign({}, creeps, { [name]: Memory.creeps[name] })
  }, {})
}

function loop() {
  pruneMemory()
  const creeps = Object.keys(Game.creeps).map(name => Game.creeps[name])

  const harvesters = creeps.filter(creep => creep.memory.role === 'harvester')
  const upgraders = creeps.filter(creep => creep.memory.role === 'upgrader')
  console.log(`Harvesters: ${harvesters.length}`)

  if (harvesters.length < 2) {
    const harvester = Game.spawns.alpha.createCreep([WORK, CARRY, MOVE], undefined, { role: 'harvester' })
    console.log(`Spawning new harvester: ${harvester}`)
  }

  if (upgraders.length < 1) {
    const upgrader = Game.spawns.alpha.createCreep([WORK, CARRY, MOVE], undefined, { role: 'upgrader' })
    console.log(`Spawning new upgrader: ${upgrader}`)
  }

  creeps.forEach(creep => roles[creep.memory.role].run(creep))
}

module.exports.loop = loop
