import { Html } from '@react-three/drei';
import type { MapMode, MapObject } from '../types/map';
import { objectToScene } from './coordinates';
import OfficeDesk from './OfficeDesk';
import SelectionRing from './SelectionRing';
import { ObjectResizeHandle } from './ResizeHandle';
import { useObjectDrag } from './useObjectDrag';

interface OfficeFurnitureProps {
  object: MapObject;
  selected: boolean;
  highlighted: boolean;
  mode: MapMode;
  onSelect: (id: string) => void;
  onMove: (id: string, x: number, y: number) => void;
  onResize: (id: string, width: number, height: number) => void;
}

function Chair({ color = '#75a9ff', position = [0, 0, 0] as [number, number, number], rotation = 0 }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh castShadow receiveShadow position={[0, 0.23, 0]}>
        <boxGeometry args={[0.34, 0.12, 0.34]} />
        <meshStandardMaterial color={color} roughness={0.72} flatShading />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.46, 0.15]}>
        <boxGeometry args={[0.34, 0.34, 0.08]} />
        <meshStandardMaterial color={color} roughness={0.72} flatShading />
      </mesh>
      {[-0.12, 0.12].map((x) => [-0.1, 0.1].map((z) => (
        <mesh key={`${x}-${z}`} castShadow position={[x, 0.1, z]}>
          <boxGeometry args={[0.04, 0.18, 0.04]} />
          <meshStandardMaterial color="#5278b6" roughness={0.8} flatShading />
        </mesh>
      )))}
    </group>
  );
}

function MeetingTable({ color }: { color: string }) {
  return (
    <group>
      <mesh castShadow receiveShadow position={[0, 0.42, 0]}>
        <boxGeometry args={[1.75, 0.14, 0.72]} />
        <meshStandardMaterial color={color} roughness={0.7} flatShading />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.51, 0]}>
        <boxGeometry args={[0.42, 0.035, 0.28]} />
        <meshStandardMaterial color="#ffffff" roughness={0.76} flatShading />
      </mesh>
      <Chair position={[-0.72, 0, -0.62]} rotation={Math.PI} />
      <Chair position={[0.72, 0, -0.62]} rotation={Math.PI} />
      <Chair position={[-0.72, 0, 0.62]} rotation={0} />
      <Chair position={[0.72, 0, 0.62]} rotation={0} />
    </group>
  );
}

function Sofa({ color }: { color: string }) {
  return (
    <group>
      <mesh castShadow receiveShadow position={[0, 0.25, 0]}>
        <boxGeometry args={[1.34, 0.3, 0.62]} />
        <meshStandardMaterial color={color} roughness={0.76} flatShading />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.54, 0.25]}>
        <boxGeometry args={[1.34, 0.52, 0.18]} />
        <meshStandardMaterial color="#ffa8c5" roughness={0.74} flatShading />
      </mesh>
      <mesh castShadow position={[-0.68, 0.42, 0]}>
        <boxGeometry args={[0.18, 0.42, 0.58]} />
        <meshStandardMaterial color="#ffbad1" roughness={0.78} flatShading />
      </mesh>
      <mesh castShadow position={[0.68, 0.42, 0]}>
        <boxGeometry args={[0.18, 0.42, 0.58]} />
        <meshStandardMaterial color="#ffbad1" roughness={0.78} flatShading />
      </mesh>
    </group>
  );
}

function Plant({ color }: { color: string }) {
  return (
    <group>
      <mesh castShadow receiveShadow position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.16, 0.2, 0.34, 8]} />
        <meshStandardMaterial color="#b8794f" roughness={0.82} flatShading />
      </mesh>
      {([[0, 0.58, 0], [0.14, 0.68, 0.04], [-0.14, 0.64, 0.03], [0.04, 0.76, -0.13], [-0.04, 0.72, 0.15]] as const).map(([x, y, z], index) => (
        <mesh key={index} castShadow position={[x, y, z]} rotation={[0.18 * index, 0.4 * index, 0.1]}>
          <boxGeometry args={[0.26, 0.18, 0.22]} />
          <meshStandardMaterial color={index % 2 ? color : '#69d88f'} roughness={0.8} flatShading />
        </mesh>
      ))}
    </group>
  );
}

function Printer({ color }: { color: string }) {
  return (
    <group>
      <mesh castShadow receiveShadow position={[0, 0.34, 0]}>
        <boxGeometry args={[0.74, 0.38, 0.48]} />
        <meshStandardMaterial color={color} roughness={0.76} flatShading />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.6, -0.04]}>
        <boxGeometry args={[0.58, 0.05, 0.38]} />
        <meshStandardMaterial color="#eef7ff" roughness={0.78} flatShading />
      </mesh>
      <mesh position={[0, 0.37, 0.26]}>
        <boxGeometry args={[0.48, 0.055, 0.035]} />
        <meshStandardMaterial color="#18324a" roughness={0.7} flatShading />
      </mesh>
      <mesh position={[0, 0.18, 0.32]}>
        <boxGeometry args={[0.42, 0.02, 0.28]} />
        <meshStandardMaterial color="#ffffff" roughness={0.78} flatShading />
      </mesh>
    </group>
  );
}

function Door({ color }: { color: string }) {
  return (
    <group>
      <mesh castShadow receiveShadow position={[0, 0.58, 0]} rotation={[0, -0.18, 0]}>
        <boxGeometry args={[0.12, 1.12, 0.74]} />
        <meshStandardMaterial color={color} roughness={0.76} flatShading />
      </mesh>
      <mesh castShadow position={[0.08, 0.58, 0.22]}>
        <sphereGeometry args={[0.045, 10, 8]} />
        <meshStandardMaterial color="#ffd76a" roughness={0.5} flatShading />
      </mesh>
    </group>
  );
}

export default function OfficeFurniture({ object, selected, highlighted, mode, onSelect, onMove, onResize }: OfficeFurnitureProps) {
  const [x, , z] = objectToScene(object);
  const color = object.color || '#d99058';
  const type = object.furnitureType || 'desk';
  const { onPointerDown } = useObjectDrag({ enabled: mode === 'edit', objectId: object.id, onMove, width: object.width, height: object.height });

  return (
    <group
      position={[x, 0, z]}
      rotation={[0, -(object.rotation * Math.PI) / 180, 0]}
      onClick={(event) => { event.stopPropagation(); onSelect(object.id); }}
      onPointerDown={onPointerDown}
    >
      <SelectionRing radius={type === 'meeting_table' ? 1.15 : 0.72} color={highlighted ? '#ffd76a' : '#2f8cff'} active={selected || highlighted} y={0.05} />
      {type === 'desk' && <OfficeDesk color={color} />}
      {type === 'chair' && <Chair color={color} />}
      {type === 'meeting_table' && <MeetingTable color={color} />}
      {type === 'sofa' && <Sofa color={color} />}
      {type === 'plant' && <Plant color={color} />}
      {type === 'printer' && <Printer color={color} />}
      {type === 'door' && <Door color={color} />}
      {selected && mode === 'edit' && <ObjectResizeHandle object={object} enabled onResize={onResize} />}
      {(selected || highlighted) && (
        <Html position={[0, 1.08, 0]} center distanceFactor={7} className="three-html-layer">
          <div className="object-chip">{object.label}</div>
        </Html>
      )}
    </group>
  );
}
