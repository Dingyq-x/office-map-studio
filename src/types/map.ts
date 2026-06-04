export type ObjectKind = 'space' | 'furniture' | 'seat' | 'decoration';
export type MapMode = 'view' | 'edit';
export type SpaceType = 'office' | 'meeting_room' | 'front_desk' | 'pantry' | 'warehouse' | 'lounge';
export type FurnitureType = 'desk' | 'chair' | 'meeting_table' | 'sofa' | 'plant' | 'printer' | 'door';
export type DecorationType = 'rug' | 'lamp' | 'screen' | 'locker' | 'crate' | 'waypoint';
export type SeatType = 'normal' | 'manager' | 'empty' | 'reserved';
export type SeatStatus = 'available' | 'occupied' | 'reserved' | 'disabled';
export type WorkStatus = 'working' | 'idle' | 'meeting' | 'away' | 'focus' | 'offline';

export interface MapObject {
  id: string;
  kind: ObjectKind;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  color?: string;
  spaceType?: SpaceType;
  furnitureType?: FurnitureType;
  decorationType?: DecorationType;
  seatType?: SeatType;
  employeeName?: string;
  department?: string;
  status?: SeatStatus;
  workStatus?: WorkStatus;
  note?: string;
}

export interface OfficeMapConfig {
  id: string;
  name: string;
  width: number;
  depth: number;
  tileSize: number;
  floorColor: string;
  edgeColor: string;
  showGrid: boolean;
  showBoundary: boolean;
}

export interface AssetTemplate {
  id: string;
  name: string;
  description: string;
  kind: ObjectKind;
  defaults: Omit<Partial<MapObject>, 'id' | 'kind' | 'x' | 'y'>;
}
