const roleUpgrader = require('./upgrader')

module.exports = {
    // a function to run the logic for this role
  run(creep) {
    if (creep.memory.working === true && creep.carry.energy === 0) {
      creep.memory.working = false
    } else if (creep.memory.working === false && creep.carry.energy === creep.carryCapacity) {
      creep.memory.working = true
    }

    if (creep.memory.working === true) {
      const constructionSite = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES)

      if (constructionSite) {
        if (creep.build(constructionSite) === ERR_NOT_IN_RANGE) {
          creep.moveTo(constructionSite)
        }
      } else {
        roleUpgrader.run(creep)
      }
    } else {
      const source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE)
      if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
        creep.moveTo(source)
      }
    }
  },
}
