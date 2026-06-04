import { Grid } from '@react-three/drei';
import type { OfficeMapConfig } from '../types/map';
import { MAP_SCALE } from './coordinates';
import { MapBoundaryResizeHandle } from './ResizeHandle';

function EdgeStone({ position, args, color }: { position: [number, number, number]; args: [number, number, number]; color: string }) {
  return (
    <mesh position={position} receiveShadow castShadow>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} roughness={0.92} flatShading />
    </mesh>
  );
}

interface OfficeFloorProps {
  config: OfficeMapConfig;
  editable: boolean;
  onResize: (width: number, depth: number) => void;
}

export default function OfficeFloor({ config, editable, onResize }: OfficeFloorProps) {
  const width = config.width / MAP_SCALE;
  const depth = config.depth / MAP_SCALE;
  const tileSize = Math.max(config.tileSize / MAP_SCALE, 0.4);
  const tileCols = Math.max(2, Math.floor(width / tileSize));
  const tileRows = Math.max(2, Math.floor(depth / tileSize));

  return (
    <group>
      <mesh position={[0, -0.42, 0.28]} receiveShadow>
        <boxGeometry args={[width + 1.1, 0.22, depth + 1.1]} />
        <meshStandardMaterial color="#7fa2c1" roughness={0.96} transparent opacity={0.18} flatShading />
      </mesh>
      <mesh position={[0, -0.25, 0.18]} receiveShadow castShadow>
        <boxGeometry args={[width + 0.52, 0.38, depth + 0.52, 1, 1, 1]} />
        <meshStandardMaterial color={config.edgeColor} roughness={0.92} flatShading />
      </mesh>
      <mesh position={[0, -0.04, 0]} receiveShadow castShadow>
        <boxGeometry args={[width, 0.18, depth, 1, 1, 1]} />
        <meshStandardMaterial color={config.floorColor} roughness={0.78} flatShading />
      </mesh>
      {config.showBoundary && (
        <>
          <EdgeStone position={[0, 0.09, -depth / 2 - 0.06]} args={[width + 0.12, 0.24, 0.12]} color="#c8dff2" />
          <EdgeStone position={[0, 0.08, depth / 2 + 0.06]} args={[width + 0.12, 0.2, 0.1]} color="#d6e8f6" />
          <EdgeStone position={[-width / 2 - 0.06, 0.08, 0]} args={[0.12, 0.22, depth]} color="#c3d9ed" />
          <EdgeStone position={[width / 2 + 0.06, 0.08, 0]} args={[0.1, 0.2, depth]} color="#d6e8f6" />
        </>
      )}
      {Array.from({ length: tileCols }, (_, ix) =>
        Array.from({ length: tileRows }, (_, iz) => {
          const x = -width / 2 + tileSize / 2 + ix * tileSize;
          const z = -depth / 2 + tileSize / 2 + iz * tileSize;
          const warm = (ix + iz) % 2 === 0;
          return (
            <mesh key={`tile-${ix}-${iz}`} position={[x, 0.075, z]} receiveShadow>
              <boxGeometry args={[tileSize * 0.9, 0.018, tileSize * 0.86]} />
              <meshStandardMaterial color={warm ? '#f4fbff' : '#e8fbf2'} roughness={0.84} flatShading />
            </mesh>
          );
        }),
      )}
      {config.showGrid && (
        <Grid
          position={[0, 0.092, 0]}
          args={[width, depth]}
          cellSize={Math.max(tileSize / 2, 0.35)}
          cellThickness={0.45}
          cellColor="#c9dff1"
          sectionSize={Math.max(tileSize * 2, 1.2)}
          sectionThickness={0.7}
          sectionColor="#a9c8df"
          fadeDistance={18}
          fadeStrength={1}
          followCamera={false}
        />
      )}
      <mesh position={[-width * 0.28, 0.095, 0.15]} rotation={[0, -0.35, 0]} receiveShadow>
        <boxGeometry args={[Math.max(width * 0.15, 1.5), 0.035, 0.62]} />
        <meshStandardMaterial color="#fff3df" roughness={0.82} flatShading />
      </mesh>
      <mesh position={[width * 0.28, 0.095, 0.5]} rotation={[0, 0.38, 0]} receiveShadow>
        <boxGeometry args={[Math.max(width * 0.15, 1.5), 0.035, 0.62]} />
        <meshStandardMaterial color="#fff3df" roughness={0.82} flatShading />
      </mesh>
      {config.showBoundary && <MapBoundaryResizeHandle config={config} enabled={editable} onResize={onResize} />}
    </group>
  );
}
