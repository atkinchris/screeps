function mapRooms(rooms, existing = {}) {
  return rooms.map((room) => {
    const { name } = room

    if (existing[name] && existing[name].sources) {
      return existing[name]
    }

    const sources = room.find(FIND_SOURCES).map((source) => {
      const { pos, id } = source
      const { x, y } = pos
      const terrain = room.lookForAtArea(LOOK_TERRAIN, y - 1, x - 1, y + 1, x + 1, true)
      const spots = terrain.filter(t => t.terrain === 'plain').length
      return { pos, spots, id }
    })

    return { name, sources }
  }).reduce((out, room) => Object.assign(out, { [room.name]: room }), {})
}

module.exports = mapRooms
