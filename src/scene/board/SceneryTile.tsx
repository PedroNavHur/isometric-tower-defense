import type { HexPosition } from '../../game/types/towerDefense'
import { hexToWorld } from '../../game/utils/hexCoordinates'
import { KenneyModel } from '../assets/KenneyModel'
import { MODEL_PATHS } from '../assets/modelPaths'

const SCENERY_MODELS = [
  MODEL_PATHS.grassForest,
  MODEL_PATHS.village,
  MODEL_PATHS.grassHill,
  MODEL_PATHS.grassForest,
  MODEL_PATHS.stoneRocks,
  MODEL_PATHS.grassHill,
  MODEL_PATHS.archery,
  MODEL_PATHS.grassForest,
  MODEL_PATHS.stoneMountain,
  MODEL_PATHS.grassHill,
] as const

type SceneryTileProps = {
  index: number
  position: HexPosition
}

export function SceneryTile({ index, position }: SceneryTileProps) {
  const [x, , z] = hexToWorld(position)
  return (
    <group position={[x, 0, z]} scale={1.025}>
      <KenneyModel path={SCENERY_MODELS[index % SCENERY_MODELS.length]} />
    </group>
  )
}
