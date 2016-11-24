/* eslint-disable no-param-reassign */

function moveCached(creep, target) {
  if (!creep.memory.path || !creep.memory.destination || creep.memory.destination !== target.id) {
    creep.memory.path = creep.pos.findPathTo(target)
    creep.memory.destination = target.id
  }
  creep.moveByPath(creep.memory.path)
}

module.exports = {
  moveCached,
}
