import type { MapMode, MapObject, SeatStatus } from '../types/map';
import EmptyInspector from './EmptyInspector';
import InspectorSection from './InspectorSection';
const kindLabel = { space: '空间', furniture: '家具', seat: '座位' } as const;
const statusLabel: Record<SeatStatus, string> = { available: '空闲', occupied: '已占用', reserved: '预留', disabled: '不可用' };
const spaceTypes = ['office','meeting_room','front_desk','pantry','warehouse','lounge'];
const furnitureTypes = ['desk','chair','meeting_table','sofa','plant','printer','door'];
const seatTypes = ['normal','manager','empty','reserved'];
const statuses = ['available','occupied','reserved','disabled'];
interface Props { object?: MapObject; mode: MapMode; onChange: (id: string, patch: Partial<MapObject>) => void; onDelete: (id: string) => void; }
export default function PropertyPanel({ object, mode, onChange, onDelete }: Props) {
  if (!object) return <aside className="property-panel"><EmptyInspector /></aside>;
  const disabled = mode === 'view'; const update = (patch: Partial<MapObject>) => onChange(object.id, patch);
  const input = (key: keyof MapObject, type='text') => <input type={type} disabled={disabled} value={String(object[key] ?? '')} onChange={(e) => update({ [key]: type === 'number' ? Number(e.target.value) : e.target.value } as Partial<MapObject>)} />;
  return <aside className="property-panel"><div className="inspector-head"><span>{kindLabel[object.kind]}</span><h2>{object.label}</h2>{object.status && <em>{statusLabel[object.status]}</em>}</div>
    <InspectorSection title="基础信息"><label>Label{input('label')}</label><label>Kind<input disabled value={object.kind}/></label><label>Color{input('color','color')}</label><label>Note<textarea disabled={disabled} value={object.note ?? ''} onChange={(e) => update({ note: e.target.value })}/></label></InspectorSection>
    <InspectorSection title="位置与尺寸"><div className="form-grid"><label>X{input('x','number')}</label><label>Y{input('y','number')}</label><label>宽{input('width','number')}</label><label>高{input('height','number')}</label><label>旋转{input('rotation','number')}</label></div></InspectorSection>
    <InspectorSection title="业务信息">{object.kind === 'space' && <label>spaceType<select disabled={disabled} value={object.spaceType} onChange={(e) => update({ spaceType: e.target.value as MapObject['spaceType'] })}>{spaceTypes.map((t) => <option key={t}>{t}</option>)}</select></label>}{object.kind === 'furniture' && <label>furnitureType<select disabled={disabled} value={object.furnitureType} onChange={(e) => update({ furnitureType: e.target.value as MapObject['furnitureType'] })}>{furnitureTypes.map((t) => <option key={t}>{t}</option>)}</select></label>}{object.kind === 'seat' && <><label>seatType<select disabled={disabled} value={object.seatType} onChange={(e) => update({ seatType: e.target.value as MapObject['seatType'] })}>{seatTypes.map((t) => <option key={t}>{t}</option>)}</select></label><label>status<select disabled={disabled} value={object.status} onChange={(e) => update({ status: e.target.value as MapObject['status'], color: e.target.value === 'occupied' ? '#4285f4' : e.target.value === 'available' ? '#34a853' : e.target.value === 'reserved' ? '#f9ab00' : '#9aa3af' })}>{statuses.map((t) => <option key={t}>{t}</option>)}</select></label><label>employeeName{input('employeeName')}</label><label>department{input('department')}</label></>}</InspectorSection>
    <InspectorSection title="危险操作"><button className="danger" disabled={disabled} onClick={() => onDelete(object.id)}>删除对象</button></InspectorSection>
  </aside>;
}
