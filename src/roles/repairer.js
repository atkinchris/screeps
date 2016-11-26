const roleBuilder = require('./builder')

module.exports = {
    // a function to run the logic for this role
  run(creep) {
    if (creep.memory.working === true && creep.carry.energy === 0) {
      creep.memory.working = false
    } else if (creep.memory.working === false && creep.carry.energy === creep.carryCapacity) {
      creep.memory.working = true
    }

    if (creep.memory.working === true) {
      const structure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: s => (s.hits < 5000) && (s.hits < s.hitsMax),
      })

      if (structure) {
        if (creep.repair(structure) === ERR_NOT_IN_RANGE) {
          creep.moveTo(structure)
        }
      } else {
        roleBuilder.run(creep)
      }
    } else {
      const source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE)
      if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
        creep.moveTo(source)
      }
    }
  },
}
