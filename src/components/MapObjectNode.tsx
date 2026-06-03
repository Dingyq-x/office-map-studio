import type { MapMode, MapObject } from '../types/map';
import OfficeFurniture from '../three/OfficeFurniture';
import OfficeSeat from '../three/OfficeSeat';
import OfficeZone from '../three/OfficeZone';

interface Props {
  object: MapObject;
  selected: boolean;
  highlighted: boolean;
  mode: MapMode;
  onSelect: (id: string) => void;
  onDragEnd: (id: string, x: number, y: number) => void;
}

export default function MapObjectNode({ object, selected, highlighted, mode, onSelect, onDragEnd }: Props) {
  const common = { object, selected, highlighted, mode, onSelect, onMove: onDragEnd };
  if (object.kind === 'space') return <OfficeZone {...common} />;
  if (object.kind === 'seat') return <OfficeSeat {...common} />;
  return <OfficeFurniture {...common} />;
}
