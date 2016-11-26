const mapRooms = require('./utils/mapRooms')
const pruneCreeps = require('./utils/pruneCreeps')
const roles = require('./roles')

function loop() {
  const rooms = Object.keys(Game.rooms).map(key => Game.rooms[key])
  const creeps = Object.keys(Game.creeps).map(key => Game.creeps[key])

  Memory.rooms = mapRooms(rooms, Memory.rooms)
  Memory.creeps = pruneCreeps(Game.creeps, Memory.creeps, console.log)

  creeps.forEach((creep) => {
    const { memory } = creep
    if (memory === undefined || !memory.target || !memory.role) {
      creep.suicide()
      console.log(`Killing ${creep.name}, as it has no purpose.`)
    }

    const role = roles[memory.role]
    role.run(creep)
  })

  rooms.forEach((room) => {
    const memory = Memory.rooms[room.name]

    if (!memory.sources) {
      return
    }

    memory.sources = memory.sources.map((source) => {
      let { container, containerSite } = source
      const { spots } = source

      if ((!container && !containerSite)) {
        const { x, y } = spots[0]
        const site = room.createConstructionSite(x, y, STRUCTURE_CONTAINER)

        if (site === OK) {
          containerSite = { x, y, inProgress: true }
          console.log(`Creating construction site for container at ${x},${y}`)
        } else {
          console.log(`Could not place container at ${x},${y}`)
        }
      } else if (containerSite && containerSite.inProgress) {
        const sites = room.lookForAt(LOOK_CONSTRUCTION_SITES, containerSite.x, containerSite.y)
        if (sites.length > 0 && sites[0].id) {
          containerSite = sites[0].id
        } else {
          containerSite = undefined
          const structure = room.lookForAt(LOOK_STRUCTURES, containerSite.x, containerSite.y)[0]

          if (structure && structure.structureType === STRUCTURE_CONTAINER) {
            container = structure.id
          } else {
            console.log('No valid construction or container found for source')
          }
        }
      } else if (containerSite && !Game.getObjectById(containerSite)) {
        containerSite = undefined
      }

      return Object.assign({}, source, { container, containerSite })
    })
  })
}

module.exports.loop = loop
