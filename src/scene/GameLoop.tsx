import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import {
  FIXED_STEP_SECONDS,
  MAX_FRAME_DELTA_SECONDS,
} from '../game/config/balance'
import { useGameStore } from '../game/state/useGameStore'

export function GameLoop() {
  const accumulator = useRef(0)

  useFrame((_, delta) => {
    accumulator.current += Math.min(delta, MAX_FRAME_DELTA_SECONDS)
    while (accumulator.current >= FIXED_STEP_SECONDS) {
      useGameStore.getState().advanceGame(FIXED_STEP_SECONDS)
      accumulator.current -= FIXED_STEP_SECONDS
    }
  })

  return null
}
