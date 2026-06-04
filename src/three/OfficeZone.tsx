import { Html } from '@react-three/drei';
import type { MapMode, MapObject, SpaceType } from '../types/map';
import { objectToScene, sizeToScene } from './coordinates';
import SelectionRing from './SelectionRing';
import { darker } from './materials';
import { ObjectResizeHandle } from './ResizeHandle';
import { useObjectDrag } from './useObjectDrag';

interface OfficeZoneProps {
  object: MapObject;
  selected: boolean;
  highlighted: boolean;
  mode: MapMode;
  onSelect: (id: string) => void;
  onMove: (id: string, x: number, y: number) => void;
  onResize: (id: string, width: number, height: number) => void;
}

const zoneMeta: Record<SpaceType, { mark: string; accent: string; wall: number; label: 'quiet' | 'important' }> = {
  front_desk: { mark: 'IN', accent: '#ffc68a', wall: 0.3, label: 'important' },
  office: { mark: '◎', accent: '#8ce9c1', wall: 0.22, label: 'quiet' },
  meeting_room: { mark: 'MT', accent: '#c9b7ff', wall: 0.36, label: 'important' },
  pantry: { mark: '☕', accent: '#ffd76a', wall: 0.24, label: 'quiet' },
  warehouse: { mark: 'BX', accent: '#b8c7d8', wall: 0.28, label: 'quiet' },
  lounge: { mark: 'ZZ', accent: '#ffc9df', wall: 0.2, label: 'quiet' },
};

function LowWall({ position, args, color, opacity }: { position: [number, number, number]; args: [number, number, number]; color: string; opacity: number }) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} transparent opacity={opacity} roughness={0.82} flatShading />
    </mesh>
  );
}

export default function OfficeZone({ object, selected, highlighted, mode, onSelect, onMove, onResize }: OfficeZoneProps) {
  const [x, , z] = objectToScene(object);
  const { width, depth } = sizeToScene(object.width, object.height);
  const color = object.color || '#cfe8ff';
  const meta = zoneMeta[object.spaceType || 'office'];
  const { onPointerDown } = useObjectDrag({ enabled: mode === 'edit', objectId: object.id, onMove, width: object.width, height: object.height });
  const active = selected || highlighted;
  const showLabel = active || meta.label === 'important';
  const edgeColor = darker(color, 0.22);

  return (
    <group
      position={[x, 0, z]}
      rotation={[0, -(object.rotation * Math.PI) / 180, 0]}
      onClick={(event) => { event.stopPropagation(); onSelect(object.id); }}
      onPointerDown={onPointerDown}
    >
      <mesh position={[0, -0.03, 0.04]} receiveShadow>
        <boxGeometry args={[width + 0.12, 0.08, depth + 0.12]} />
        <meshStandardMaterial color={darker(color, 0.3)} transparent opacity={0.24} roughness={0.9} flatShading />
      </mesh>
      <mesh position={[0, 0.035, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, 0.14, depth]} />
        <meshStandardMaterial color={color} roughness={0.78} flatShading />
      </mesh>
      <mesh position={[0, 0.12, 0]} receiveShadow>
        <boxGeometry args={[Math.max(width - 0.18, 0.2), 0.018, Math.max(depth - 0.18, 0.2)]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.28} roughness={0.68} flatShading />
      </mesh>

      <LowWall position={[0, meta.wall / 2 + 0.08, -depth / 2]} args={[width + 0.14, meta.wall, 0.1]} color={edgeColor} opacity={0.72} />
      <LowWall position={[-width / 2, meta.wall / 2 + 0.06, 0]} args={[0.1, meta.wall * 0.9, depth]} color={edgeColor} opacity={0.48} />
      <LowWall position={[width / 2, meta.wall / 2 + 0.06, 0]} args={[0.1, meta.wall * 0.9, depth]} color={edgeColor} opacity={0.34} />
      {object.spaceType === 'meeting_room' && <LowWall position={[0, 0.22, depth / 2]} args={[width * 0.44, 0.26, 0.08]} color={edgeColor} opacity={0.42} />}

      <mesh position={[-width / 2 + 0.24, 0.22, -depth / 2 + 0.24]} castShadow>
        <cylinderGeometry args={[0.09, 0.11, 0.12, 6]} />
        <meshStandardMaterial color={meta.accent} roughness={0.64} flatShading />
      </mesh>
      <SelectionRing radius={Math.max(width, depth) * 0.58} color={highlighted ? '#ffd76a' : '#2f8cff'} active={active} y={0.18} />
      {selected && mode === 'edit' && <ObjectResizeHandle object={object} enabled onResize={onResize} />}
      <Html position={[-width / 2 + 0.24, 0.5, -depth / 2 + 0.24]} center distanceFactor={8} className="three-html-layer">
        <div className={`zone-label ${showLabel ? 'visible' : 'compact'}`}><b>{meta.mark}</b>{showLabel && <span>{object.label}</span>}</div>
      </Html>
    </group>
  );
}
