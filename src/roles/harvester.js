const { moveCached } = require('../utils/movement')

function run(creep) {
  if (creep.carry.energy < creep.carryCapacity) {
    const source = creep.pos.findClosestByRange(FIND_SOURCES)
    if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
      moveCached(creep, source)
    }
    return
  }

  const storage = creep.pos.findClosestByRange(FIND_STRUCTURES, {
    filter: structure => (
      structure.structureType === STRUCTURE_EXTENSION ||
      structure.structureType === STRUCTURE_SPAWN
    ) && structure.energy < structure.energyCapacity,
  })

  if (storage) {
    if (creep.transfer(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      moveCached(creep, storage)
    }
  } else {
    // eslint-disable-next-line no-param-reassign
    creep.memory.role = 'builder'
  }
}

module.exports = { run }
