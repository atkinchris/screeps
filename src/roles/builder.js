  function run(creep) {
    if (creep.carry.energy === 0) {
      // eslint-disable-next-line no-param-reassign
      creep.memory.role = 'harvester'
      return
    }

    const constructionSite = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES)


    if (constructionSite) {
      if (creep.build(constructionSite) === ERR_NOT_IN_RANGE) {
        creep.moveTo(constructionSite)
      }
    } else {
      const repairSite = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: structure => (structure.hits < 5000) && (structure.hits > 0),
      })
      if (repairSite) {
        if (creep.repair(repairSite) === ERR_NOT_IN_RANGE) {
          creep.moveTo(repairSite)
        }
      } else {
        // eslint-disable-next-line no-param-reassign
        creep.memory.role = 'harvester'
      }
    }
  }

  module.exports = { run }
