import type { PointerEvent } from 'react';
import type { MapObject, SeatStatus, WorkStatus } from '../types/map';

interface Props {
  object: MapObject;
  selected: boolean;
  highlighted: boolean;
  draggable: boolean;
  onSelect: (id: string) => void;
  onPointerStart: (event: PointerEvent<SVGGElement>, object: MapObject) => void;
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
const diamond = (w: number, h: number) => `${w / 2},0 ${w},${h / 2} ${w / 2},${h} 0,${h / 2}`;

function FloatingLabel({ text, x, y, width = 96 }: { text: string; x: number; y: number; width?: number }) {
  return (
    <g transform={`translate(${x} ${y})`} pointerEvents="none">
      <rect width={width} height="24" rx="12" fill="rgba(255,255,255,0.9)" stroke="rgba(169,200,223,0.72)" />
      <text x={width / 2} y="16" textAnchor="middle" fontSize="11" fontWeight="800" fill="#18324a">{text}</text>
    </g>
  );
}

function SelectionGlow({ w, h, selected, highlighted }: { w: number; h: number; selected: boolean; highlighted: boolean }) {
  if (!selected && !highlighted) return null;
  const color = highlighted ? '#ffd76a' : '#2f8cff';
  return (
    <>
      <polygon points={diamond(w + 22, h + 22)} transform="translate(-11 -11)" fill="none" stroke={color} strokeWidth={highlighted ? 5 : 4} strokeDasharray={highlighted ? '8 8' : undefined} filter="url(#selectionGlow)" />
      <polygon points={diamond(w, h)} fill={color} opacity="0.12" />
    </>
  );
}

function SpaceBlock({ object, selected, highlighted }: { object: MapObject; selected: boolean; highlighted: boolean }) {
  const color = object.color || '#cfe8ff';
  const stroke = highlighted ? '#ffd76a' : selected ? '#2f8cff' : '#8fb3d1';
  const w = object.width;
  const h = object.height;

  return (
    <>
      <polygon points={diamond(w, h)} fill="#335b87" opacity="0.08" transform="translate(8 12)" />
      <polygon points={diamond(w, h)} fill={color} stroke={stroke} strokeWidth={selected || highlighted ? 3 : 1.5} />
      <polygon points={`0,${h / 2} ${w / 2},${h} ${w / 2},${h + 16} 0,${h / 2 + 16}`} fill={darker(color)} opacity="0.34" />
      <polygon points={`${w},${h / 2} ${w / 2},${h} ${w / 2},${h + 16} ${w},${h / 2 + 16}`} fill="#335b87" opacity="0.12" />
      <SelectionGlow w={w} h={h} selected={selected} highlighted={highlighted} />
      <text x={w / 2} y={h / 2 + 4} textAnchor="middle" fontSize="13" fontWeight="900" fill="#18324a">{object.label}</text>
    </>
  );
}

function ToyDesk({ w, h, color, stroke }: { w: number; h: number; color: string; stroke: string }) {
  return (
    <>
      <polygon points={diamond(w, h * 0.7)} transform={`translate(0 ${h * 0.16})`} fill={color} stroke={stroke} strokeWidth="2" />
      <rect x={w * 0.2} y={h * 0.26} width={w * 0.6} height={h * 0.18} rx="8" fill="rgba(255,255,255,0.34)" />
      <circle cx={w * 0.76} cy={h * 0.58} r="7" fill="#69d88f" />
    </>
  );
}

function Chair({ w, h, color, stroke }: { w: number; h: number; color: string; stroke: string }) {
  return (
    <>
      <rect x={w * 0.2} y={h * 0.4} width={w * 0.6} height={h * 0.35} rx="10" fill={color} stroke={stroke} strokeWidth="2" />
      <rect x={w * 0.27} y={h * 0.2} width={w * 0.46} height={h * 0.28} rx="10" fill={darker(color)} stroke={stroke} strokeWidth="1.5" />
    </>
  );
}

function MeetingTable({ w, h, color, stroke }: { w: number; h: number; color: string; stroke: string }) {
  return (
    <>
      <rect x="10" y={h * 0.34} width={w - 20} height={h * 0.34} rx="18" fill={color} stroke={stroke} strokeWidth="2" />
      {[0.16, 0.84].map((x) => [0.18, 0.82].map((y) => <circle key={`${x}-${y}`} cx={w * x} cy={h * y} r="9" fill="#75a9ff" stroke={stroke} />))}
    </>
  );
}

function Furniture({ object, selected, highlighted }: { object: MapObject; selected: boolean; highlighted: boolean }) {
  const color = object.color || '#d99058';
  const stroke = highlighted ? '#ffd76a' : selected ? '#2f8cff' : 'rgba(39,64,96,0.72)';
  const w = object.width;
  const h = object.height;

  return (
    <>
      <rect x="4" y={h * 0.68} width={w - 8} height="16" rx="10" fill="#335b87" opacity="0.1" />
      {object.furnitureType === 'chair' && <Chair w={w} h={h} color={color} stroke={stroke} />}
      {object.furnitureType === 'meeting_table' && <MeetingTable w={w} h={h} color={color} stroke={stroke} />}
      {object.furnitureType === 'sofa' && <rect x="8" y={h * 0.24} width={w - 16} height={h * 0.52} rx="18" fill={color} stroke={stroke} strokeWidth="2" />}
      {object.furnitureType === 'plant' && <><rect x={w * 0.38} y={h * 0.56} width={w * 0.24} height={h * 0.28} rx="8" fill="#b8794f" /><circle cx={w / 2} cy={h * 0.38} r={Math.min(w, h) * 0.22} fill={color} stroke={stroke} /></>}
      {object.furnitureType === 'printer' && <><rect x={w * 0.16} y={h * 0.28} width={w * 0.68} height={h * 0.48} rx="9" fill={color} stroke={stroke} strokeWidth="2" /><rect x={w * 0.26} y={h * 0.18} width={w * 0.48} height={h * 0.16} rx="5" fill="#eef7ff" /></>}
      {object.furnitureType === 'door' && <rect x={w * 0.32} y={h * 0.08} width={w * 0.36} height={h * 0.76} rx="6" fill={color} stroke={stroke} strokeWidth="2" />}
      {(!object.furnitureType || object.furnitureType === 'desk') && <ToyDesk w={w} h={h} color={color} stroke={stroke} />}
      {(selected || highlighted) && <rect x="-8" y="-8" width={w + 16} height={h + 28} rx="18" fill="none" stroke={stroke} strokeWidth={highlighted ? 4 : 3} strokeDasharray={highlighted ? '7 6' : undefined} filter="url(#selectionGlow)" />}
      <FloatingLabel text={object.label} x={Math.max(-12, w / 2 - 48)} y={h + 10} />
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
  const displayName = status === 'occupied' ? object.employeeName || object.label : seatStatusLabel[status];

  return (
    <g opacity={status === 'disabled' ? 0.62 : 1}>
      <polygon points={diamond(w, h * 0.58)} transform="translate(0 6)" fill="#fff6e8" stroke={stroke} strokeWidth="1.8" />
      <rect x={w * 0.18} y={h * 0.48} width={w * 0.64} height={h * 0.34} rx="10" fill={base} stroke={stroke} strokeWidth="1.8" />
      <rect x={w * 0.25} y={h * 0.32} width={w * 0.5} height={h * 0.24} rx="10" fill={darker(base)} stroke={stroke} strokeWidth="1.4" />
      {status === 'occupied' && <><circle cx={w * 0.5} cy={h * 0.18} r="12" fill="#ffe1bd" stroke={stroke} /><rect x={w * 0.4} y={h * 0.02} width={w * 0.2} height="7" rx="4" fill="#6b4a3b" /></>}
      <circle cx={w - 7} cy="8" r="6" fill={workStatusColor[workStatus]} stroke="#ffffff" strokeWidth="2" />
      {status === 'occupied' && <FloatingLabel text={workStatusLabel[workStatus]} x={w - 10} y={-18} width={58} />}
      {(selected || highlighted) && <rect x="-8" y="-10" width={w + 16} height={h + 28} rx="20" fill="none" stroke={stroke} strokeWidth={highlighted ? 4 : 3} strokeDasharray={highlighted ? '7 6' : undefined} filter="url(#selectionGlow)" />}
      <text x={w / 2} y={h + 14} textAnchor="middle" fontSize="10" fontWeight="800" fill="#18324a">{object.label}</text>
      <text x={w / 2} y={h + 28} textAnchor="middle" fontSize="11" fill="#18324a">{displayName || object.label}</text>
    </g>
  );
}

export default function MapObjectNode({ object, selected, highlighted, draggable, onSelect, onPointerStart }: Props) {
  return (
    <g
      transform={`translate(${object.x} ${object.y}) rotate(${object.rotation})`}
      style={{ cursor: draggable ? 'grab' : 'pointer' }}
      onClick={(event) => { event.stopPropagation(); onSelect(object.id); }}
      onPointerDown={(event) => onPointerStart(event, object)}
    >
      {object.kind === 'space' && <SpaceBlock object={object} selected={selected} highlighted={highlighted} />}
      {object.kind === 'furniture' && <Furniture object={object} selected={selected} highlighted={highlighted} />}
      {object.kind === 'seat' && <Seat object={object} selected={selected} highlighted={highlighted} />}
    </g>
  );
}
