import { Circle, Group, Line, Rect, Text } from 'react-konva';
import type { MapObject, SeatStatus, WorkStatus } from '../types/map';

interface Props {
  object: MapObject;
  selected: boolean;
  highlighted: boolean;
  draggable: boolean;
  onSelect: (id: string) => void;
  onDragEnd: (id: string, x: number, y: number) => void;
}

const seatStatusColor: Record<SeatStatus, string> = {
  available: '#37c77f',
  occupied: '#4c9bff',
  reserved: '#ffae42',
  disabled: '#aab4c2',
};

const seatStatusLabel: Record<SeatStatus, string> = {
  available: '空闲',
  occupied: '已占用',
  reserved: '预留',
  disabled: '不可用',
};

const workStatusColor: Record<WorkStatus, string> = {
  working: '#2f8cff',
  idle: '#69d88f',
  meeting: '#9b7cff',
  away: '#ffae42',
  focus: '#ffd76a',
  offline: '#aab4c2',
};

const workStatusLabel: Record<WorkStatus, string> = {
  working: '工作中',
  idle: '空闲',
  meeting: '会议中',
  away: '离开',
  focus: '专注',
  offline: '离线',
};

const darker = (color: string) => `${color}cc`;
const diamond = (w: number, h: number) => [w / 2, 0, w, h / 2, w / 2, h, 0, h / 2];

function SelectionGlow({ w, h, selected, highlighted }: { w: number; h: number; selected: boolean; highlighted: boolean }) {
  if (!selected && !highlighted) return null;
  return (
    <>
      <Line
        points={diamond(w + 22, h + 22)}
        x={-11}
        y={-11}
        closed
        stroke={highlighted ? '#ffd76a' : '#2f8cff'}
        strokeWidth={highlighted ? 5 : 4}
        dash={highlighted ? [8, 8] : undefined}
        shadowColor={highlighted ? '#ffd76a' : '#2f8cff'}
        shadowBlur={highlighted ? 22 : 16}
        shadowOpacity={0.56}
      />
      <Line points={diamond(w, h)} closed fill={highlighted ? '#ffd76a' : '#2f8cff'} opacity={0.12} />
    </>
  );
}

function FloatingLabel({ text, x, y, width }: { text: string; x: number; y: number; width: number }) {
  return (
    <Group x={x} y={y} listening={false}>
      <Rect width={width} height={24} cornerRadius={12} fill="rgba(255,255,255,0.92)" stroke="rgba(104,147,203,0.32)" shadowColor="#335b87" shadowBlur={12} shadowOpacity={0.12} />
      <Text text={text} x={8} y={5} width={width - 16} align="center" fontSize={12} fontStyle="bold" fill="#18324a" />
    </Group>
  );
}

function SpaceBlock({ object, selected, highlighted }: { object: MapObject; selected: boolean; highlighted: boolean }) {
  const w = object.width;
  const h = object.height;
  const d = 22;
  const color = object.color || '#cfe8ff';
  const stroke = highlighted ? '#ffd76a' : selected ? '#2f8cff' : 'rgba(62, 98, 136, 0.42)';

  return (
    <>
      <Line points={[w / 2, h + d, w + 16, h / 2 + d + 10, w / 2, h + d + 34, -16, h / 2 + d + 10]} closed fill="#335b87" opacity={0.12} listening={false} />
      <Line points={[0, h / 2, w / 2, h, w / 2, h + d, 0, h / 2 + d]} closed fill={darker(color)} opacity={0.55} />
      <Line points={[w, h / 2, w / 2, h, w / 2, h + d, w, h / 2 + d]} closed fill="#92a7bd" opacity={0.28} />
      <Line points={diamond(w, h)} closed fill={color} stroke={stroke} strokeWidth={selected || highlighted ? 3 : 1.5} shadowColor={highlighted ? '#ffd76a' : '#335b87'} shadowBlur={highlighted ? 20 : 10} shadowOpacity={highlighted ? 0.42 : 0.14} />
      <Line points={[w * 0.2, h * 0.5, w * 0.5, h * 0.32, w * 0.8, h * 0.5, w * 0.5, h * 0.68]} closed fill="rgba(255,255,255,0.24)" stroke="rgba(255,255,255,0.38)" strokeWidth={1} />
      <SelectionGlow w={w} h={h} selected={selected} highlighted={highlighted} />
      <FloatingLabel text={object.label} x={w / 2 - 58} y={h / 2 - 44} width={116} />
    </>
  );
}

function ToyDesk({ w, h, color, stroke }: { w: number; h: number; color: string; stroke: string }) {
  return (
    <>
      <Line points={diamond(w, h)} closed fill={color} stroke={stroke} strokeWidth={2} shadowColor="#335b87" shadowBlur={10} shadowOpacity={0.16} />
      <Line points={[0, h / 2, w / 2, h, w / 2, h + 12, 0, h / 2 + 12]} closed fill={darker(color)} opacity={0.58} />
      <Line points={[w, h / 2, w / 2, h, w / 2, h + 12, w, h / 2 + 12]} closed fill="#8c6a52" opacity={0.24} />
      <Circle x={w * 0.34} y={h * 0.48} radius={4} fill="#fff6e8" />
      <Rect x={w * 0.58} y={h * 0.39} width={22} height={7} cornerRadius={4} fill="rgba(255,255,255,0.56)" rotation={18} />
    </>
  );
}

function Chair({ w, h, color, stroke }: { w: number; h: number; color: string; stroke: string }) {
  return (
    <>
      <Rect x={w * 0.22} y={h * 0.06} width={w * 0.56} height={h * 0.28} cornerRadius={9} fill={darker(color)} stroke={stroke} strokeWidth={2} />
      <Line points={[w * 0.18, h * 0.43, w * 0.5, h * 0.25, w * 0.82, h * 0.43, w * 0.5, h * 0.62]} closed fill={color} stroke={stroke} strokeWidth={2} shadowColor="#335b87" shadowBlur={8} shadowOpacity={0.15} />
      <Line points={[w * 0.5, h * 0.62, w * 0.82, h * 0.43, w * 0.82, h * 0.55, w * 0.5, h * 0.74]} closed fill={darker(color)} opacity={0.5} />
    </>
  );
}

function Plant({ w, h, color, stroke }: { w: number; h: number; color: string; stroke: string }) {
  return (
    <>
      <Circle x={w * 0.34} y={h * 0.22} radius={15} fill="#45d483" stroke={stroke} strokeWidth={1.5} />
      <Circle x={w * 0.55} y={h * 0.16} radius={17} fill={color} stroke={stroke} strokeWidth={1.5} />
      <Circle x={w * 0.68} y={h * 0.31} radius={14} fill="#7ce7a6" stroke={stroke} strokeWidth={1.5} />
      <Circle x={w * 0.43} y={h * 0.35} radius={12} fill="#2fb66d" stroke={stroke} strokeWidth={1.2} />
      <Line points={diamond(w * 0.48, h * 0.28)} x={w * 0.26} y={h * 0.48} closed fill="#c8895b" stroke={stroke} strokeWidth={1.5} />
      <Rect x={w * 0.32} y={h * 0.59} width={w * 0.36} height={h * 0.22} cornerRadius={6} fill="#a86f47" stroke={stroke} strokeWidth={1.5} />
    </>
  );
}

function Printer({ w, h, color, stroke }: { w: number; h: number; color: string; stroke: string }) {
  return (
    <>
      <Line points={diamond(w * 0.82, h * 0.42)} x={w * 0.09} y={h * 0.04} closed fill="#eef7ff" stroke={stroke} strokeWidth={1.5} />
      <Rect x={w * 0.1} y={h * 0.26} width={w * 0.8} height={h * 0.45} cornerRadius={10} fill={color} stroke={stroke} strokeWidth={2} />
      <Rect x={w * 0.2} y={h * 0.44} width={w * 0.6} height={8} cornerRadius={4} fill="#18324a" opacity={0.72} />
      <Rect x={w * 0.28} y={h * 0.58} width={w * 0.44} height={h * 0.22} cornerRadius={4} fill="#ffffff" stroke="#d6e7f8" />
      <Line points={[w * 0.34, h * 0.65, w * 0.66, h * 0.65]} stroke="#8aa4be" strokeWidth={1.2} />
    </>
  );
}

function Door({ w, h, color, stroke }: { w: number; h: number; color: string; stroke: string }) {
  return (
    <>
      <Rect x={w * 0.2} y={h * 0.04} width={w * 0.56} height={h * 0.86} cornerRadius={7} fill={color} stroke={stroke} strokeWidth={2} skewX={-0.16} shadowColor="#335b87" shadowBlur={10} shadowOpacity={0.15} />
      <Line points={[w * 0.25, h * 0.14, w * 0.62, h * 0.08, w * 0.62, h * 0.82, w * 0.25, h * 0.88]} closed stroke="rgba(255,255,255,0.38)" strokeWidth={1.4} />
      <Circle x={w * 0.62} y={h * 0.49} radius={4} fill="#ffd76a" stroke="#8c6a35" />
      <Text text="IN" x={w * 0.25} y={h * 0.96} width={w * 0.54} align="center" fontSize={10} fontStyle="bold" fill="#6c8298" />
    </>
  );
}

function MeetingTable({ w, h, color, stroke }: { w: number; h: number; color: string; stroke: string }) {
  return (
    <>
      <Chair w={32} h={32} color="#75a9ff" stroke={stroke} />
      <Group x={w - 34} y={0}><Chair w={32} h={32} color="#75a9ff" stroke={stroke} /></Group>
      <Group x={0} y={h - 20}><Chair w={32} h={32} color="#75a9ff" stroke={stroke} /></Group>
      <Group x={w - 34} y={h - 20}><Chair w={32} h={32} color="#75a9ff" stroke={stroke} /></Group>
      <Group x={8} y={8}><ToyDesk w={w - 16} h={h - 16} color={color} stroke={stroke} /></Group>
    </>
  );
}

function Sofa({ w, h, color, stroke }: { w: number; h: number; color: string; stroke: string }) {
  return (
    <>
      <Rect x={6} y={h * 0.34} width={w - 12} height={h * 0.46} cornerRadius={18} fill={color} stroke={stroke} strokeWidth={2} shadowColor="#335b87" shadowBlur={12} shadowOpacity={0.14} />
      <Rect x={16} y={h * 0.16} width={w - 32} height={h * 0.34} cornerRadius={18} fill="#ffa8c5" stroke={stroke} strokeWidth={1.6} />
      <Rect x={14} y={h * 0.43} width={w * 0.32} height={h * 0.28} cornerRadius={12} fill="rgba(255,255,255,0.22)" />
      <Rect x={w * 0.54} y={h * 0.43} width={w * 0.32} height={h * 0.28} cornerRadius={12} fill="rgba(255,255,255,0.22)" />
    </>
  );
}

function Furniture({ object, selected, highlighted }: { object: MapObject; selected: boolean; highlighted: boolean }) {
  const color = object.color || '#d99058';
  const stroke = highlighted ? '#ffd76a' : selected ? '#2f8cff' : 'rgba(39,64,96,0.72)';
  const w = object.width;
  const h = object.height;
  const strokeWidth = selected || highlighted ? 3 : 1.5;

  return (
    <>
      <Rect x={4} y={h * 0.68} width={w - 8} height={16} cornerRadius={10} fill="#335b87" opacity={0.1} listening={false} />
      {object.furnitureType === 'plant' && <Plant w={w} h={h} color={color} stroke={stroke} />}
      {object.furnitureType === 'printer' && <Printer w={w} h={h} color={color} stroke={stroke} />}
      {object.furnitureType === 'door' && <Door w={w} h={h} color={color} stroke={stroke} />}
      {object.furnitureType === 'sofa' && <Sofa w={w} h={h} color={color} stroke={stroke} />}
      {object.furnitureType === 'chair' && <Chair w={w} h={h} color={color} stroke={stroke} />}
      {object.furnitureType === 'meeting_table' && <MeetingTable w={w} h={h} color={color} stroke={stroke} />}
      {(!object.furnitureType || object.furnitureType === 'desk') && <ToyDesk w={w} h={h} color={color} stroke={stroke} />}
      {(selected || highlighted) && <Rect x={-8} y={-8} width={w + 16} height={h + 28} cornerRadius={18} stroke={stroke} strokeWidth={strokeWidth} dash={highlighted ? [7, 6] : undefined} shadowColor={stroke} shadowBlur={highlighted ? 20 : 12} shadowOpacity={0.32} />}
      <FloatingLabel text={object.label} x={Math.max(-12, w / 2 - 48)} y={h + 10} width={96} />
    </>
  );
}

function Seat({ object, selected, highlighted }: { object: MapObject; selected: boolean; highlighted: boolean }) {
  const status = object.status || 'available';
  const workStatus = object.workStatus || (status === 'occupied' ? 'working' : 'offline');
  const base = object.color || seatStatusColor[status];
  const stroke = highlighted ? '#ffd76a' : selected ? '#2f8cff' : 'rgba(39,64,96,0.78)';
  const w = object.width;
  const h = object.height;
  const disabled = status === 'disabled';
  const displayName = status === 'occupied' ? object.employeeName || object.label : seatStatusLabel[status];

  return (
    <Group opacity={disabled ? 0.62 : 1}>
      <Rect x={4} y={h - 5} width={w - 8} height={14} cornerRadius={10} fill="#335b87" opacity={0.12} listening={false} />
      <Line points={diamond(w, h * 0.58)} x={0} y={6} closed fill="#fff6e8" stroke={stroke} strokeWidth={1.8} shadowColor="#335b87" shadowBlur={10} shadowOpacity={0.14} />
      <Line points={[0, h * 0.35, w / 2, h * 0.64, w / 2, h * 0.76, 0, h * 0.47]} closed fill="#e8c497" opacity={0.7} />
      <Line points={[w, h * 0.35, w / 2, h * 0.64, w / 2, h * 0.76, w, h * 0.47]} closed fill="#c99d74" opacity={0.35} />
      <Rect x={w * 0.18} y={h * 0.48} width={w * 0.64} height={h * 0.34} cornerRadius={10} fill={base} stroke={stroke} strokeWidth={1.8} />
      <Rect x={w * 0.25} y={h * 0.32} width={w * 0.5} height={h * 0.24} cornerRadius={10} fill={darker(base)} stroke={stroke} strokeWidth={1.4} />
      {status === 'occupied' && (
        <>
          <Circle x={w * 0.5} y={h * 0.18} radius={12} fill="#ffe1bd" stroke={stroke} strokeWidth={1.4} />
          <Circle x={w * 0.44} y={h * 0.16} radius={2} fill="#18324a" />
          <Circle x={w * 0.56} y={h * 0.16} radius={2} fill="#18324a" />
          <Rect x={w * 0.4} y={h * 0.02} width={w * 0.2} height={7} cornerRadius={4} fill="#6b4a3b" />
        </>
      )}
      <Circle x={w - 7} y={8} radius={6} fill={workStatusColor[workStatus]} stroke="#ffffff" strokeWidth={2} shadowColor={workStatusColor[workStatus]} shadowBlur={8} shadowOpacity={0.5} />
      {status === 'occupied' && <FloatingLabel text={workStatusLabel[workStatus]} x={w - 10} y={-18} width={58} />}
      {(selected || highlighted) && <Rect x={-8} y={-10} width={w + 16} height={h + 28} cornerRadius={20} stroke={stroke} strokeWidth={highlighted ? 4 : 3} dash={highlighted ? [7, 6] : undefined} shadowColor={stroke} shadowBlur={highlighted ? 22 : 14} shadowOpacity={0.48} />}
      <Text text={object.label} x={-10} y={h + 4} width={w + 20} align="center" fontSize={10} fontStyle="bold" fill="#18324a" />
      <Text text={displayName || object.label} x={-24} y={h + 18} width={w + 48} align="center" fontSize={11} fontStyle={selected ? 'bold' : 'normal'} fill="#18324a" />
    </Group>
  );
}

export default function MapObjectNode({ object, selected, highlighted, draggable, onSelect, onDragEnd }: Props) {
  return (
    <Group
      x={object.x}
      y={object.y}
      rotation={object.rotation}
      draggable={draggable}
      onClick={(event) => {
        event.cancelBubble = true;
        onSelect(object.id);
      }}
      onTap={(event) => {
        event.cancelBubble = true;
        onSelect(object.id);
      }}
      onDragEnd={(event) => onDragEnd(object.id, Math.round(event.target.x()), Math.round(event.target.y()))}
    >
      {object.kind === 'space' && <SpaceBlock object={object} selected={selected} highlighted={highlighted} />}
      {object.kind === 'furniture' && <Furniture object={object} selected={selected} highlighted={highlighted} />}
      {object.kind === 'seat' && <Seat object={object} selected={selected} highlighted={highlighted} />}
    </Group>
  );
}
