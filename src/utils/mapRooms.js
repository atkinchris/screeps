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

module.exports = mapRooms
