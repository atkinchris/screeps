function populate(spawn) {
  const minimums = {
    harvester: 1,
    builder: 1,
    repairer: 1,
    wallRepairer: 1,
  }

  const counts = _.countBy(Game.creeps, c => c.memory.role)
  const energy = spawn.room.energyCapacityAvailable
  let name

  if (counts.harvester < minimums.harvester) {
    name = spawn.createCustomCreep(energy, 'harvester')

    if (name === ERR_NOT_ENOUGH_ENERGY && counts.harvester === 0) {
      name = spawn.createCustomCreep(spawn.room.energyAvailable, 'harvester')
    }
  } else if (counts.upgrader < minimums.upgrader) {
    name = spawn.createCustomCreep(energy, 'upgrader')
  } else if (counts.repairer < minimums.repairer) {
    name = spawn.createCustomCreep(energy, 'repairer')
  } else if (counts.builder < minimums.builder) {
    name = spawn.createCustomCreep(energy, 'builder')
  } else if (counts.wallRepairer < minimums.wallRepairer) {
    name = spawn.createCustomCreep(energy, 'wallRepairer')
  } else {
    name = spawn.createCustomCreep(energy, 'builder')
  }

  if (!(name < 0)) {
    console.log(`Spawned new creep: ${name}`)
  }
}

module.exports = { populate }
