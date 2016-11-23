  function run(creep) {
    if (creep.carry.energy === 0) {
      // eslint-disable-next-line no-param-reassign
      creep.memory.role = 'harvester'
      return
    }

    const targets = creep.room.find(FIND_CONSTRUCTION_SITES)


    if (targets.length > 0) {
      if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0])
      }
    } else {
      const repairs = creep.room.find(FIND_STRUCTURES, {
        filter: structure => (structure.hits < 5000) && (structure.hits > 0),
      })
      if (repairs.length > 0) {
        if (creep.repair(repairs[0]) === ERR_NOT_IN_RANGE) {
          creep.moveTo(repairs[0])
        }
      }
    }
  }

  module.exports = { run }
