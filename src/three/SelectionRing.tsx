interface SelectionRingProps {
  radius: number;
  color: string;
  active: boolean;
  y?: number;
}

export default function SelectionRing({ radius, color, active, y = 0.08 }: SelectionRingProps) {
  if (!active) return null;
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, y, 0]} receiveShadow={false}>
      <torusGeometry args={[radius, 0.025, 10, 72]} />
      <meshBasicMaterial color={color} transparent opacity={0.85} />
    </mesh>
  );
}
