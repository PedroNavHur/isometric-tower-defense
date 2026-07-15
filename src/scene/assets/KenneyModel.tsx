import { Clone, useGLTF } from '@react-three/drei'
import { Suspense } from 'react'

type KenneyModelProps = {
  path: string
  castShadow?: boolean
  receiveShadow?: boolean
}

function LoadedKenneyModel({
  path,
  castShadow = true,
  receiveShadow = true,
}: KenneyModelProps) {
  const { scene } = useGLTF(path)
  return (
    <Clone
      object={scene}
      castShadow={castShadow}
      receiveShadow={receiveShadow}
    />
  )
}

export function KenneyModel(props: KenneyModelProps) {
  return (
    <Suspense fallback={null}>
      <LoadedKenneyModel {...props} />
    </Suspense>
  )
}
