import {
  BOARD_CENTER_OFFSET,
  DECORATION_CELLS,
  MAP_POSITIONS,
  PATH_CELLS,
  WATER_POSITIONS,
} from '../../game/config/map'
import { positionsMatch } from '../../game/rules/canPlaceTower'
import { hexKey, hexToWorld } from '../../game/utils/hexCoordinates'
import { KenneyModel } from '../assets/KenneyModel'
import { MODEL_PATHS } from '../assets/modelPaths'
import { BuildTile } from './BuildTile'
import { PathTile } from './PathTile'
import { RuneGate } from './RuneGate'
import { SceneryTile } from './SceneryTile'
import { getPathPresentation } from './boardPresentation'

export function Board() {
  const [startX, , startZ] = hexToWorld(PATH_CELLS[0])

  return (
    <group position={BOARD_CENTER_OFFSET}>
      {WATER_POSITIONS.map((position, index) => {
        const [x, , z] = hexToWorld(position)
        return (
          <group
            key={`water:${hexKey(position)}`}
            position={[x, -0.14, z]}
            scale={1.025}
          >
            <KenneyModel
              path={
                index % 9 === 0 ? MODEL_PATHS.waterRocks : MODEL_PATHS.water
              }
              castShadow={false}
              receiveShadow
            />
          </group>
        )
      })}

      {MAP_POSITIONS.map((position) => {
        const key = hexKey(position)
        if (PATH_CELLS.some((cell) => positionsMatch(cell, position))) {
          if (positionsMatch(position, PATH_CELLS[PATH_CELLS.length - 1])) {
            const [x, , z] = hexToWorld(position)
            const { rotation } = getPathPresentation(position)
            return (
              <group key={key} position={[x, 0, z]}>
                <group scale={1.025}>
                  <KenneyModel path={MODEL_PATHS.castle} />
                </group>
                <group position={[0, 0.202, 0]} rotation={[0, rotation, 0]}>
                  <KenneyModel
                    path={MODEL_PATHS.pathEnd}
                    castShadow={false}
                    receiveShadow
                  />
                </group>
              </group>
            )
          }
          return <PathTile key={key} position={position} />
        }
        const sceneryIndex = DECORATION_CELLS.findIndex((cell) =>
          positionsMatch(cell, position),
        )
        if (sceneryIndex >= 0) {
          return (
            <SceneryTile key={key} index={sceneryIndex} position={position} />
          )
        }
        return <BuildTile key={key} position={position} />
      })}

      <group position={[startX, 0.52, startZ]}>
        <RuneGate />
      </group>
    </group>
  )
}
