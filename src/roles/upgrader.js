function run(creep) {
  if (creep.carry.energy < creep.carryCapacity) {
    const source = creep.pos.findClosestByRange(FIND_SOURCES)
    if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
      creep.moveTo(source)
    }
  } else if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
    creep.moveTo(creep.room.controller)
  }
}

module.exports = { run }
