import type { HexPoint } from '../types/towerDefense'

export const HEX_DIRECTIONS = [
  { q: 1, r: 0 },
  { q: 1, r: -1 },
  { q: 0, r: -1 },
  { q: -1, r: 0 },
  { q: -1, r: 1 },
  { q: 0, r: 1 },
] as const

export function hexToWorld(
  position: HexPoint,
  spacing = 1,
): readonly [number, number, number] {
  return [
    (position.q + position.r / 2) * spacing,
    0,
    (Math.sqrt(3) / 2) * position.r * spacing,
  ]
}

export function hexDistance(left: HexPoint, right: HexPoint) {
  const q = left.q - right.q
  const r = left.r - right.r
  return Math.max(Math.abs(q), Math.abs(r), Math.abs(q + r))
}

export function worldDistance(left: HexPoint, right: HexPoint) {
  const [leftX, , leftZ] = hexToWorld(left)
  const [rightX, , rightZ] = hexToWorld(right)
  return Math.hypot(rightX - leftX, rightZ - leftZ)
}

export function hexKey(position: HexPoint) {
  return `${position.q}:${position.r}`
}
