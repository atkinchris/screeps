function createCustomCreep(energy, roleName) {
  const level = Math.floor(energy / 250)
  const template = [WORK, CARRY, MOVE, MOVE]
  let body = []

  for (let i = 0; i < level; i += 1) {
    body = [...body, ...template]
  }

  const result = this.createCreep(body, undefined, { role: roleName, working: false })

  // if (result === ERR_NOT_ENOUGH_ENERGY) {
  //   console.log(`Failed to spawn ${roleName} with ${energy} energy (level ${level})`)
  // } else {
  //   console.log(`Attempting to spawn ${roleName} using ${energy} energy (level ${level})`)
  // }

  return result
}

module.exports = () => {
  StructureSpawn.prototype.createCustomCreep = createCustomCreep
}
