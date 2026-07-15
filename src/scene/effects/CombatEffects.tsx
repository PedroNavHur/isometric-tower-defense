import { useFrame } from '@react-three/fiber'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  AdditiveBlending,
  type Group,
  type Mesh,
  type MeshBasicMaterial,
  type PointLight,
} from 'three'
import { FIXED_STEP_SECONDS } from '../../game/config/balance'
import { useGameStore } from '../../game/state/useGameStore'
import { hexToWorld } from '../../game/utils/hexCoordinates'
import { pathProgressToHexPoint } from '../../game/utils/pathProgressToHexPoint'
import { MAGIC_BLOOM_COLOR, MAGIC_LIGHT_COLOR } from './effectPalette'

const IMPACT_DURATION_SECONDS = 0.3
const SHARD_DIRECTIONS = [
  [0.78, 0.48, 0.12],
  [-0.56, 0.64, 0.42],
  [0.22, 0.72, -0.68],
  [-0.7, 0.38, -0.44],
] as const

type ImpactEffect = {
  id: string
  position: readonly [number, number, number]
}

type ImpactBurstProps = ImpactEffect & {
  onComplete: (id: string) => void
}

function ImpactBurst({ id, position, onComplete }: ImpactBurstProps) {
  const elapsed = useRef(0)
  const completed = useRef(false)
  const core = useRef<Mesh>(null)
  const halo = useRef<Mesh>(null)
  const ring = useRef<Mesh>(null)
  const light = useRef<PointLight>(null)
  const shards = useRef<Group>(null)

  useFrame((_, delta) => {
    elapsed.current += delta
    const progress = Math.min(elapsed.current / IMPACT_DURATION_SECONDS, 1)
    const fade = 1 - progress

    if (core.current) {
      core.current.scale.setScalar(0.7 + progress * 2.8)
      ;(core.current.material as MeshBasicMaterial).opacity = fade * 0.82
    }
    if (halo.current) {
      halo.current.scale.setScalar(0.8 + progress * 3.8)
      ;(halo.current.material as MeshBasicMaterial).opacity = fade * 0.18
    }
    if (ring.current) {
      ring.current.scale.setScalar(0.7 + progress * 5)
      ;(ring.current.material as MeshBasicMaterial).opacity = fade * 0.7
    }
    if (light.current) light.current.intensity = fade * fade * 2.4
    if (shards.current) {
      shards.current.children.forEach((shard, index) => {
        const direction = SHARD_DIRECTIONS[index]
        shard.position.set(
          direction[0] * progress * 0.72,
          direction[1] * progress * 0.55,
          direction[2] * progress * 0.72,
        )
        shard.scale.setScalar(fade * 0.85)
      })
    }

    if (progress === 1 && !completed.current) {
      completed.current = true
      onComplete(id)
    }
  })

  return (
    <group position={position}>
      <pointLight
        ref={light}
        color={MAGIC_LIGHT_COLOR}
        intensity={2.4}
        distance={2.2}
        decay={2}
      />
      <mesh ref={core}>
        <icosahedronGeometry args={[0.13, 1]} />
        <meshBasicMaterial
          color={MAGIC_BLOOM_COLOR}
          transparent
          opacity={0.82}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <mesh ref={halo}>
        <icosahedronGeometry args={[0.2, 2]} />
        <meshBasicMaterial
          color={MAGIC_BLOOM_COLOR}
          transparent
          opacity={0.18}
          depthWrite={false}
          blending={AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
      <mesh ref={ring} position={[0, -0.54, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.08, 0.13, 24]} />
        <meshBasicMaterial
          color={MAGIC_BLOOM_COLOR}
          transparent
          opacity={0.7}
          depthWrite={false}
          blending={AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
      <group ref={shards}>
        {SHARD_DIRECTIONS.map((_, index) => (
          <mesh key={index} rotation={[index, index * 0.7, index * 0.35]}>
            <octahedronGeometry args={[0.055, 0]} />
            <meshBasicMaterial
              color={MAGIC_BLOOM_COLOR}
              transparent
              opacity={0.9}
              depthWrite={false}
              blending={AdditiveBlending}
              toneMapped={false}
            />
          </mesh>
        ))}
      </group>
    </group>
  )
}

export function CombatEffects() {
  const [impacts, setImpacts] = useState<readonly ImpactEffect[]>([])

  useEffect(
    () =>
      useGameStore.subscribe((state, previousState) => {
        const currentProjectileIds = new Set(
          state.projectiles.map((projectile) => projectile.id),
        )
        const landedProjectiles = previousState.projectiles.filter(
          (projectile) =>
            !currentProjectileIds.has(projectile.id) &&
            projectile.travelRemaining <= FIXED_STEP_SECONDS + 0.001,
        )
        if (landedProjectiles.length === 0) return

        const nextImpacts = landedProjectiles.flatMap((projectile) => {
          const target = previousState.enemies.find(
            (enemy) => enemy.id === projectile.targetEnemyId,
          )
          if (!target) return []
          const [x, , z] = hexToWorld(
            pathProgressToHexPoint(target.pathProgress),
          )
          return [
            {
              id: `${projectile.id}:${performance.now()}`,
              position: [x, 0.78, z] as const,
            },
          ]
        })

        if (nextImpacts.length > 0) {
          setImpacts((current) => [...current, ...nextImpacts].slice(-20))
        }
      }),
    [],
  )

  const removeImpact = useCallback((id: string) => {
    setImpacts((current) => current.filter((impact) => impact.id !== id))
  }, [])

  return impacts.map((impact) => (
    <ImpactBurst key={impact.id} {...impact} onComplete={removeImpact} />
  ))
}
