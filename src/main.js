require('./prototypes')()

const { run, pruneCreeps } = require('./utils/creeps')
const { populate } = require('./utils/population')
const defendRoom = require('./roles/tower')

function loop() {
  const rooms = Object.keys(Game.rooms).map(key => Game.rooms[key])
  const creeps = Object.keys(Game.creeps).map(key => Game.creeps[key])
  const spawns = Object.keys(Game.spawns).map(key => Game.spawns[key])

  rooms.forEach(defendRoom)

  Memory.creeps = pruneCreeps(Game.creeps, Memory.creeps, console.log)

  spawns.forEach(populate)
  creeps.forEach(run)
}

module.exports.loop = loop
