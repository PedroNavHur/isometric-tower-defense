import { describe, expect, it } from 'vitest'
import { pathProgressToHexPoint } from './pathProgressToHexPoint'

describe('pathProgressToHexPoint', () => {
  it('interpolates between neighboring hex centers', () =>
    expect(pathProgressToHexPoint(1.5)).toEqual({ q: -3.5, r: 0 }))
  it('continues through an axial turn', () =>
    expect(pathProgressToHexPoint(4)).toEqual({ q: -3, r: 2 }))
  it('clamps beyond the castle exit', () =>
    expect(pathProgressToHexPoint(999)).toEqual({ q: 5, r: -5 }))
})
