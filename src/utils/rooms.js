function mapRooms(rooms, existing = {}) {
  return rooms.map((room) => {
    const { name } = room

    if (existing[name] && existing[name].sources) {
      return existing[name]
    }

    const sources = room.find(FIND_SOURCES).map((source) => {
      const { pos, id } = source
      const { x, y } = pos
      const adjacent = room.lookForAtArea(LOOK_TERRAIN, y - 1, x - 1, y + 1, x + 1, true)
      const spots = adjacent.filter(({ terrain }) => terrain === 'plain' || terrain === 'swamp')

      if (spots.length === 0) {
        return console.log(`No viable points of ingress around source at ${x}, ${y}`)
      }

      return { pos, spots, id }
    }).filter(source => source)

    if (sources.length === 0) {
      return console.log(`No sources found in room ${name}.`)
    }

    return { name, sources }
  }).reduce((out, room) => room && Object.assign(out, { [room.name]: room }), {})
}

function setupRoom(room) {
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
}

module.exports = { mapRooms, setupRoom }
