const { mapRooms, setupRoom } = require('./utils/rooms')
const { run, pruneCreeps } = require('./utils/creeps')
const { populate } = require('./utils/population')

function loop() {
  const rooms = Object.keys(Game.rooms).map(key => Game.rooms[key])
  const creeps = Object.keys(Game.creeps).map(key => Game.creeps[key])
  const spawns = Object.keys(Game.spawns).map(key => Game.spawns[key])

  Memory.rooms = mapRooms(rooms, Memory.rooms)
  rooms.forEach(setupRoom)

  spawns.forEach(populate)

  Memory.creeps = pruneCreeps(Game.creeps, Memory.creeps, console.log)
  creeps.forEach(run)
}

module.exports.loop = loop
