const mapRooms = require('./utils/mapRooms')
const pruneCreeps = require('./utils/pruneCreeps')

function loop() {
  const rooms = Object.keys(Game.rooms).map(key => Game.rooms[key])
  const spawns = Object.keys(Game.spawns).map(key => Game.spawns[key])
  const spawn = spawns[0]

  Memory.rooms = mapRooms(rooms, Memory.rooms)
  Memory.creeps = pruneCreeps(Game.creeps, Memory.creeps, console.log)

  rooms.forEach((room) => {
    const { memory } = room

    memory.sources = memory.sources.map((source) => {
      const miners = source.miners.filter(miner => Game.creeps[miner])

      if (miners.length < source.spots) {
        const creep = spawn.createCreep([MOVE, WORK], undefined, { role: 'miner', target: source.id })
        if (creep) {
          miners.push(creep)
        }
      }

      return Object.assign(source, { miners })
    })
  })
}

module.exports.loop = loop
