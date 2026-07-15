import {
  getPlacementFailure,
  positionsMatch,
} from '../../game/rules/canPlaceTower'
import { useGameStore } from '../../game/state/useGameStore'
import type { HexPosition } from '../../game/types/towerDefense'
import { hexToWorld } from '../../game/utils/hexCoordinates'
import { KenneyModel } from '../assets/KenneyModel'
import { MODEL_PATHS } from '../assets/modelPaths'

type BuildTileProps = { position: HexPosition }

export function BuildTile({ position }: BuildTileProps) {
  const selectedBuild = useGameStore((state) => state.selectedBuild)
  const isHovered = useGameStore((state) =>
    state.hoveredTile ? positionsMatch(state.hoveredTile, position) : false,
  )
  const setHoveredTile = useGameStore((state) => state.setHoveredTile)
  const placeTower = useGameStore((state) => state.placeTower)
  const canBuild = selectedBuild
    ? getPlacementFailure(useGameStore.getState(), selectedBuild, position) ===
      null
    : false
  const [x, , z] = hexToWorld(position)

  return (
    <group position={[x, 0, z]}>
      <group scale={1.025}>
        <KenneyModel
          path={MODEL_PATHS.grass}
          castShadow={false}
          receiveShadow
        />
      </group>
      <mesh
        position={[0, 0.245, 0]}
        onClick={(event) => {
          event.stopPropagation()
          if (selectedBuild && placeTower(position).ok) setHoveredTile(null)
        }}
        onContextMenu={(event) => event.stopPropagation()}
        onPointerEnter={(event) => {
          event.stopPropagation()
          document.body.style.cursor = selectedBuild ? 'crosshair' : 'default'
          setHoveredTile(position)
        }}
        onPointerLeave={() => {
          document.body.style.cursor = 'default'
          const current = useGameStore.getState().hoveredTile
          if (current && positionsMatch(current, position)) setHoveredTile(null)
        }}
      >
        <cylinderGeometry args={[0.55, 0.55, 0.055, 6]} />
        <meshBasicMaterial
          transparent
          opacity={isHovered && selectedBuild ? 0.34 : 0}
          color={canBuild ? '#f9fcfb' : '#c84c4c'}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}
