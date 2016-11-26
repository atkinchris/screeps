const roles = require('../roles')

function run(creep) {
  const { memory } = creep
  if (memory === undefined/* || !memory.target || !memory.role */) {
    creep.suicide()
    console.log(`Killing ${creep.name}, as it has no purpose.`)
  }

  const role = roles[memory.role]
  role.run(creep)
}

function pruneCreeps(creeps = {}, existing = {}, log = console.log) {
  return Object.keys(existing).reduce((out, name) => {
    if (!creeps[name]) {
      log('Clearing non-existing creep memory:', name)
      return out
    }

    return Object.assign(out, { [name]: existing[name] })
  }, {})
}

module.exports = { run, pruneCreeps }
