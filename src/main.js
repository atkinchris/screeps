const roles = {
  harvester: require('./roles/harvester'),
}

function pruneMemory() {
  Memory.creeps = Memory.creeps.filter((name) => {
    if (!Game.creeps[name]) {
      console.log('Clearing non-existing creep memory:', name)
      return false
    }

    return true
  })
}

function loop() {
  pruneMemory()

  const harvesters = Game.creeps.filter(creep => creep.memory.role === 'harvester')
  console.log(`Harvesters: ${harvesters.length}`)

  if (harvesters.length < 2) {
    const newName = Game.spawns.alpha.createCreep([WORK, CARRY, MOVE], undefined, { role: 'harvester' })
    console.log(`Spawning new harvester: ${newName}`)
  }

  Game.creeps.forEach((creep) => {
    const role = creep.memory.role
    roles[role].run(creep)
  })
}

module.exports = loop
