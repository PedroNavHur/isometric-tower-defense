import { describe, expect, it } from 'vitest'
import { PATH_CELLS } from '../config/map'
import { expandPath } from './expandPath'

describe('expandPath', () => {
  it('expands axial waypoints without duplicating corners', () => {
    expect(
      expandPath([
        { q: 0, r: 0 },
        { q: 2, r: 0 },
        { q: 2, r: -2 },
      ]),
    ).toEqual([
      { q: 0, r: 0 },
      { q: 1, r: 0 },
      { q: 2, r: 0 },
      { q: 2, r: -1 },
      { q: 2, r: -2 },
    ])
  })
  it('creates the complete 19-cell authored route', () =>
    expect(PATH_CELLS).toHaveLength(19))
  it('rejects movement that is not an axial direction', () => {
    expect(() =>
      expandPath([
        { q: 0, r: 0 },
        { q: 1, r: 1 },
      ]),
    ).toThrow('straight axial direction')
  })
})
