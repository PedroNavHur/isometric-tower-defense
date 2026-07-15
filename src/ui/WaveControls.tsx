import { WAVES } from '../game/config/waves'
import { useGameStore } from '../game/state/useGameStore'

const PHASE_LABELS = {
  ready: 'Guardians ready',
  'wave-active': 'Wave in progress',
  intermission: 'The pass is clear',
  victory: 'All waves cleared',
  defeat: 'Stronghold breached',
} as const

export function WaveControls() {
  const phase = useGameStore((state) => state.phase)
  const isPaused = useGameStore((state) => state.isPaused)
  const currentWave = useGameStore((state) => state.currentWave)
  const startWave = useGameStore((state) => state.startWave)
  const togglePause = useGameStore((state) => state.togglePause)
  const canStart = phase === 'ready' || phase === 'intermission'

  return (
    <section className="wave-controls" aria-label="Wave controls">
      <div>
        <p className="utility-label">Status</p>
        <p className="phase-label" aria-live="polite">
          {isPaused ? 'Simulation paused' : PHASE_LABELS[phase]}
        </p>
      </div>
      <div className="wave-actions">
        {canStart ? (
          <button type="button" className="primary-action" onClick={startWave}>
            Start wave {Math.min(currentWave + 1, WAVES.length)}
          </button>
        ) : null}
        {phase === 'wave-active' ? (
          <button
            type="button"
            className="secondary-action"
            onClick={togglePause}
          >
            {isPaused ? 'Resume' : 'Pause'}
          </button>
        ) : null}
      </div>
    </section>
  )
}
