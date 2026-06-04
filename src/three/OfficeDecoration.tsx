import { Html } from '@react-three/drei';
import type { MapMode, MapObject } from '../types/map';
import { objectToScene, sizeToScene } from './coordinates';
import SelectionRing from './SelectionRing';
import { ObjectResizeHandle } from './ResizeHandle';
import { useObjectDrag } from './useObjectDrag';

interface OfficeDecorationProps {
  object: MapObject;
  selected: boolean;
  highlighted: boolean;
  mode: MapMode;
  onSelect: (id: string) => void;
  onMove: (id: string, x: number, y: number) => void;
  onResize: (id: string, width: number, height: number) => void;
}

function Rug({ color, width, depth }: { color: string; width: number; depth: number }) {
  return (
    <mesh position={[0, 0.13, 0]} receiveShadow>
      <boxGeometry args={[width, 0.035, depth]} />
      <meshStandardMaterial color={color} roughness={0.86} flatShading />
    </mesh>
  );
}

function Lamp({ color }: { color: string }) {
  return (
    <group>
      <mesh position={[0, 0.22, 0]} castShadow><boxGeometry args={[0.18, 0.28, 0.18]} /><meshStandardMaterial color="#5c6f86" roughness={0.7} flatShading /></mesh>
      <mesh position={[0, 0.58, 0]} castShadow><boxGeometry args={[0.08, 0.62, 0.08]} /><meshStandardMaterial color="#5c6f86" roughness={0.7} flatShading /></mesh>
      <mesh position={[0, 0.96, 0]} castShadow><boxGeometry args={[0.42, 0.22, 0.42]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.28} roughness={0.55} flatShading /></mesh>
    </group>
  );
}

function Locker({ color, width, depth }: { color: string; width: number; depth: number }) {
  return (
    <group>
      <mesh position={[0, 0.46, 0]} castShadow receiveShadow><boxGeometry args={[Math.max(width, 0.45), 0.86, Math.max(depth, 0.28)]} /><meshStandardMaterial color={color} roughness={0.76} flatShading /></mesh>
      <mesh position={[0, 0.5, depth / 2 + 0.01]}><boxGeometry args={[Math.max(width * 0.82, 0.3), 0.04, 0.025]} /><meshStandardMaterial color="#eef7ff" roughness={0.6} flatShading /></mesh>
      <mesh position={[0, 0.74, depth / 2 + 0.012]}><boxGeometry args={[Math.max(width * 0.82, 0.3), 0.04, 0.025]} /><meshStandardMaterial color="#eef7ff" roughness={0.6} flatShading /></mesh>
    </group>
  );
}

function Screen({ color }: { color: string }) {
  return (
    <group>
      <mesh position={[0, 0.56, 0]} castShadow><boxGeometry args={[0.92, 0.5, 0.06]} /><meshStandardMaterial color="#18324a" roughness={0.58} flatShading /></mesh>
      <mesh position={[0, 0.57, 0.035]}><boxGeometry args={[0.78, 0.38, 0.018]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.18} roughness={0.42} flatShading /></mesh>
      <mesh position={[0, 0.22, 0]} castShadow><boxGeometry args={[0.08, 0.42, 0.08]} /><meshStandardMaterial color="#18324a" roughness={0.7} flatShading /></mesh>
    </group>
  );
}

export default function OfficeDecoration({ object, selected, highlighted, mode, onSelect, onMove, onResize }: OfficeDecorationProps) {
  const [x, , z] = objectToScene(object);
  const { width, depth } = sizeToScene(object.width, object.height);
  const color = object.color || '#ffd76a';
  const type = object.decorationType || 'rug';
  const { onPointerDown } = useObjectDrag({ enabled: mode === 'edit', objectId: object.id, onMove, width: object.width, height: object.height });

  return (
    <group
      position={[x, 0, z]}
      rotation={[0, -(object.rotation * Math.PI) / 180, 0]}
      onClick={(event) => { event.stopPropagation(); onSelect(object.id); }}
      onPointerDown={onPointerDown}
    >
      <SelectionRing radius={Math.max(width, depth) * 0.56} color={highlighted ? '#ffd76a' : '#2f8cff'} active={selected || highlighted} y={0.08} />
      {type === 'rug' && <Rug color={color} width={width} depth={depth} />}
      {type === 'lamp' && <Lamp color={color} />}
      {type === 'screen' && <Screen color={color} />}
      {type === 'locker' && <Locker color={color} width={width} depth={depth} />}
      {type === 'crate' && <Locker color={color} width={Math.max(width, 0.42)} depth={Math.max(depth, 0.42)} />}
      {type === 'waypoint' && <Rug color={color} width={width} depth={depth} />}
      {selected && mode === 'edit' && <ObjectResizeHandle object={object} enabled onResize={onResize} />}
      {(selected || highlighted) && <Html position={[0, 1.08, 0]} center distanceFactor={7} className="three-html-layer"><div className="object-chip">{object.label}</div></Html>}
    </group>
  );
}
