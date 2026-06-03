import type { AssetTemplate, MapMode, MapObject } from '../types/map';
const groups: { title: string; assets: AssetTemplate[] }[] = [
  { title: '空间', assets: [
    { id: 'front_desk', name: '前台', description: '访客接待入口', kind: 'space', defaults: { label: '新前台', width: 180, height: 110, color: '#f6d7b8', spaceType: 'front_desk', rotation: 0 } },
    { id: 'office', name: '开放办公区', description: '团队工位区域', kind: 'space', defaults: { label: '新办公区', width: 280, height: 200, color: '#d7e9ff', spaceType: 'office', rotation: 0 } },
    { id: 'meeting_room', name: '会议室', description: '协作会议空间', kind: 'space', defaults: { label: '新会议室', width: 220, height: 150, color: '#e3d9ff', spaceType: 'meeting_room', rotation: 0 } },
    { id: 'pantry', name: '茶水间', description: '咖啡简餐补给', kind: 'space', defaults: { label: '新茶水间', width: 180, height: 130, color: '#d9f3df', spaceType: 'pantry', rotation: 0 } },
    { id: 'warehouse', name: '仓储区', description: '物料收纳空间', kind: 'space', defaults: { label: '新仓储区', width: 170, height: 130, color: '#ece6d8', spaceType: 'warehouse', rotation: 0 } },
    { id: 'lounge', name: '休息区', description: '交流休闲角落', kind: 'space', defaults: { label: '新休息区', width: 220, height: 140, color: '#ffe1eb', spaceType: 'lounge', rotation: 0 } },
  ] },
  { title: '家具', assets: [
    { id: 'desk', name: '办公桌', description: '单人工作桌', kind: 'furniture', defaults: { label: '办公桌', width: 90, height: 52, color: '#d99058', furnitureType: 'desk', rotation: 0 } },
    { id: 'chair', name: '椅子', description: '小型座椅', kind: 'furniture', defaults: { label: '椅子', width: 42, height: 42, color: '#5f8dd3', furnitureType: 'chair', rotation: 0 } },
    { id: 'meeting_table', name: '会议桌', description: '长条等距桌', kind: 'furniture', defaults: { label: '会议桌', width: 140, height: 68, color: '#b980f0', furnitureType: 'meeting_table', rotation: 0 } },
    { id: 'sofa', name: '沙发', description: '圆角休闲坐具', kind: 'furniture', defaults: { label: '沙发', width: 120, height: 66, color: '#ef7fa8', furnitureType: 'sofa', rotation: 0 } },
    { id: 'plant', name: '绿植', description: '叶片与花盆', kind: 'furniture', defaults: { label: '绿植', width: 52, height: 64, color: '#2fb66d', furnitureType: 'plant', rotation: 0 } },
    { id: 'printer', name: '打印机', description: '机身与出纸口', kind: 'furniture', defaults: { label: '打印机', width: 70, height: 55, color: '#7f8ea3', furnitureType: 'printer', rotation: 0 } },
    { id: 'door', name: '门', description: '倾斜入口门', kind: 'furniture', defaults: { label: '门', width: 70, height: 84, color: '#8d6e63', furnitureType: 'door', rotation: -12 } },
  ] },
  { title: '座位', assets: [
    { id: 'normal', name: '普通座位', description: '可分配工位', kind: 'seat', defaults: { label: 'S-NEW', width: 58, height: 48, color: '#34a853', seatType: 'normal', status: 'available', rotation: 0 } },
    { id: 'manager', name: '主管座位', description: '主管/负责人', kind: 'seat', defaults: { label: 'M-NEW', width: 64, height: 52, color: '#4285f4', seatType: 'manager', status: 'occupied', rotation: 0 } },
    { id: 'empty', name: '空闲座位', description: '绿色可用', kind: 'seat', defaults: { label: 'S-EMPTY', width: 58, height: 48, color: '#34a853', seatType: 'empty', status: 'available', rotation: 0 } },
    { id: 'reserved', name: '预留座位', description: '橙色预留', kind: 'seat', defaults: { label: 'S-RSV', width: 58, height: 48, color: '#f9ab00', seatType: 'reserved', status: 'reserved', rotation: 0 } },
  ] },
];
interface Props { mode: MapMode; onAdd: (asset: AssetTemplate) => void; }
export default function AssetPalette({ mode, onAdd }: Props) {
  const disabled = mode !== 'edit';
  return <aside className="asset-palette"><h2>素材库</h2><p>{disabled ? '切换到编辑模式后可新增对象' : '点击卡片添加到画布中央'}</p>{groups.map((group) => <section key={group.title}><h3>{group.title}</h3>{group.assets.map((asset) => <button className="asset-card" disabled={disabled} key={asset.id} onClick={() => onAdd(asset)}><span className={`asset-icon ${asset.kind}`}></span><strong>{asset.name}</strong><small>{asset.description}</small></button>)}</section>)}</aside>;
}
