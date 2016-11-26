function populate(spawn) {
  // setup some minimum numbers for different roles
  const minimumNumberOfHarvesters = 1
  const minimumNumberOfUpgraders = 1
  const minimumNumberOfBuilders = 1
  const minimumNumberOfRepairers = 1
  const minimumNumberOfWallRepairers = 1

  const numberOfHarvesters = _.sum(Game.creeps, c => c.memory.role === 'harvester')
  const numberOfUpgraders = _.sum(Game.creeps, c => c.memory.role === 'upgrader')
  const numberOfBuilders = _.sum(Game.creeps, c => c.memory.role === 'builder')
  const numberOfRepairers = _.sum(Game.creeps, c => c.memory.role === 'repairer')
  const numberOfWallRepairers = _.sum(Game.creeps, c => c.memory.role === 'wallRepairer')

  const energy = spawn.room.energyCapacityAvailable
  let name

  if (numberOfHarvesters < minimumNumberOfHarvesters) {
    name = spawn.createCustomCreep(energy, 'harvester')

    if (name === ERR_NOT_ENOUGH_ENERGY && numberOfHarvesters === 0) {
      name = spawn.createCustomCreep(spawn.room.energyAvailable, 'harvester')
    }
  } else if (numberOfUpgraders < minimumNumberOfUpgraders) {
    name = spawn.createCustomCreep(energy, 'upgrader')
  } else if (numberOfRepairers < minimumNumberOfRepairers) {
    name = spawn.createCustomCreep(energy, 'repairer')
  } else if (numberOfBuilders < minimumNumberOfBuilders) {
    name = spawn.createCustomCreep(energy, 'builder')
  } else if (numberOfWallRepairers < minimumNumberOfWallRepairers) {
    name = spawn.createCustomCreep(energy, 'wallRepairer')
  } else {
    name = spawn.createCustomCreep(energy, 'builder')
  }

  if (!(name < 0)) {
    console.log(`Spawned new creep: ${name}`)
  }
}

module.exports = { populate }
