import { BuildTray } from './BuildTray'
import { EndStateOverlay } from './EndStateOverlay'
import { ResourceRail } from './ResourceRail'
import { WaveControls } from './WaveControls'

export function GameHud() {
  return (
    <div className="game-hud">
      <ResourceRail />
      <BuildTray />
      <WaveControls />
      <EndStateOverlay />
    </div>
  )
}
