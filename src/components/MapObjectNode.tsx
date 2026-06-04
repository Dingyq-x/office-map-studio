import type { MapMode, MapObject } from '../types/map';
import OfficeDecoration from '../three/OfficeDecoration';
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
  onResize?: (id: string, width: number, height: number) => void;
}

export default function MapObjectNode({ object, selected, highlighted, mode, onSelect, onDragEnd, onResize = () => undefined }: Props) {
  const common = { object, selected, highlighted, mode, onSelect, onMove: onDragEnd, onResize };
  if (object.kind === 'space') return <OfficeZone {...common} />;
  if (object.kind === 'seat') return <OfficeSeat {...common} />;
  if (object.kind === 'decoration') return <OfficeDecoration {...common} />;
  return <OfficeFurniture {...common} />;
}
