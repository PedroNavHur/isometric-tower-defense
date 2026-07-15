import { PATH_CELLS } from '../config/map'
import type { HexPoint } from '../types/towerDefense'

export function pathProgressToHexPoint(progress: number): HexPoint {
  const clamped = Math.max(0, Math.min(progress, PATH_CELLS.length - 1))
  const index = Math.min(Math.floor(clamped), PATH_CELLS.length - 1)
  const start = PATH_CELLS[index]
  const end = PATH_CELLS[Math.min(index + 1, PATH_CELLS.length - 1)]
  const ratio = clamped - index
  return {
    q: start.q + (end.q - start.q) * ratio,
    r: start.r + (end.r - start.r) * ratio,
  }
}
