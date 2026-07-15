import { WAVES } from '../game/config/waves'
import { useGameStore } from '../game/state/useGameStore'

export function ResourceRail() {
  const currency = useGameStore((state) => state.currency)
  const lives = useGameStore((state) => state.lives)
  const currentWave = useGameStore((state) => state.currentWave)
  const enemies = useGameStore((state) => state.enemies.length)

  return (
    <header className="resource-rail">
      <div className="game-identity">
        <span className="signal-dot" aria-hidden="true" />
        <div>
          <p>Enchanted pass</p>
          <h1>Hold the Line</h1>
        </div>
      </div>
      <dl className="resources" aria-label="Run resources">
        <div>
          <dt>Gold</dt>
          <dd>{currency}</dd>
        </div>
        <div>
          <dt>Lives</dt>
          <dd>{lives}</dd>
        </div>
        <div>
          <dt>Wave</dt>
          <dd>
            {currentWave}/{WAVES.length}
          </dd>
        </div>
        <div>
          <dt>Threats</dt>
          <dd>{enemies}</dd>
        </div>
      </dl>
    </header>
  )
}
