import { describe, expect, it } from 'vitest'
import { getPathPresentation } from './boardPresentation'

describe('getPathPresentation', () => {
  it.each([
    [{ q: -5, r: 0 }, 'start', Math.PI],
    [{ q: -4, r: 0 }, 'straight', 0],
    [{ q: -3, r: 0 }, 'corner', (Math.PI * 2) / 3],
    [{ q: 0, r: 3 }, 'cornerSharp', 0],
    [{ q: 5, r: -5 }, 'end', Math.PI / 3],
  ] as const)('presents path tile %o', (position, kind, rotation) => {
    expect(getPathPresentation(position)).toEqual({ kind, rotation })
  })
})
