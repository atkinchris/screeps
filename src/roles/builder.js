function run(creep) {
  if (creep.memory.building && creep.carry.energy === 0) {
    creep.memory.building = false
    creep.say('harvesting')
  } else if (!creep.memory.building && creep.carry.energy === creep.carryCapacity) {
    creep.memory.building = true
    creep.say('building')
  }

  if (creep.memory.building) {
    const target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES)
    if (target.length) {
      if (creep.build(target) === ERR_NOT_IN_RANGE) {
        creep.moveTo(target)
      }
    }
  } else {
    const source = creep.pos.findClosestByRange(FIND_SOURCES)
    if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
      creep.moveTo(source)
    }
  }
}

module.exports = { run }
