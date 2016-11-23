function prune() {
  Memory.creeps = Object.keys(Memory.creeps).reduce((creeps, name) => {
    if (!Game.creeps[name]) {
      console.log('Clearing non-existing creep memory:', name)
      return creeps
    }

    return Object.assign({}, creeps, { [name]: Memory.creeps[name] })
  }, {})
}

module.exports = {
  prune,
}
