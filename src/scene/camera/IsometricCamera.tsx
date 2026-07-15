import { MapControls, OrthographicCamera } from '@react-three/drei'
import { useThree } from '@react-three/fiber'

const CAMERA_POSITION: readonly [number, number, number] = [8.5, 9.5, 9]

export function IsometricCamera() {
  const { height, width } = useThree((state) => state.size)
  const baselineZoom = Math.max(18, Math.min(74, width / 19, height / 13.5))

  return (
    <>
      <OrthographicCamera
        makeDefault
        position={CAMERA_POSITION}
        zoom={baselineZoom}
        near={0.1}
        far={100}
        onUpdate={(camera) => camera.lookAt(0, 0, 0)}
      />
      <MapControls
        enablePan={false}
        enableRotate={false}
        enableDamping
        dampingFactor={0.08}
        minZoom={baselineZoom}
        maxZoom={baselineZoom * 1.6}
        target={[0, 0, 0]}
      />
    </>
  )
}
