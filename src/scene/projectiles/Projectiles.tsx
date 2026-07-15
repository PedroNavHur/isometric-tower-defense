import { useGameStore } from '../../game/state/useGameStore'
import { Projectile } from './Projectile'

export function Projectiles() {
  const projectiles = useGameStore((state) => state.projectiles)
  return projectiles.map((projectile) => (
    <Projectile key={projectile.id} projectile={projectile} />
  ))
}
