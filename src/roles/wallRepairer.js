const roleBuilder = require('./builder')

module.exports = {
  run(creep) {
    if (creep.memory.working === true && creep.carry.energy === 0) {
      creep.memory.working = false
    } else if (creep.memory.working === false && creep.carry.energy === creep.carryCapacity) {
      creep.memory.working = true
    }

    if (creep.memory.working === true) {
      const walls = creep.room.find(FIND_STRUCTURES, {
        filter: s => s.structureType === STRUCTURE_WALL,
      })

      let target

      for (let percentage = 0.0001; percentage <= 1; percentage = percentage + 0.0001) {
        for (const wall of walls) {
          if (wall.hits / wall.hitsMax < percentage) {
            target = wall
            break
          }
        }

        if (target !== undefined) {
          break
        }
      }

      if (target !== undefined) {
        if (creep.repair(target) === ERR_NOT_IN_RANGE) {
          creep.moveTo(target)
        }
      } else {
        roleBuilder.run(creep)
      }
    } else {
      const source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE, {
        filter: s => s.energy > 0,
      })

      if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
        creep.moveTo(source)
      }
    }
  },
}
