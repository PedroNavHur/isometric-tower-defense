import { useGameStore } from '../../game/state/useGameStore'
import { Enemy } from './Enemy'

export function Enemies() {
  const enemies = useGameStore((state) => state.enemies)
  return enemies.map((enemy) => <Enemy key={enemy.id} enemy={enemy} />)
}
