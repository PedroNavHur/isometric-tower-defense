import { Board } from './board/Board'
import { BOARD_CENTER_OFFSET } from '../game/config/map'
import { IsometricCamera } from './camera/IsometricCamera'
import { Lighting } from './environment/Lighting'
import { GameLoop } from './GameLoop'
import { Enemies } from './enemies/Enemies'
import { Projectiles } from './projectiles/Projectiles'
import { PlacementPreview } from './towers/PlacementPreview'
import { Towers } from './towers/Towers'
import { CombatEffects } from './effects/CombatEffects'

export function GameScene() {
  return (
    <>
      <color attach="background" args={['#eee9dc']} />
      <IsometricCamera />
      <Lighting />
      <GameLoop />
      <Board />
      <group position={BOARD_CENTER_OFFSET}>
        <Towers />
        <Enemies />
        <Projectiles />
        <CombatEffects />
        <PlacementPreview />
      </group>
      <mesh
        position={[0, -0.34, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <circleGeometry args={[10.5, 64]} />
        <meshStandardMaterial color="#e4ddcd" roughness={0.95} />
      </mesh>
    </>
  )
}
