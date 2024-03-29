function defendRoom(room) {
  const hostiles = room.find(FIND_HOSTILE_CREEPS)

  if (hostiles.length > 0) {
    // const username = hostiles[0].owner.username
    // Game.notify(`User ${username} spotted in room ${room.name}`)
    const towers = room.find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } })
    towers.forEach(tower => tower.attack(hostiles[0]))
  }
}

module.exports = defendRoom
