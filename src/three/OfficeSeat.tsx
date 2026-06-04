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

function MiniMonitor({ disabled }: { disabled: boolean }) {
  return (
    <group position={[0, 0.61, -0.12]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.34, 0.22, 0.035]} />
        <meshStandardMaterial color="#203b59" roughness={0.58} flatShading transparent={disabled} opacity={disabled ? 0.45 : 1} />
      </mesh>
      <mesh position={[0, -0.01, 0.022]}>
        <boxGeometry args={[0.27, 0.15, 0.012]} />
        <meshStandardMaterial color="#8fe1ff" emissive="#5ab8ff" emissiveIntensity={0.18} roughness={0.35} flatShading transparent={disabled} opacity={disabled ? 0.38 : 1} />
      </mesh>
      <mesh position={[0, -0.17, 0.01]} castShadow>
        <boxGeometry args={[0.05, 0.16, 0.04]} />
        <meshStandardMaterial color="#203b59" roughness={0.65} flatShading transparent={disabled} opacity={disabled ? 0.45 : 1} />
      </mesh>
      <mesh position={[0, -0.27, 0.03]} castShadow receiveShadow>
        <boxGeometry args={[0.24, 0.035, 0.12]} />
        <meshStandardMaterial color="#203b59" roughness={0.65} flatShading transparent={disabled} opacity={disabled ? 0.45 : 1} />
      </mesh>
    </group>
  );
}

export default function OfficeSeat({ object, selected, highlighted, mode, onSelect, onMove }: OfficeSeatProps) {
  const [x, , z] = objectToScene(object);
  const status = object.status || 'available';
  const color = object.color || statusColor[status];
  const disabled = status === 'disabled';
  const active = selected || highlighted;
  const { onPointerDown } = useObjectDrag({ enabled: mode === 'edit', objectId: object.id, onMove, width: object.width, height: object.height });

  return (
    <group
      position={[x, 0, z]}
      rotation={[0, -(object.rotation * Math.PI) / 180, 0]}
      onClick={(event) => { event.stopPropagation(); onSelect(object.id); }}
      onPointerDown={onPointerDown}
    >
      <group>
        <SelectionRing radius={0.62} color={highlighted ? '#ffd76a' : '#2f8cff'} active={active} y={0.05} />
        <OfficeDesk color="#f3bd78" scale={0.78} />
        <MiniMonitor disabled={disabled} />
        <mesh castShadow receiveShadow position={[0, 0.22, 0.48]}>
          <boxGeometry args={[0.46, 0.14, 0.4]} />
          <meshStandardMaterial color={color} roughness={0.72} flatShading transparent={disabled} opacity={disabled ? 0.48 : 1} />
        </mesh>
        <mesh castShadow receiveShadow position={[0, 0.48, 0.62]}>
          <boxGeometry args={[0.46, 0.36, 0.1]} />
          <meshStandardMaterial color={color} roughness={0.72} flatShading transparent={disabled} opacity={disabled ? 0.48 : 1} />
        </mesh>
        <mesh castShadow position={[0.41, 0.18, -0.24]}>
          <sphereGeometry args={[0.075, 12, 8]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.18} roughness={0.6} flatShading transparent={disabled} opacity={disabled ? 0.48 : 1} />
        </mesh>
        {status === 'occupied' && <OfficeAgent workStatus={object.workStatus} selected={selected} highlighted={highlighted} />}
        {status !== 'occupied' && <StatusBubble label={seatText[status]} color={color} position={[0.38, 1.05, 0]} visible={active || status === 'reserved'} />}
        <Html position={[0, 0.1, 0.88]} center distanceFactor={7} className="three-html-layer">
          <div className={`seat-label ${active ? 'active' : ''}`}><strong>{object.label}</strong>{active && <span>{object.employeeName || seatText[status]}</span>}</div>
        </Html>
      </group>
    </group>
  );
}
