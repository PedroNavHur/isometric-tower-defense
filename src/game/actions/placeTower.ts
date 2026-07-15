import { TOWER_STATS } from '../config/balance'
import { getPlacementFailure } from '../rules/canPlaceTower'
import type {
  HexPosition,
  PlacementResult,
  SimulationState,
  TowerKind,
} from '../types/towerDefense'

const FAILURE_MESSAGES = {
  'not-buildable': 'Choose an open grass hex.',
  occupied: 'A tower already occupies that hex.',
  'insufficient-funds': 'Not enough gold for this tower.',
  'game-ended': 'Start a new run before building.',
} as const

export function placeTower(
  state: SimulationState,
  kind: TowerKind,
  position: HexPosition,
): { state: SimulationState; result: PlacementResult } {
  const failure = getPlacementFailure(state, kind, position)
  if (failure) {
    return {
      state: { ...state, placementMessage: FAILURE_MESSAGES[failure] },
      result: { ok: false, reason: failure },
    }
  }

  const towerId = `tower-${state.nextTowerId}`
  return {
    state: {
      ...state,
      currency: state.currency - TOWER_STATS[kind].cost,
      nextTowerId: state.nextTowerId + 1,
      placementMessage: 'Rune tower placed. Choose another hex or cancel.',
      towers: [
        ...state.towers,
        {
          id: towerId,
          kind,
          position: { ...position },
          cooldownRemaining: 0,
          targetEnemyId: null,
        },
      ],
    },
    result: { ok: true, towerId },
  }
}
