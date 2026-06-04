import type { DecorationType, MapMode, MapObject, SeatStatus, WorkStatus } from '../types/map';
import EmptyInspector from './EmptyInspector';
import InspectorSection from './InspectorSection';

const kindLabel = { space: '空间', furniture: '家具', seat: '座位', decoration: '装饰' } as const;
const statusLabel: Record<SeatStatus, string> = { available: '空闲', occupied: '已占用', reserved: '预留', disabled: '不可用' };
const workStatusLabel: Record<WorkStatus, string> = { working: '工作中', idle: '空闲', meeting: '会议中', away: '离开', focus: '专注', offline: '离线' };
const spaceTypes = ['office', 'meeting_room', 'front_desk', 'pantry', 'warehouse', 'lounge'];
const furnitureTypes = ['desk', 'chair', 'meeting_table', 'sofa', 'plant', 'printer', 'door'];
const decorationTypes = ['rug', 'lamp', 'screen', 'locker', 'crate', 'waypoint'];
const seatTypes = ['normal', 'manager', 'empty', 'reserved'];
const statuses = ['available', 'occupied', 'reserved', 'disabled'];
const workStatuses = ['working', 'idle', 'meeting', 'away', 'focus', 'offline'];

interface Props {
  object?: MapObject;
  mode: MapMode;
  onChange: (id: string, patch: Partial<MapObject>) => void;
  onDelete: (id: string) => void;
}

function seatColor(status: string) {
  if (status === 'occupied') return '#4c9bff';
  if (status === 'available') return '#37c77f';
  if (status === 'reserved') return '#ffae42';
  return '#aab4c2';
}

function subtitle(object: MapObject) {
  if (object.kind === 'seat') return `${object.employeeName || '未绑定员工'} · ${object.department || '未设置部门'}`;
  if (object.kind === 'space') return `空间 · ${object.spaceType}`;
  if (object.kind === 'furniture') return `家具 · ${object.furnitureType}`;
  return `装饰 · ${object.decorationType}`;
}

export default function PropertyPanel({ object, mode, onChange, onDelete }: Props) {
  if (!object) return <aside className="property-panel"><EmptyInspector /></aside>;

  const disabled = mode === 'view';
  const update = (patch: Partial<MapObject>) => onChange(object.id, patch);
  const input = (key: keyof MapObject, type = 'text') => (
    <input
      type={type}
      disabled={disabled}
      value={String(object[key] ?? '')}
      onChange={(event) => update({ [key]: type === 'number' ? Number(event.target.value) : event.target.value } as Partial<MapObject>)}
    />
  );

  return (
    <aside className="property-panel">
      <div className="panel-kicker">Object Inspector</div>
      <div className={`inspector-head ${object.kind}`}>
        <span>{kindLabel[object.kind]}</span>
        <h2>{object.label}</h2>
        <p>{subtitle(object)}</p>
        <div className="inspector-badges">
          {object.status && <em>{statusLabel[object.status]}</em>}
          {object.workStatus && <em className="work-badge">{workStatusLabel[object.workStatus]}</em>}
          <em>{mode === 'edit' ? '可编辑' : '只读'}</em>
        </div>
      </div>

      <InspectorSection title="基础信息">
        <label>对象名称 / 座位号{input('label')}</label>
        <label>对象类型<input disabled value={object.kind} /></label>
        <label>主题颜色{input('color', 'color')}</label>
        <label>备注<textarea disabled={disabled} value={object.note ?? ''} onChange={(event) => update({ note: event.target.value })} /></label>
      </InspectorSection>

      <InspectorSection title="位置与尺寸">
        <div className="form-grid">
          <label>X{input('x', 'number')}</label>
          <label>Y{input('y', 'number')}</label>
          <label>宽{input('width', 'number')}</label>
          <label>高{input('height', 'number')}</label>
          <label>旋转{input('rotation', 'number')}</label>
        </div>
      </InspectorSection>

      <InspectorSection title="业务信息">
        {object.kind === 'space' && (
          <label>空间类型
            <select disabled={disabled} value={object.spaceType} onChange={(event) => update({ spaceType: event.target.value as MapObject['spaceType'] })}>
              {spaceTypes.map((type) => <option key={type}>{type}</option>)}
            </select>
          </label>
        )}
        {object.kind === 'furniture' && (
          <label>家具类型
            <select disabled={disabled} value={object.furnitureType} onChange={(event) => update({ furnitureType: event.target.value as MapObject['furnitureType'] })}>
              {furnitureTypes.map((type) => <option key={type}>{type}</option>)}
            </select>
          </label>
        )}
        {object.kind === 'decoration' && (
          <label>装饰类型
            <select disabled={disabled} value={object.decorationType} onChange={(event) => update({ decorationType: event.target.value as DecorationType })}>
              {decorationTypes.map((type) => <option key={type}>{type}</option>)}
            </select>
          </label>
        )}
        {object.kind === 'seat' && (
          <>
            <label>座位类型
              <select disabled={disabled} value={object.seatType} onChange={(event) => update({ seatType: event.target.value as MapObject['seatType'] })}>
                {seatTypes.map((type) => <option key={type}>{type}</option>)}
              </select>
            </label>
            <label>座位状态
              <select disabled={disabled} value={object.status} onChange={(event) => update({ status: event.target.value as MapObject['status'], color: seatColor(event.target.value) })}>
                {statuses.map((status) => <option key={status}>{status}</option>)}
              </select>
            </label>
            <label>工作状态
              <select disabled={disabled} value={object.workStatus || 'offline'} onChange={(event) => update({ workStatus: event.target.value as WorkStatus })}>
                {workStatuses.map((status) => <option key={status}>{status}</option>)}
              </select>
            </label>
            <label>员工姓名{input('employeeName')}</label>
            <label>部门{input('department')}</label>
          </>
        )}
      </InspectorSection>

      <InspectorSection title="危险操作">
        <button className="danger" disabled={disabled} onClick={() => onDelete(object.id)}>从办公室移除对象</button>
      </InspectorSection>
    </aside>
  );
}
