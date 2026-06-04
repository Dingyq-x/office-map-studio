import type { MapObject } from '../types/map';

export const demoMapName = 'Demo Office · Local Layout';

export const demoMap: MapObject[] = [
  { id: 'space-front', kind: 'space', label: '前台', x: 118, y: 96, width: 210, height: 126, rotation: 0, color: '#ffd8ad', spaceType: 'front_desk', note: '入口接待、访客登记和门禁引导' },
  { id: 'space-office', kind: 'space', label: '开放办公区', x: 330, y: 92, width: 462, height: 344, rotation: 0, color: '#cfe8ff', spaceType: 'office', note: '产品、研发、设计、运营团队的小世界工作区' },
  { id: 'space-meeting-a', kind: 'space', label: '会议室 A', x: 790, y: 118, width: 244, height: 170, rotation: 0, color: '#ded0ff', spaceType: 'meeting_room', note: '8 人会议室，适合评审、同步和远程会议' },
  { id: 'space-pantry', kind: 'space', label: '茶水间', x: 148, y: 332, width: 210, height: 150, rotation: 0, color: '#c8f4d8', spaceType: 'pantry', note: '咖啡、饮水机、零食和短暂停留区' },
  { id: 'space-lounge', kind: 'space', label: '休息区', x: 784, y: 334, width: 268, height: 164, rotation: 0, color: '#ffd1e2', spaceType: 'lounge', note: '柔软沙发、圆桌和轻松交流角' },

  { id: 'seat-101', kind: 'seat', label: 'S-101', x: 392, y: 170, width: 70, height: 58, rotation: 0, seatType: 'normal', status: 'occupied', workStatus: 'working', employeeName: '王小明', department: '产品部', color: '#4c9bff', note: '产品需求梳理中' },
  { id: 'seat-102', kind: 'seat', label: 'S-102', x: 482, y: 170, width: 70, height: 58, rotation: 0, seatType: 'normal', status: 'occupied', workStatus: 'focus', employeeName: '李安娜', department: '研发部', color: '#4c9bff', note: '专注编码时段' },
  { id: 'seat-103', kind: 'seat', label: 'S-103', x: 572, y: 170, width: 74, height: 60, rotation: 0, seatType: 'manager', status: 'occupied', workStatus: 'meeting', employeeName: '陈经理', department: '研发部', color: '#4c9bff', note: '会议中，请稍后打扰' },
  { id: 'seat-104', kind: 'seat', label: 'S-104', x: 662, y: 170, width: 70, height: 58, rotation: 0, seatType: 'normal', status: 'occupied', workStatus: 'idle', employeeName: '赵一一', department: '设计部', color: '#4c9bff', note: '设计走查待开始' },
  { id: 'seat-105', kind: 'seat', label: 'S-105', x: 392, y: 258, width: 70, height: 58, rotation: 0, seatType: 'normal', status: 'occupied', workStatus: 'away', employeeName: '刘运营', department: '运营部', color: '#4c9bff', note: '离开座位，稍后回来' },
  { id: 'seat-106', kind: 'seat', label: 'S-106', x: 482, y: 258, width: 70, height: 58, rotation: 0, seatType: 'normal', status: 'occupied', workStatus: 'working', employeeName: '周人事', department: '人事部', color: '#4c9bff', note: '入职流程处理中' },
  { id: 'seat-107', kind: 'seat', label: 'S-107', x: 572, y: 258, width: 70, height: 58, rotation: 0, seatType: 'empty', status: 'available', workStatus: 'offline', department: '研发部', color: '#37c77f', note: '可分配空位' },
  { id: 'seat-108', kind: 'seat', label: 'S-108', x: 662, y: 258, width: 70, height: 58, rotation: 0, seatType: 'empty', status: 'available', workStatus: 'offline', department: '产品部', color: '#37c77f', note: '可分配空位' },
  { id: 'seat-109', kind: 'seat', label: 'S-109', x: 392, y: 346, width: 70, height: 58, rotation: 0, seatType: 'reserved', status: 'reserved', workStatus: 'offline', department: '设计部', color: '#ffae42', note: '下周新同学预留' },
  { id: 'seat-110', kind: 'seat', label: 'S-110', x: 482, y: 346, width: 70, height: 58, rotation: 0, seatType: 'reserved', status: 'reserved', workStatus: 'offline', department: '运营部', color: '#ffae42', note: '临时项目席位' },
  { id: 'seat-111', kind: 'seat', label: 'S-111', x: 572, y: 346, width: 70, height: 58, rotation: 0, seatType: 'normal', status: 'disabled', workStatus: 'offline', department: '研发部', color: '#aab4c2', note: '设备维护中' },
  { id: 'seat-112', kind: 'seat', label: 'S-112', x: 662, y: 346, width: 70, height: 58, rotation: 0, seatType: 'normal', status: 'disabled', workStatus: 'offline', department: '产品部', color: '#aab4c2', note: '暂不可用' },

  { id: 'furn-front-desk', kind: 'furniture', label: '接待台', x: 176, y: 136, width: 112, height: 58, rotation: 0, color: '#d99058', furnitureType: 'desk', note: '访客接待台' },
  { id: 'furn-door', kind: 'furniture', label: '入口门', x: 72, y: 142, width: 78, height: 92, rotation: -12, color: '#a97755', furnitureType: 'door', note: '办公室入口' },
  { id: 'furn-meeting-table', kind: 'furniture', label: '会议桌', x: 842, y: 166, width: 154, height: 76, rotation: 0, color: '#aa7cf6', furnitureType: 'meeting_table', note: '含四把玩具椅' },
  { id: 'furn-sofa', kind: 'furniture', label: '云朵沙发', x: 838, y: 380, width: 142, height: 76, rotation: 0, color: '#ef7fa8', furnitureType: 'sofa', note: '休息区柔软沙发' },
  { id: 'furn-lounge-table', kind: 'furniture', label: '小茶几', x: 962, y: 390, width: 66, height: 46, rotation: 0, color: '#ffbf70', furnitureType: 'desk', note: '休闲圆角茶几' },
  { id: 'furn-pantry-table', kind: 'furniture', label: '咖啡台', x: 202, y: 380, width: 118, height: 58, rotation: 0, color: '#66c8a4', furnitureType: 'desk', note: '咖啡机和水杯台面' },
  { id: 'furn-pantry-printer', kind: 'furniture', label: '饮水机', x: 304, y: 354, width: 56, height: 64, rotation: 0, color: '#7fc7ff', furnitureType: 'printer', note: '用打印机组件表现饮水机体积' },
  { id: 'furn-plant-1', kind: 'furniture', label: '绿植 1', x: 746, y: 112, width: 58, height: 70, rotation: 0, color: '#35c878', furnitureType: 'plant', note: '开放区边界装饰' },
  { id: 'furn-plant-2', kind: 'furniture', label: '绿植 2', x: 742, y: 386, width: 58, height: 70, rotation: 0, color: '#35c878', furnitureType: 'plant', note: '休息区入口装饰' },
  { id: 'furn-printer', kind: 'furniture', label: '打印机', x: 704, y: 326, width: 76, height: 58, rotation: 0, color: '#7f8ea3', furnitureType: 'printer', note: '共享打印区' },
  { id: 'decor-lounge-rug', kind: 'decoration', label: '休息区地毯', x: 900, y: 414, width: 138, height: 82, rotation: 0, color: '#ffd76a', decorationType: 'rug', note: '休息区暖色地毯' },
  { id: 'decor-status-screen', kind: 'decoration', label: '团队状态屏', x: 704, y: 146, width: 88, height: 54, rotation: 0, color: '#8fe1ff', decorationType: 'screen', note: '开放区团队动态屏' },
  { id: 'decor-pantry-lamp', kind: 'decoration', label: '茶水间氛围灯', x: 116, y: 396, width: 44, height: 44, rotation: 0, color: '#fff3a8', decorationType: 'lamp', note: '柔和补光装饰' },
];
