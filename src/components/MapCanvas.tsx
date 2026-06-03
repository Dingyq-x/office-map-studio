import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Layer, Line, Rect, Stage, Text } from 'react-konva';
import type Konva from 'konva';
import type { MapMode, MapObject } from '../types/map';
import MapObjectNode from './MapObjectNode';
import CanvasStatusBar from './CanvasStatusBar';
interface Props { objects: MapObject[]; selectedObjectId?: string; highlightedObjectId?: string; focusedObjectId?: string; mode: MapMode; zoom: number; onSelect: (id?: string) => void; onObjectMove: (id: string, x: number, y: number) => void; }
export interface MapCanvasHandle { toDataURL: () => string; }
const stageSize = { width: 1120, height: 640 };
function gridLines() { const lines = []; for (let x=-700; x<1700; x+=40) { lines.push(<Line key={`a${x}`} points={[x,0,x+900,520]} stroke="#d8e2ef" strokeWidth={1}/>); lines.push(<Line key={`b${x}`} points={[x,520,x+900,0]} stroke="#d8e2ef" strokeWidth={1}/>); } return lines; }
const MapCanvas = forwardRef<MapCanvasHandle, Props>(function MapCanvas({ objects, selectedObjectId, highlightedObjectId, focusedObjectId, mode, zoom, onSelect, onObjectMove }, ref) {
  const stageRef = useRef<Konva.Stage>(null); const [offset, setOffset] = useState({ x: 0, y: 0 });
  useImperativeHandle(ref, () => ({ toDataURL: () => stageRef.current?.toDataURL({ pixelRatio: 2 }) || '' }));
  useEffect(() => { if (!focusedObjectId) return; const object = objects.find((item) => item.id === focusedObjectId); if (!object) return; setOffset({ x: stageSize.width / 2 - (object.x + object.width / 2) * zoom, y: stageSize.height / 2 - (object.y + object.height / 2) * zoom }); }, [focusedObjectId, objects, zoom]);
  const sorted = useMemo(() => [...objects].sort((a,b) => (a.kind === b.kind ? a.y - b.y : a.kind === 'space' ? -1 : b.kind === 'space' ? 1 : a.kind === 'furniture' ? -1 : 1)), [objects]);
  return <main className="canvas-shell"><div className="canvas-frame">
    <Stage width={stageSize.width} height={stageSize.height} ref={stageRef} onMouseDown={(event) => { if (event.target === event.target.getStage()) onSelect(undefined); }} onTap={(event) => { if (event.target === event.target.getStage()) onSelect(undefined); }}>
      <Layer><Rect x={0} y={0} width={stageSize.width} height={stageSize.height} fill="#f5f8fb" />{gridLines()}<Line points={[560,52,1030,320,560,588,90,320]} closed fill="#edf4e9" stroke="#b7c8d8" strokeWidth={2} shadowColor="#8aa1b6" shadowBlur={18} shadowOpacity={0.25}/><Text text="2.5D Isometric Office Floor" x={370} y={565} fill="#8aa1b6" fontSize={18} /></Layer>
      <Layer x={offset.x} y={offset.y} scaleX={zoom} scaleY={zoom}>{sorted.map((object) => <MapObjectNode key={object.id} object={object} selected={object.id === selectedObjectId} highlighted={object.id === highlightedObjectId} draggable={mode === 'edit'} onSelect={onSelect} onDragEnd={onObjectMove}/>)}</Layer>
    </Stage>
    <CanvasStatusBar mode={mode} zoom={zoom} count={objects.length} />
  </div></main>;
});
export default MapCanvas;
