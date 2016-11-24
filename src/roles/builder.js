/* eslint-disable no-param-reassign */
const { moveCached } = require('../utils/movement')

function run(creep) {
  if (creep.carry.energy === 0) {
    creep.memory.role = 'harvester'
    return
  }

  const constructionSite = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES)

  if (constructionSite) {
    if (creep.build(constructionSite) === ERR_NOT_IN_RANGE) {
      moveCached(creep, constructionSite)
    }
  } else {
    const repairSite = creep.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: structure =>
        (structure.hits < 5000) &&
        (structure.hits > 0) &&
        (structure.hits < structure.hitsMax),
    })
    if (repairSite) {
      if (creep.repair(repairSite) === ERR_NOT_IN_RANGE) {
        creep.say(`Repair ${repairSite.structureType}`)
        moveCached(creep, repairSite)
      }
    } else {
      creep.memory.role = 'harvester'
    }
  }
}

module.exports = { run }
