import type { EnemyKind, TowerKind } from '../types/towerDefense'

export const STARTING_CURRENCY = 150
export const STARTING_LIVES = 10
export const FIXED_STEP_SECONDS = 0.05
export const MAX_FRAME_DELTA_SECONDS = 0.25

export const TOWER_STATS: Record<
  TowerKind,
  {
    cost: number
    range: number
    damage: number
    cooldown: number
    projectileSpeed: number
  }
> = {
  pulseTower: {
    cost: 50,
    range: 2.75,
    damage: 20,
    cooldown: 0.75,
    projectileSpeed: 8,
  },
}

export const ENEMY_STATS: Record<
  EnemyKind,
  { health: number; speed: number; reward: number; leakDamage: number }
> = {
  normal: { health: 60, speed: 0.85, reward: 12, leakDamage: 1 },
  fast: { health: 35, speed: 1.35, reward: 9, leakDamage: 1 },
}
