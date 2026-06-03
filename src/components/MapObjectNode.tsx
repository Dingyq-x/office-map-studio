import { Group, Rect, Text, Line, Circle } from 'react-konva';
import type { MapObject } from '../types/map';
interface Props { object: MapObject; selected: boolean; highlighted: boolean; draggable: boolean; onSelect: (id: string) => void; onDragEnd: (id: string, x: number, y: number) => void; }
const statusColor = { available: '#34a853', occupied: '#4285f4', reserved: '#f9ab00', disabled: '#9aa3af' };
function IsoBlock({ object, selected, highlighted }: { object: MapObject; selected: boolean; highlighted: boolean }) {
  const w = object.width, h = object.height, d = 18;
  const top = [w / 2, 0, w, h / 2, w / 2, h, 0, h / 2];
  return <>
    <Line points={[0, h / 2, w / 2, h, w / 2, h + d, 0, h / 2 + d]} closed fill="#b7c2cf" opacity={0.35} />
    <Line points={[w, h / 2, w / 2, h, w / 2, h + d, w, h / 2 + d]} closed fill="#8d99ae" opacity={0.28} />
    <Line points={top} closed fill={object.color || '#d7e9ff'} stroke={highlighted ? '#facc15' : selected ? '#1d9bf0' : '#7b8ca8'} strokeWidth={highlighted ? 5 : selected ? 4 : 1.5} shadowColor={highlighted ? '#facc15' : '#64748b'} shadowBlur={highlighted ? 16 : 6} shadowOpacity={0.22} />
    {(selected || highlighted) && <Line points={top} closed fill={selected ? '#38bdf8' : '#fde047'} opacity={0.16} />}
    <Text text={object.label} x={10} y={h / 2 - 10} width={w - 20} align="center" fontStyle={selected ? 'bold' : 'normal'} fontSize={15} fill="#1f2937" />
  </>;
}
function Furniture({ object, selected, highlighted }: { object: MapObject; selected: boolean; highlighted: boolean }) {
  const c = object.color || '#d99058', stroke = highlighted ? '#facc15' : selected ? '#1d9bf0' : '#475569';
  const w = object.width, h = object.height;
  if (object.furnitureType === 'plant') return <><Circle x={w/2-12} y={18} radius={18} fill="#31b46b" stroke={stroke}/><Circle x={w/2+10} y={18} radius={16} fill="#4ade80" stroke={stroke}/><Rect x={w/2-14} y={34} width={28} height={26} cornerRadius={6} fill="#b7794c" stroke={stroke}/><Text text={object.label} y={h+4} width={w} align="center" fontSize={11} fill="#334155" /></>;
  if (object.furnitureType === 'printer') return <><Rect x={6} y={16} width={w-12} height={h-22} cornerRadius={8} fill={c} stroke={stroke} strokeWidth={selected||highlighted ? 3 : 1.5}/><Rect x={14} y={6} width={w-28} height={18} fill="#eef2ff" stroke="#64748b"/><Line points={[18,34,w-18,34]} stroke="#263445" strokeWidth={3}/><Text text={object.label} y={h+4} width={w} align="center" fontSize={11} fill="#334155" /></>;
  if (object.furnitureType === 'door') return <><Rect x={12} y={4} width={w-24} height={h-8} fill={c} stroke={stroke} strokeWidth={selected||highlighted ? 3 : 1.5} skewX={-0.18}/><Circle x={w-24} y={h/2} radius={4} fill="#fde68a"/><Text text={object.label} y={h+4} width={w} align="center" fontSize={11} fill="#334155" /></>;
  if (object.furnitureType === 'sofa') return <><Rect x={6} y={18} width={w-12} height={h-20} cornerRadius={16} fill={c} stroke={stroke} strokeWidth={selected||highlighted ? 3 : 1.5}/><Rect x={14} y={8} width={w-28} height={24} cornerRadius={12} fill="#f5a6c2" stroke={stroke}/><Text text={object.label} y={h+4} width={w} align="center" fontSize={11} fill="#334155" /></>;
  return <><Line points={[w/2,0,w,h/2,w/2,h,0,h/2]} closed fill={c} stroke={stroke} strokeWidth={selected||highlighted ? 3 : 1.5}/><Line points={[0,h/2,w/2,h,w/2,h+10,0,h/2+10]} closed fill="#000" opacity={0.12}/><Text text={object.label} y={h+8} width={w} align="center" fontSize={11} fill="#334155" /></>;
}
function Seat({ object, selected, highlighted }: { object: MapObject; selected: boolean; highlighted: boolean }) {
  const c = object.color || statusColor[object.status || 'available']; const stroke = highlighted ? '#facc15' : selected ? '#1d9bf0' : '#274060';
  return <><Rect x={8} y={4} width={object.width-16} height={16} cornerRadius={6} fill="#c7d2fe" stroke={stroke}/><Rect x={6} y={18} width={object.width-12} height={object.height-20} cornerRadius={9} fill={c} stroke={stroke} strokeWidth={selected||highlighted ? 3 : 1.5}/>{(selected||highlighted) && <Circle x={object.width/2} y={object.height/2} radius={Math.max(object.width, object.height)/2} stroke={stroke} strokeWidth={3} opacity={0.85}/>}<Text text={object.employeeName || object.label} y={object.height+4} width={object.width+28} x={-14} align="center" fontStyle={selected ? 'bold' : 'normal'} fontSize={11} fill="#172033" /></>;
}
export default function MapObjectNode({ object, selected, highlighted, draggable, onSelect, onDragEnd }: Props) {
  return <Group x={object.x} y={object.y} rotation={object.rotation} draggable={draggable} onClick={(e) => { e.cancelBubble = true; onSelect(object.id); }} onTap={(e) => { e.cancelBubble = true; onSelect(object.id); }} onDragEnd={(event) => onDragEnd(object.id, Math.round(event.target.x()), Math.round(event.target.y()))}>
    {object.kind === 'space' ? <IsoBlock object={object} selected={selected} highlighted={highlighted}/> : object.kind === 'furniture' ? <Furniture object={object} selected={selected} highlighted={highlighted}/> : <Seat object={object} selected={selected} highlighted={highlighted}/>} 
  </Group>;
}
