import { useGameStore } from '../../game/state/useGameStore'
import { ArcaneTower } from './ArcaneTower'

export function Towers() {
  const towers = useGameStore((state) => state.towers)
  return towers.map((tower) => <ArcaneTower key={tower.id} tower={tower} />)
}
