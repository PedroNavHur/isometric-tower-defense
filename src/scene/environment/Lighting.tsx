export function Lighting() {
  return (
    <>
      <hemisphereLight color="#f9fcfb" groundColor="#61796f" intensity={1.55} />
      <directionalLight
        position={[-7, 14, 9]}
        intensity={2.25}
        color="#fff8e8"
        castShadow
        shadow-bias={-0.0004}
        shadow-normalBias={0.035}
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
      />
    </>
  )
}
