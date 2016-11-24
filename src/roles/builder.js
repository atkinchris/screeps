function run(creep) {
  const constructionSite = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES)

  if (constructionSite) {
    const buildResult = creep.build(constructionSite)
    if (buildResult === ERR_NOT_IN_RANGE) {
      creep.moveTo(constructionSite)
    }
  } else {
    const repairSite = creep.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: structure =>
        (structure.hits < 5000) &&
        (structure.hits > 0) &&
        (structure.hits < structure.hitsMax),
    })
    if (repairSite) {
      if (creep.repair(repairSite) === ERR_NOT_IN_RANGE) {
        creep.moveTo(repairSite)
      }
    }
  }
}

module.exports = { run }
