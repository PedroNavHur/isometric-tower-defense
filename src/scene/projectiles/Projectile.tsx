import { useGameStore } from '../../game/state/useGameStore'
import type { ProjectileState } from '../../game/types/towerDefense'
import { hexToWorld } from '../../game/utils/hexCoordinates'
import { pathProgressToHexPoint } from '../../game/utils/pathProgressToHexPoint'
import { AdditiveBlending } from 'three'
import { MAGIC_BLOOM_COLOR, MAGIC_LIGHT_COLOR } from '../effects/effectPalette'

type ProjectileProps = { projectile: ProjectileState }

export function Projectile({ projectile }: ProjectileProps) {
  const source = useGameStore((state) =>
    state.towers.find((tower) => tower.id === projectile.sourceTowerId),
  )
  const target = useGameStore((state) =>
    state.enemies.find((enemy) => enemy.id === projectile.targetEnemyId),
  )
  if (!source || !target) return null

  const start = hexToWorld(source.position)
  const end = hexToWorld(pathProgressToHexPoint(target.pathProgress))
  const progress = 1 - projectile.travelRemaining / projectile.travelDuration
  const x = start[0] + (end[0] - start[0]) * progress
  const y = 1.25 + (0.75 - 1.25) * progress
  const z = start[2] + (end[2] - start[2]) * progress
  const elapsed = projectile.travelDuration - projectile.travelRemaining
  const muzzleStrength = Math.max(0, 1 - elapsed / 0.11)
  const impactStrength = Math.max(0, 1 - projectile.travelRemaining / 0.12)

  return (
    <>
      {muzzleStrength > 0 ? (
        <group position={[start[0], 1.25, start[2]]}>
          <pointLight
            color={MAGIC_LIGHT_COLOR}
            intensity={muzzleStrength * 1.8}
            distance={1.8}
            decay={2}
          />
          <mesh scale={0.16 + (1 - muzzleStrength) * 0.22}>
            <icosahedronGeometry args={[1, 1]} />
            <meshBasicMaterial
              color={MAGIC_BLOOM_COLOR}
              transparent
              opacity={muzzleStrength * 0.8}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
          <mesh scale={0.3 + (1 - muzzleStrength) * 0.3}>
            <icosahedronGeometry args={[1, 2]} />
            <meshBasicMaterial
              color={MAGIC_BLOOM_COLOR}
              transparent
              opacity={muzzleStrength * 0.16}
              depthWrite={false}
              blending={AdditiveBlending}
              toneMapped={false}
            />
          </mesh>
        </group>
      ) : null}
      <group position={[x, y, z]}>
        <pointLight
          color={MAGIC_LIGHT_COLOR}
          intensity={0.45 + impactStrength * 0.7}
          distance={1.25}
          decay={2}
        />
        <mesh scale={0.16 + impactStrength * 0.1}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial
            color={MAGIC_BLOOM_COLOR}
            transparent
            opacity={0.5 + impactStrength * 0.25}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
        <mesh scale={0.3 + impactStrength * 0.16}>
          <icosahedronGeometry args={[1, 2]} />
          <meshBasicMaterial
            color={MAGIC_BLOOM_COLOR}
            transparent
            opacity={0.13 + impactStrength * 0.08}
            depthWrite={false}
            blending={AdditiveBlending}
            toneMapped={false}
          />
        </mesh>
      </group>
    </>
  )
}
