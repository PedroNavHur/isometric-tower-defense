import type { HexPosition } from '../types/towerDefense'

export function expandPath(
  waypoints: readonly HexPosition[],
): readonly HexPosition[] {
  if (waypoints.length === 0) return []

  const cells: HexPosition[] = [{ ...waypoints[0] }]
  for (let index = 1; index < waypoints.length; index += 1) {
    const start = waypoints[index - 1]
    const end = waypoints[index]
    const qDelta = end.q - start.q
    const rDelta = end.r - start.r
    const steps = Math.max(
      Math.abs(qDelta),
      Math.abs(rDelta),
      Math.abs(qDelta + rDelta),
    )
    if (steps > 0 && !(qDelta === 0 || rDelta === 0 || qDelta + rDelta === 0)) {
      throw new Error('Path segments must follow a straight axial direction')
    }

    const qStep = steps === 0 ? 0 : qDelta / steps
    const rStep = steps === 0 ? 0 : rDelta / steps
    for (let step = 1; step <= steps; step += 1) {
      cells.push({
        q: start.q + qStep * step,
        r: start.r + rStep * step,
      })
    }
  }
  return cells
}
