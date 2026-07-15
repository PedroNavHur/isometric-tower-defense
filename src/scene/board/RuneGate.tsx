import { AdditiveBlending } from 'three'

export function RuneGate() {
  return (
    <group rotation={[0, Math.PI / 2, 0]}>
      <mesh castShadow>
        <torusGeometry args={[0.34, 0.11, 6, 12]} />
        <meshStandardMaterial color="#66739a" roughness={0.84} />
      </mesh>
      <mesh scale={0.82}>
        <torusGeometry args={[0.34, 0.035, 6, 12]} />
        <meshBasicMaterial color="#ffc46b" toneMapped={false} />
      </mesh>
      <mesh position={[0, -0.32, 0]} castShadow>
        <boxGeometry args={[0.9, 0.16, 0.28]} />
        <meshStandardMaterial color="#53617c" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0, 0.02]} scale={0.28}>
        <circleGeometry args={[1, 24]} />
        <meshBasicMaterial
          color="#ffc46b"
          transparent
          opacity={0.16}
          blending={AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <pointLight color="#ffd88a" intensity={0.8} distance={2} decay={2} />
    </group>
  )
}
