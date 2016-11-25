/* eslint-disable no-global-assign */
const mapRooms = require('../mapRooms')

describe('mapRooms', () => {
  beforeEach(() => {
    FIND_SOURCES = 105
    LOOK_TERRAIN = 'terrain'
  })

  it('should return an object with all the rooms in', () => {
    const sources = [{ id: 100, pos: { x: 13, y: 13 } }]
    const terrain = [{ terrain: 'plain' }, { terrain: 'plain' }]
    const rooms = [{
      name: 'room1',
      find: jest.fn(() => sources),
      lookForAtArea: jest.fn(() => terrain),
    }]

    const expected = {
      room1: {
        name: 'room1',
        sources: [{
          id: 100,
          pos: { x: 13, y: 13 },
          spots: 2,
        }],
      },
    }

    expect(mapRooms(rooms)).toEqual(expected)
    expect(rooms[0].find).toHaveBeenCalledWith(FIND_SOURCES)
    expect(rooms[0].lookForAtArea).toHaveBeenCalledWith(LOOK_TERRAIN, 12, 12, 14, 14, true)
  })

  it('should not remap existing rooms', () => {
    const rooms = [{ name: 'room1', find: jest.fn(), lookForAtArea: jest.fn() }]
    const existing = { room1: { name: 'room1', sources: [] } }

    expect(mapRooms(rooms, existing)).toEqual(existing)
    expect(rooms[0].find).not.toHaveBeenCalled()
    expect(rooms[0].lookForAtArea).not.toHaveBeenCalled()
  })
})
