function populate(spawn) {
  const { room } = spawn
  const creeps = Object.keys(Game.creeps).map(key => Game.creeps[key])
  const counts = creeps.filter(creep => creep.room === room).reduce((out, creep) => {
    const role = creep.memory.role
    const count = (out[role] || 0) + 1

    return Object.assign({}, out, { [role]: count })
  }, {})

  if (!counts.upgrader || counts.upgrader < 3) {
    spawn.createCreep([WORK, CARRY, MOVE, MOVE], undefined, { role: 'upgrader', target: room.controller.id })
  }

  if (!counts.builder || counts.builder < 1) {
    spawn.createCreep([WORK, CARRY, MOVE, MOVE], undefined, { role: 'builder', target: room.controller.id })
  }
}

module.exports = { populate }
