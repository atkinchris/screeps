function countRoles(creeps = []) {
  return creeps.reduce((out, creep) => {
    const role = creep.memory.role
    const count = out[role] ? out[role] + 1 : 1

    return Object.assign({}, out, { [role]: count })
  }, {
    harvester: 0,
    upgrader: 0,
  })
}

module.exports = countRoles
