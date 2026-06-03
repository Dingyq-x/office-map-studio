import { Html } from '@react-three/drei';
import type { MapMode, MapObject } from '../types/map';
import { objectToScene } from './coordinates';
import OfficeAgent from './OfficeAgent';
import OfficeDesk from './OfficeDesk';
import SelectionRing from './SelectionRing';
import StatusBubble from './StatusBubble';
import { statusColor } from './materials';
import { useObjectDrag } from './useObjectDrag';

interface OfficeSeatProps {
  object: MapObject;
  selected: boolean;
  highlighted: boolean;
  mode: MapMode;
  onSelect: (id: string) => void;
  onMove: (id: string, x: number, y: number) => void;
}

const seatText = { available: '空位', occupied: '在线', reserved: '预留', disabled: '维护' } as const;

export default function OfficeSeat({ object, selected, highlighted, mode, onSelect, onMove }: OfficeSeatProps) {
  const [x, , z] = objectToScene(object);
  const status = object.status || 'available';
  const color = object.color || statusColor[status];
  const disabled = status === 'disabled';
  const { onPointerDown } = useObjectDrag({ enabled: mode === 'edit', objectId: object.id, onMove, width: object.width, height: object.height });

  return (
    <group
      position={[x, 0, z]}
      rotation={[0, -(object.rotation * Math.PI) / 180, 0]}
      onClick={(event) => { event.stopPropagation(); onSelect(object.id); }}
      onPointerDown={onPointerDown}
    >
      <group opacity={disabled ? 0.48 : 1}>
        <SelectionRing radius={0.54} color={highlighted ? '#ffd76a' : '#2f8cff'} active={selected || highlighted} y={0.05} />
        <OfficeDesk color="#f3bd78" scale={0.72} />
        <mesh castShadow receiveShadow position={[0, 0.24, 0.45]}>
          <boxGeometry args={[0.42, 0.13, 0.38]} />
          <meshStandardMaterial color={color} roughness={0.72} flatShading />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 0.47, 0.58]}>
          <boxGeometry args={[0.42, 0.32, 0.1]} />
          <meshStandardMaterial color={color} roughness={0.72} flatShading />
        </mesh>
        <mesh castShadow position={[0.38, 0.18, -0.22]}>
          <sphereGeometry args={[0.07, 12, 8]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.18} roughness={0.6} flatShading />
        </mesh>
        {status === 'occupied' && <OfficeAgent workStatus={object.workStatus} selected={selected} highlighted={highlighted} />}
        {status !== 'occupied' && <StatusBubble label={seatText[status]} color={color} position={[0.36, 1.05, 0]} visible={selected || highlighted || status === 'reserved'} />}
        <Html position={[0, 0.08, 0.82]} center distanceFactor={7} className="three-html-layer">
          <div className="seat-label"><strong>{object.label}</strong><span>{object.employeeName || seatText[status]}</span></div>
        </Html>
      </group>
    </group>
  );
}
