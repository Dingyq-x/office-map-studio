import { Grid } from '@react-three/drei';

export default function OfficeFloor() {
  return (
    <group>
      <mesh position={[0, -0.09, 0]} receiveShadow castShadow>
        <boxGeometry args={[15.2, 0.18, 9.2, 1, 1, 1]} />
        <meshStandardMaterial color="#eaf8f3" roughness={0.78} flatShading />
      </mesh>
      <mesh position={[0, -0.18, 0.12]} receiveShadow>
        <boxGeometry args={[15.55, 0.12, 9.45]} />
        <meshStandardMaterial color="#b9cfe4" roughness={0.9} flatShading />
      </mesh>
      <Grid
        position={[0, 0.015, 0]}
        args={[15, 9]}
        cellSize={0.5}
        cellThickness={0.55}
        cellColor="#c9dff1"
        sectionSize={2}
        sectionThickness={0.8}
        sectionColor="#a9c8df"
        fadeDistance={18}
        fadeStrength={1}
        followCamera={false}
      />
      <mesh position={[-4.3, 0.02, 0.15]} rotation={[0, -0.35, 0]} receiveShadow>
        <boxGeometry args={[2.2, 0.03, 0.62]} />
        <meshStandardMaterial color="#fff3df" roughness={0.82} flatShading />
      </mesh>
      <mesh position={[4.4, 0.02, 0.5]} rotation={[0, 0.38, 0]} receiveShadow>
        <boxGeometry args={[2.2, 0.03, 0.62]} />
        <meshStandardMaterial color="#fff3df" roughness={0.82} flatShading />
      </mesh>
      <mesh position={[-1.4, 0.025, 2.2]} rotation={[0, 0.42, 0]} receiveShadow>
        <boxGeometry args={[2.1, 0.03, 0.58]} />
        <meshStandardMaterial color="#e8fbf2" roughness={0.82} flatShading />
      </mesh>
    </group>
  );
}
