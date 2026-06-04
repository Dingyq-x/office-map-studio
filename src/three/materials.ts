import * as THREE from 'three';
import type { SeatStatus, WorkStatus } from '../types/map';

export const palette = {
  sky: '#bfe7ff',
  mint: '#8ce9c1',
  peach: '#ffc68a',
  lavender: '#c9b7ff',
  honey: '#ffd76a',
  primary: '#2f8cff',
  text: '#18324a',
  wall: '#d9eafe',
  wallEdge: '#b8cce3',
};

export const statusColor: Record<SeatStatus, string> = {
  available: '#37c77f',
  occupied: '#4c9bff',
  reserved: '#ffae42',
  disabled: '#aab4c2',
};

export const workStatusColor: Record<WorkStatus, string> = {
  working: '#2f8cff',
  idle: '#69d88f',
  meeting: '#9b7cff',
  away: '#ffae42',
  focus: '#ffd76a',
  offline: '#aab4c2',
};

export const workStatusLabel: Record<WorkStatus, string> = {
  working: '工作中',
  idle: '空闲',
  meeting: '会议中',
  away: '离开',
  focus: '专注',
  offline: '离线',
};

export function softMaterial(color: string, opacity = 1) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.72,
    metalness: 0.02,
    flatShading: true,
    transparent: opacity < 1,
    opacity,
  });
}

export function darker(color: string, amount = 0.18) {
  return new THREE.Color(color).lerp(new THREE.Color('#18324a'), amount).getStyle();
}
