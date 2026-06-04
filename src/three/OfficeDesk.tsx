interface OfficeDeskProps {
  color?: string;
  scale?: number;
}

export default function OfficeDesk({ color = '#d99058', scale = 1 }: OfficeDeskProps) {
  return (
    <group scale={scale}>
      <mesh castShadow receiveShadow position={[0, 0.42, 0]}>
        <boxGeometry args={[0.92, 0.12, 0.52]} />
        <meshStandardMaterial color={color} roughness={0.72} flatShading />
      </mesh>
      {[-0.35, 0.35].map((x) => [-0.18, 0.18].map((z) => (
        <mesh key={`${x}-${z}`} castShadow position={[x, 0.2, z]}>
          <boxGeometry args={[0.06, 0.36, 0.06]} />
          <meshStandardMaterial color="#9b6a48" roughness={0.8} flatShading />
        </mesh>
      )))}
      <mesh castShadow position={[0.22, 0.5, -0.08]} rotation={[0, 0.3, 0]}>
        <boxGeometry args={[0.22, 0.025, 0.13]} />
        <meshStandardMaterial color="#ffffff" roughness={0.7} flatShading />
      </mesh>
    </group>
  );
}
