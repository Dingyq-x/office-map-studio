import type { AssetTemplate, MapMode } from '../types/map';

const groups: { title: string; hint: string; assets: AssetTemplate[] }[] = [
  {
    title: '空间组件',
    hint: '像搭建一座微缩办公室一样摆放功能区',
    assets: [
      { id: 'front_desk', name: '前台', description: '入口接待与门禁', kind: 'space', defaults: { label: '新前台', width: 190, height: 120, color: '#ffd8ad', spaceType: 'front_desk', rotation: 0 } },
      { id: 'office', name: '开放办公区', description: '团队工作岛', kind: 'space', defaults: { label: '新办公区', width: 300, height: 220, color: '#cfe8ff', spaceType: 'office', rotation: 0 } },
      { id: 'meeting_room', name: '会议室', description: '协作同步室', kind: 'space', defaults: { label: '新会议室', width: 230, height: 158, color: '#ded0ff', spaceType: 'meeting_room', rotation: 0 } },
      { id: 'pantry', name: '茶水间', description: '补给与咖啡', kind: 'space', defaults: { label: '新茶水间', width: 190, height: 140, color: '#c8f4d8', spaceType: 'pantry', rotation: 0 } },
      { id: 'warehouse', name: '仓储区', description: '设备和物料', kind: 'space', defaults: { label: '新仓储区', width: 180, height: 130, color: '#efe4d5', spaceType: 'warehouse', rotation: 0 } },
      { id: 'lounge', name: '休息区', description: '轻松交流角', kind: 'space', defaults: { label: '新休息区', width: 230, height: 150, color: '#ffd1e2', spaceType: 'lounge', rotation: 0 } },
    ],
  },
  {
    title: '玩具家具',
    hint: '全部由 Three.js 几何体组合，无外部图片素材',
    assets: [
      { id: 'desk', name: '办公桌', description: '带桌面厚度', kind: 'furniture', defaults: { label: '办公桌', width: 96, height: 56, color: '#d99058', furnitureType: 'desk', rotation: 0 } },
      { id: 'chair', name: '椅子', description: '靠背与坐垫', kind: 'furniture', defaults: { label: '椅子', width: 48, height: 48, color: '#75a9ff', furnitureType: 'chair', rotation: 0 } },
      { id: 'meeting_table', name: '会议桌', description: '长桌和小椅子', kind: 'furniture', defaults: { label: '会议桌', width: 150, height: 74, color: '#aa7cf6', furnitureType: 'meeting_table', rotation: 0 } },
      { id: 'sofa', name: '沙发', description: '柔软休闲坐具', kind: 'furniture', defaults: { label: '沙发', width: 130, height: 72, color: '#ef7fa8', furnitureType: 'sofa', rotation: 0 } },
      { id: 'plant', name: '绿植', description: '圆叶与花盆', kind: 'furniture', defaults: { label: '绿植', width: 58, height: 70, color: '#35c878', furnitureType: 'plant', rotation: 0 } },
      { id: 'printer', name: '打印机', description: '机身和纸张', kind: 'furniture', defaults: { label: '打印机', width: 76, height: 58, color: '#7f8ea3', furnitureType: 'printer', rotation: 0 } },
      { id: 'door', name: '门', description: '入口标识', kind: 'furniture', defaults: { label: '门', width: 78, height: 92, color: '#a97755', furnitureType: 'door', rotation: -12 } },
    ],
  },
  {
    title: '员工工位',
    hint: '带人员存在感、座位状态和工作状态',
    assets: [
      { id: 'normal', name: '普通工位', description: '可分配座位', kind: 'seat', defaults: { label: 'S-NEW', width: 70, height: 58, color: '#37c77f', seatType: 'normal', status: 'available', workStatus: 'offline', rotation: 0 } },
      { id: 'manager', name: '主管工位', description: '默认工作中', kind: 'seat', defaults: { label: 'M-NEW', width: 74, height: 60, color: '#4c9bff', seatType: 'manager', status: 'occupied', workStatus: 'working', rotation: 0 } },
      { id: 'empty', name: '空闲工位', description: '绿色可用', kind: 'seat', defaults: { label: 'S-EMPTY', width: 70, height: 58, color: '#37c77f', seatType: 'empty', status: 'available', workStatus: 'offline', rotation: 0 } },
      { id: 'reserved', name: '预留工位', description: '橙色预留', kind: 'seat', defaults: { label: 'S-RSV', width: 70, height: 58, color: '#ffae42', seatType: 'reserved', status: 'reserved', workStatus: 'offline', rotation: 0 } },
    ],
  },
];

interface Props {
  mode: MapMode;
  onAdd: (asset: AssetTemplate) => void;
}

export default function AssetPalette({ mode, onAdd }: Props) {
  const disabled = mode !== 'edit';
  return (
    <aside className="asset-palette">
      <div className="panel-kicker">Component Dock</div>
      <h2>办公室组件</h2>
      <p>{disabled ? '查看模式下组件只读，切换到编辑模式后可投放到地图。' : '点击组件卡片，将它投放到虚拟办公室中央。'}</p>
      {groups.map((group) => (
        <section key={group.title}>
          <h3>{group.title}</h3>
          <p className="group-hint">{group.hint}</p>
          {group.assets.map((asset) => (
            <button className={`asset-card ${asset.kind}`} disabled={disabled} key={asset.id} onClick={() => onAdd(asset)}>
              <span className={`asset-icon ${asset.kind}`}><i /></span>
              <strong>{asset.name}</strong>
              <small>{asset.description}</small>
              <em>{disabled ? '只读' : '投放'}</em>
            </button>
          ))}
        </section>
      ))}
    </aside>
  );
}
