function populate(spawn) {
  const minimums = {
    harvester: 1,
    builder: 1,
    repairer: 1,
    wallRepairer: 1,
  }

  const counts = Object.assign({
    harvester: 0,
    builder: 0,
    repairer: 0,
    wallRepairer: 0,
  }, _.countBy(Game.creeps, c => c.memory.role))

  const energy = spawn.room.energyCapacityAvailable / 2
  let name

  if ((counts.harvester || 0) < minimums.harvester) {
    name = spawn.createCustomCreep(energy, 'harvester')

    if (name === ERR_NOT_ENOUGH_ENERGY && counts.harvester === 0) {
      name = spawn.createCustomCreep(spawn.room.energyAvailable, 'harvester')
    }
  } else if ((counts.upgrader || 0) < minimums.upgrader) {
    name = spawn.createCustomCreep(energy, 'upgrader')
  } else if ((counts.repairer || 0) < minimums.repairer) {
    name = spawn.createCustomCreep(energy, 'repairer')
  } else if ((counts.builder || 0) < minimums.builder) {
    name = spawn.createCustomCreep(energy, 'builder')
  } else if ((counts.wallRepairer || 0) < minimums.wallRepairer) {
    name = spawn.createCustomCreep(energy, 'wallRepairer')
  } else {
    name = spawn.createCustomCreep(energy, 'builder')
  }

  if (!(name < 0)) {
    console.log(`Spawned new creep: ${name}`)
  }
}

module.exports = { populate }
