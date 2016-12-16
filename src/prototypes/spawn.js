function createCustomCreep(energy, roleName) {
  const level = Math.floor(energy / 250)
  const template = [WORK, CARRY, MOVE, MOVE]
  let body = []

  for (let i = 0; i < level; i += 1) {
    body = [...body, ...template]
  }

  return this.createCreep(body, undefined, { role: roleName, working: false })
}

module.exports = () => {
  StructureSpawn.prototype.createCustomCreep = createCustomCreep
}
