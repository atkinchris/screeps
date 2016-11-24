function run(creep) {
  if (creep.carry.energy < creep.carryCapacity) {
    const source = creep.pos.findClosestByRange(FIND_SOURCES)
    if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
      creep.moveTo(source)
    }
    return
  }

  const storage = creep.pos.findClosestByRange(FIND_STRUCTURES, {
    filter: structure => (
      structure.structureType === STRUCTURE_EXTENSION ||
      structure.structureType === STRUCTURE_SPAWN
    ) && structure.energy < structure.energyCapacity,
  })

  if (creep.transfer(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    creep.moveTo(storage)
  }
}

module.exports = { run }
