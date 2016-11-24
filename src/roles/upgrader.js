const { moveCached } = require('../utils/movement')

function run(creep) {
  if (creep.carry.energy === 0) {
    const source = creep.pos.findClosestByRange(FIND_SOURCES)
    if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
      moveCached(creep, source)
    }
  } else if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
    moveCached(creep, creep.room.controller)
  }
}

module.exports = { run }
