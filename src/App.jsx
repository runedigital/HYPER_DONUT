import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, Environment, MeshTransmissionMaterial } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'
import * as THREE from 'three'

function GlassShape() {
  const ref = useRef()
  useFrame((state) => {
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2
    ref.current.rotation.y += 0.01
  })
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={ref}>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <MeshTransmissionMaterial 
          backside={true}
          backsideThickness={5} 
          thickness={2} 
          chromaticAberration={1} 
          anisotropy={1} 
          distortion={0.5} 
          distortionScale={1} 
          temporalDistortion={0.2} 
          color='#ffffff' 
          background={new THREE.Color('#000000')}
        />
      </mesh>
    </Float>
  )
}

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: 'black' }}>
      <Canvas camera={{ position: [0, 0, 6] }}>
        <color attach="background" args={['#000']} />
        <Suspense fallback={null}>
          <Environment preset="city" />
          <GlassShape />
          <EffectComposer disableNormalPass>
             <Bloom intensity={0.5} luminanceThreshold={1} />
             <ChromaticAberration offset={[0.002, 0.002]} />
          </EffectComposer>
        </Suspense>
        <OrbitControls autoRotate />
      </Canvas>
    </div>
  )
}
