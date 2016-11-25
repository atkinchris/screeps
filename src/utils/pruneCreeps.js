function pruneCreeps(creeps, existing, log) {
  return Object.keys(existing).reduce((out, name) => {
    if (!creeps[name]) {
      log('Clearing non-existing creep memory:', name)
      return out
    }

    return Object.assign(out, { [name]: existing[name] })
  }, {})
}

module.exports = pruneCreeps
