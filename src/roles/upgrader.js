/* eslint-disable no-param-reassign */
function run(creep) {
  const { refueling = false } = creep.memory

  if (!refueling && creep.carry.energy === 0) {
    creep.memory.refueling = true
    creep.memory.target = creep.pos.findClosestByRange(FIND_SOURCES).id
  } else if (refueling && creep.carry.energy === creep.carryCapacity) {
    creep.memory.refueling = false
    creep.memory.target = creep.room.controller.id
  }

  const target = Game.getObjectById(creep.memory.target)

  if (!target) {
    console.log('I am lost,', creep.name, creep.memory.role)
    return creep
  }

  if (!creep.memory.refueling && creep.pos.inRangeTo(target, 3)) {
    creep.upgradeController(target)
  } else if (creep.pos.inRangeTo(target, 1)) {
    creep.harvest(target)
  } else {
    creep.moveTo(target)
  }

  return creep
}

module.exports = { run }
