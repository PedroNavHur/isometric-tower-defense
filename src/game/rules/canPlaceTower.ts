import { DECORATION_CELLS, PATH_CELLS } from '../config/map'
import { TOWER_STATS } from '../config/balance'
import type {
  HexPosition,
  PlacementFailure,
  SimulationState,
  TowerKind,
} from '../types/towerDefense'

export function positionsMatch(left: HexPosition, right: HexPosition) {
  return left.q === right.q && left.r === right.r
}

export function getPlacementFailure(
  state: SimulationState,
  kind: TowerKind,
  position: HexPosition,
): PlacementFailure | null {
  if (state.phase === 'victory' || state.phase === 'defeat') return 'game-ended'
  if (
    PATH_CELLS.some((cell) => positionsMatch(cell, position)) ||
    DECORATION_CELLS.some((cell) => positionsMatch(cell, position))
  ) {
    return 'not-buildable'
  }
  if (state.towers.some((tower) => positionsMatch(tower.position, position))) {
    return 'occupied'
  }
  if (state.currency < TOWER_STATS[kind].cost) return 'insufficient-funds'
  return null
}
