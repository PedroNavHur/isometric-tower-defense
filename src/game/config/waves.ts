import type { EnemyKind, PendingSpawn } from '../types/towerDefense'

function sequence(
  kinds: readonly EnemyKind[],
  delay: number,
): readonly PendingSpawn[] {
  return kinds.map((kind, index) => ({ kind, delay: index === 0 ? 0 : delay }))
}

const alternating = (count: number): readonly EnemyKind[] =>
  Array.from({ length: count }, (_, index) =>
    index % 2 === 0 ? 'normal' : 'fast',
  )

export const WAVES: readonly (readonly PendingSpawn[])[] = [
  sequence(
    Array.from({ length: 8 }, () => 'normal' as const),
    1,
  ),
  sequence(alternating(12), 0.85),
  sequence(alternating(20), 0.65),
]
