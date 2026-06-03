import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import type { WorkStatus } from '../types/map';
import StatusBubble from './StatusBubble';
import { workStatusColor, workStatusLabel } from './materials';

interface OfficeAgentProps {
  workStatus?: WorkStatus;
  selected?: boolean;
  highlighted?: boolean;
}

export default function OfficeAgent({ workStatus = 'working', selected = false, highlighted = false }: OfficeAgentProps) {
  const groupRef = useRef<THREE.Group>(null);
  const dotRef = useRef<THREE.Mesh>(null);
  const color = workStatusColor[workStatus];

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;
    groupRef.current.position.y = 0.02 + Math.sin(t * (workStatus === 'idle' ? 2 : 3)) * 0.025;
    if (dotRef.current) dotRef.current.scale.setScalar(1 + Math.sin(t * 5) * 0.12);
  });

  return (
    <group ref={groupRef} position={[0, 0.48, 0]}>
      <mesh castShadow position={[0, 0.36, 0]}>
        <capsuleGeometry args={[0.11, 0.22, 4, 8]} />
        <meshStandardMaterial color="#6ea9ff" roughness={0.68} flatShading />
      </mesh>
      <mesh castShadow position={[0, 0.68, 0]}>
        <sphereGeometry args={[0.16, 12, 10]} />
        <meshStandardMaterial color="#ffe0bd" roughness={0.7} flatShading />
      </mesh>
      <mesh castShadow position={[0, 0.79, -0.035]}>
        <boxGeometry args={[0.22, 0.06, 0.12]} />
        <meshStandardMaterial color="#5b4438" roughness={0.8} flatShading />
      </mesh>
      <mesh ref={dotRef} castShadow position={[0.22, 0.72, 0.05]}>
        <sphereGeometry args={[0.055, 10, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.35} roughness={0.5} flatShading />
      </mesh>
      <StatusBubble label={workStatusLabel[workStatus]} color={color} position={[0.35, 1.02, 0]} visible={selected || highlighted || workStatus === 'meeting' || workStatus === 'focus'} />
    </group>
  );
}
