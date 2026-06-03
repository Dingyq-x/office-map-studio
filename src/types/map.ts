export type ObjectKind = 'space' | 'furniture' | 'seat';
export type MapMode = 'view' | 'edit';
export type SpaceType = 'office' | 'meeting_room' | 'front_desk' | 'pantry' | 'warehouse' | 'lounge';
export type FurnitureType = 'desk' | 'chair' | 'meeting_table' | 'sofa' | 'plant' | 'printer' | 'door';
export type SeatType = 'normal' | 'manager' | 'empty' | 'reserved';
export type SeatStatus = 'available' | 'occupied' | 'reserved' | 'disabled';

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
  seatType?: SeatType;
  employeeName?: string;
  department?: string;
  status?: SeatStatus;
  note?: string;
}

export interface AssetTemplate {
  id: string;
  name: string;
  description: string;
  kind: ObjectKind;
  defaults: Omit<Partial<MapObject>, 'id' | 'kind' | 'x' | 'y'>;
}
