import type { MapObject } from '../types/map';

export const demoMapName = 'Demo Office';

export const demoMap: MapObject[] = [
  { id: 'space-front', kind: 'space', label: '前台', x: 120, y: 80, width: 180, height: 110, rotation: 0, color: '#f6d7b8', spaceType: 'front_desk', note: '访客接待与等候登记区' },
  { id: 'space-office', kind: 'space', label: '开放办公区', x: 330, y: 90, width: 420, height: 310, rotation: 0, color: '#d7e9ff', spaceType: 'office', note: '研发、产品、设计团队主办公区' },
  { id: 'space-meeting-a', kind: 'space', label: '会议室 A', x: 780, y: 110, width: 230, height: 160, rotation: 0, color: '#e3d9ff', spaceType: 'meeting_room', note: '8 人会议室，配投屏设备' },
  { id: 'space-pantry', kind: 'space', label: '茶水间', x: 150, y: 300, width: 190, height: 140, rotation: 0, color: '#d9f3df', spaceType: 'pantry', note: '咖啡、冰箱与简餐区' },
  { id: 'space-lounge', kind: 'space', label: '休息区', x: 780, y: 315, width: 250, height: 155, rotation: 0, color: '#ffe1eb', spaceType: 'lounge', note: '轻松交流与短暂休息' },
  { id: 'seat-101', kind: 'seat', label: 'S-101', x: 390, y: 170, width: 58, height: 48, rotation: 0, seatType: 'normal', status: 'occupied', employeeName: '王小明', department: '产品部', color: '#4285f4' },
  { id: 'seat-102', kind: 'seat', label: 'S-102', x: 470, y: 170, width: 58, height: 48, rotation: 0, seatType: 'normal', status: 'occupied', employeeName: '李安娜', department: '研发部', color: '#4285f4' },
  { id: 'seat-103', kind: 'seat', label: 'S-103', x: 550, y: 170, width: 58, height: 48, rotation: 0, seatType: 'manager', status: 'occupied', employeeName: '陈经理', department: '研发部', color: '#4285f4' },
  { id: 'seat-104', kind: 'seat', label: 'S-104', x: 630, y: 170, width: 58, height: 48, rotation: 0, seatType: 'normal', status: 'occupied', employeeName: '赵一一', department: '设计部', color: '#4285f4' },
  { id: 'seat-105', kind: 'seat', label: 'S-105', x: 390, y: 250, width: 58, height: 48, rotation: 0, seatType: 'normal', status: 'occupied', employeeName: '刘运营', department: '运营部', color: '#4285f4' },
  { id: 'seat-106', kind: 'seat', label: 'S-106', x: 470, y: 250, width: 58, height: 48, rotation: 0, seatType: 'normal', status: 'occupied', employeeName: '周人事', department: '人事部', color: '#4285f4' },
  { id: 'seat-107', kind: 'seat', label: 'S-107', x: 550, y: 250, width: 58, height: 48, rotation: 0, seatType: 'empty', status: 'available', department: '研发部', color: '#34a853' },
  { id: 'seat-108', kind: 'seat', label: 'S-108', x: 630, y: 250, width: 58, height: 48, rotation: 0, seatType: 'empty', status: 'available', department: '产品部', color: '#34a853' },
  { id: 'seat-109', kind: 'seat', label: 'S-109', x: 390, y: 330, width: 58, height: 48, rotation: 0, seatType: 'reserved', status: 'reserved', department: '设计部', color: '#f9ab00' },
  { id: 'seat-110', kind: 'seat', label: 'S-110', x: 470, y: 330, width: 58, height: 48, rotation: 0, seatType: 'reserved', status: 'reserved', department: '运营部', color: '#f9ab00' },
  { id: 'seat-111', kind: 'seat', label: 'S-111', x: 550, y: 330, width: 58, height: 48, rotation: 0, seatType: 'normal', status: 'disabled', department: '研发部', color: '#9aa3af' },
  { id: 'seat-112', kind: 'seat', label: 'S-112', x: 630, y: 330, width: 58, height: 48, rotation: 0, seatType: 'normal', status: 'disabled', department: '产品部', color: '#9aa3af' },
  { id: 'furn-front-desk', kind: 'furniture', label: '接待台', x: 165, y: 115, width: 95, height: 48, rotation: 0, color: '#d99058', furnitureType: 'desk' },
  { id: 'furn-door', kind: 'furniture', label: '入口门', x: 70, y: 115, width: 70, height: 84, rotation: -12, color: '#8d6e63', furnitureType: 'door' },
  { id: 'furn-meeting-table', kind: 'furniture', label: '会议桌', x: 835, y: 160, width: 145, height: 70, rotation: 0, color: '#b980f0', furnitureType: 'meeting_table' },
  { id: 'furn-sofa', kind: 'furniture', label: '粉色沙发', x: 840, y: 355, width: 130, height: 70, rotation: 0, color: '#ef7fa8', furnitureType: 'sofa' },
  { id: 'furn-plant-1', kind: 'furniture', label: '绿植 1', x: 735, y: 95, width: 52, height: 64, rotation: 0, color: '#2fb66d', furnitureType: 'plant' },
  { id: 'furn-plant-2', kind: 'furniture', label: '绿植 2', x: 735, y: 365, width: 52, height: 64, rotation: 0, color: '#2fb66d', furnitureType: 'plant' },
  { id: 'furn-printer', kind: 'furniture', label: '打印机', x: 690, y: 315, width: 70, height: 55, rotation: 0, color: '#7f8ea3', furnitureType: 'printer' },
  { id: 'furn-pantry-table', kind: 'furniture', label: '茶水桌', x: 205, y: 345, width: 110, height: 56, rotation: 0, color: '#6ec6a4', furnitureType: 'desk' },
];
