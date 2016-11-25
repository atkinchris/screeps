const pruneCreeps = require('../pruneCreeps')

describe('pruneCreeps', () => {
  it('should remove creeps that no longer exist in the game', () => {
    const creeps = { b: {} }
    const existing = { a: { role: 'harvester' }, b: { role: 'builder' } }
    const expected = { b: { role: 'builder' } }
    const log = jest.fn()

    expect(pruneCreeps(creeps, existing, log)).toEqual(expected)
    expect(log).toHaveBeenCalledWith('Clearing non-existing creep memory:', 'a')
  })
})
