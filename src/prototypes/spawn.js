function createCustomCreep(energy, roleName) {
  const numberOfParts = Math.floor(energy / 200)
  const body = []
  for (let i = 0; i < numberOfParts; i++) {
    body.push(WORK)
  }
  for (let i = 0; i < numberOfParts; i++) {
    body.push(CARRY)
  }
  for (let i = 0; i < numberOfParts; i++) {
    body.push(MOVE)
  }

  return this.createCreep(body, undefined, { role: roleName, working: false })
}

module.exports = () => {
  StructureSpawn.prototype.createCustomCreep = createCustomCreep
}
