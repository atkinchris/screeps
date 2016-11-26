function run(creep) {
  const target = Game.getObjectById(creep.memory.target)

  if (target) {
    if (creep.pos.inRangeTo(target, 1)) {
      creep.harvest(target)
    } else {
      creep.moveTo(target)
    }
  } else {
    console.log('I am lost,', creep.name, creep.memory.role)
  }
}

module.exports = { run }
