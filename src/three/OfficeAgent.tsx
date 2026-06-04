import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import type { WorkStatus } from '../types/map';
import SelectionRing from './SelectionRing';
import StatusBubble from './StatusBubble';
import { workStatusColor, workStatusLabel } from './materials';

interface OfficeAgentProps {
  workStatus?: WorkStatus;
  selected?: boolean;
  highlighted?: boolean;
}

function VoxelPart({ position, args, color }: { position: [number, number, number]; args: [number, number, number]; color: string }) {
  return (
    <mesh castShadow receiveShadow position={position}>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} roughness={0.74} flatShading />
    </mesh>
  );
}

export default function OfficeAgent({ workStatus = 'working', selected = false, highlighted = false }: OfficeAgentProps) {
  const groupRef = useRef<THREE.Group>(null);
  const dotRef = useRef<THREE.Mesh>(null);
  const color = workStatusColor[workStatus];
  const active = selected || highlighted;

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;
    groupRef.current.position.y = 0.04 + Math.sin(t * (workStatus === 'idle' ? 1.6 : 2.4)) * 0.03;
    groupRef.current.rotation.y = Math.sin(t * 0.72) * 0.07;
    if (dotRef.current) dotRef.current.scale.setScalar(1 + Math.sin(t * 5.2) * 0.15);
  });

  return (
    <group ref={groupRef} position={[0, 0.5, 0]}>
      <SelectionRing radius={0.3} color={active ? color : '#bfe7ff'} active y={0.02} />
      <VoxelPart position={[0, 0.34, 0]} args={[0.26, 0.32, 0.18]} color="#6ea9ff" />
      <VoxelPart position={[-0.19, 0.34, 0.01]} args={[0.08, 0.26, 0.1]} color="#5b95ef" />
      <VoxelPart position={[0.19, 0.34, 0.01]} args={[0.08, 0.26, 0.1]} color="#5b95ef" />
      <VoxelPart position={[-0.07, 0.12, 0.01]} args={[0.09, 0.22, 0.1]} color="#315c9c" />
      <VoxelPart position={[0.07, 0.12, 0.01]} args={[0.09, 0.22, 0.1]} color="#315c9c" />
      <VoxelPart position={[0, 0.61, 0.02]} args={[0.28, 0.26, 0.24]} color="#ffe0bd" />
      <VoxelPart position={[0, 0.77, -0.02]} args={[0.3, 0.08, 0.22]} color="#5b4438" />
      <VoxelPart position={[-0.17, 0.61, 0.03]} args={[0.035, 0.16, 0.06]} color="#2f4a66" />
      <VoxelPart position={[0.17, 0.61, 0.03]} args={[0.035, 0.16, 0.06]} color="#2f4a66" />
      <mesh ref={dotRef} castShadow position={[0.25, 0.72, 0.12]}>
        <sphereGeometry args={[0.058, 8, 6]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.42} roughness={0.5} flatShading />
      </mesh>
      <StatusBubble label={workStatusLabel[workStatus]} color={color} position={[0.38, 1.02, 0]} visible={active || workStatus === 'meeting' || workStatus === 'focus'} />
    </group>
  );
}
