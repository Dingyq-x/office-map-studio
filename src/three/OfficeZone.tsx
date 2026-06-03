import { Html } from '@react-three/drei';
import type { MapMode, MapObject } from '../types/map';
import { objectToScene, sizeToScene } from './coordinates';
import SelectionRing from './SelectionRing';
import { darker } from './materials';
import { useObjectDrag } from './useObjectDrag';

interface OfficeZoneProps {
  object: MapObject;
  selected: boolean;
  highlighted: boolean;
  mode: MapMode;
  onSelect: (id: string) => void;
  onMove: (id: string, x: number, y: number) => void;
}

export default function OfficeZone({ object, selected, highlighted, mode, onSelect, onMove }: OfficeZoneProps) {
  const [x, , z] = objectToScene(object);
  const { width, depth } = sizeToScene(object.width, object.height);
  const color = object.color || '#cfe8ff';
  const { onPointerDown } = useObjectDrag({ enabled: mode === 'edit', objectId: object.id, onMove, width: object.width, height: object.height });
  const active = selected || highlighted;

  return (
    <group
      position={[x, 0, z]}
      rotation={[0, -(object.rotation * Math.PI) / 180, 0]}
      onClick={(event) => { event.stopPropagation(); onSelect(object.id); }}
      onPointerDown={onPointerDown}
    >
      <mesh position={[0, 0.03, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, 0.12, depth]} />
        <meshStandardMaterial color={color} roughness={0.78} flatShading />
      </mesh>
      <mesh position={[0, 0.16, -depth / 2]} castShadow receiveShadow>
        <boxGeometry args={[width + 0.08, 0.22, 0.08]} />
        <meshStandardMaterial color={darker(color, 0.22)} transparent opacity={0.76} roughness={0.8} flatShading />
      </mesh>
      <mesh position={[-width / 2, 0.14, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.08, 0.2, depth]} />
        <meshStandardMaterial color={darker(color, 0.18)} transparent opacity={0.58} roughness={0.8} flatShading />
      </mesh>
      <mesh position={[width / 2, 0.14, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.08, 0.2, depth]} />
        <meshStandardMaterial color={darker(color, 0.18)} transparent opacity={0.42} roughness={0.8} flatShading />
      </mesh>
      <SelectionRing radius={Math.max(width, depth) * 0.58} color={highlighted ? '#ffd76a' : '#2f8cff'} active={active} y={0.16} />
      <Html position={[0, 0.42, -depth / 2 - 0.12]} center distanceFactor={8} className="three-html-layer">
        <div className="zone-label">{object.label}</div>
      </Html>
    </group>
  );
}
