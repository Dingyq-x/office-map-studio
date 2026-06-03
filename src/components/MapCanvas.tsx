import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Circle, Group, Layer, Line, Rect, Stage, Text } from 'react-konva';
import type Konva from 'konva';
import type { MapMode, MapObject } from '../types/map';
import CanvasStatusBar from './CanvasStatusBar';
import MapObjectNode from './MapObjectNode';

interface Props {
  objects: MapObject[];
  selectedObjectId?: string;
  highlightedObjectId?: string;
  focusedObjectId?: string;
  mode: MapMode;
  zoom: number;
  onSelect: (id?: string) => void;
  onObjectMove: (id: string, x: number, y: number) => void;
}

export interface MapCanvasHandle {
  toDataURL: () => string;
}

const stageSize = { width: 1120, height: 660 };
const floor = [560, 46, 1060, 330, 560, 614, 60, 330];

function IsoGrid() {
  const lines = [];
  for (let x = -760; x < 1800; x += 42) {
    lines.push(<Line key={`grid-r-${x}`} points={[x, 22, x + 980, 584]} stroke="#cbe0f3" strokeWidth={1} opacity={0.55} />);
    lines.push(<Line key={`grid-l-${x}`} points={[x, 584, x + 980, 22]} stroke="#cbe0f3" strokeWidth={1} opacity={0.55} />);
  }
  return <>{lines}</>;
}

function DecorativePaths() {
  return (
    <Group opacity={0.72} listening={false}>
      <Line points={[224, 322, 360, 245, 514, 332, 376, 410]} closed fill="#fff6e8" stroke="#f1d8b6" strokeWidth={1.5} />
      <Line points={[738, 326, 832, 274, 960, 348, 866, 402]} closed fill="#fff6e8" stroke="#f1d8b6" strokeWidth={1.5} />
      <Line points={[326, 468, 454, 396, 562, 458, 434, 530]} closed fill="#eafaf1" stroke="#bfe9d2" strokeWidth={1.4} />
      <Circle x={294} y={250} radius={4} fill="#9bd9ff" />
      <Circle x={780} y={456} radius={4} fill="#ffcbdf" />
      <Circle x={894} y={112} radius={4} fill="#d8c7ff" />
      <Text text="Virtual Office Sandbox" x={438} y={588} width={250} align="center" fontSize={16} fontStyle="bold" fill="#6c8298" />
    </Group>
  );
}

const MapCanvas = forwardRef<MapCanvasHandle, Props>(function MapCanvas(
  { objects, selectedObjectId, highlightedObjectId, focusedObjectId, mode, zoom, onSelect, onObjectMove },
  ref,
) {
  const stageRef = useRef<Konva.Stage>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useImperativeHandle(ref, () => ({
    toDataURL: () => stageRef.current?.toDataURL({ pixelRatio: 2 }) || '',
  }));

  useEffect(() => {
    if (!focusedObjectId) return;
    const object = objects.find((item) => item.id === focusedObjectId);
    if (!object) return;
    setOffset({
      x: stageSize.width / 2 - (object.x + object.width / 2) * zoom,
      y: stageSize.height / 2 - (object.y + object.height / 2) * zoom,
    });
  }, [focusedObjectId, objects, zoom]);

  const sorted = useMemo(
    () =>
      [...objects].sort((a, b) => {
        const layerWeight = { space: 0, furniture: 1, seat: 2 };
        const diff = layerWeight[a.kind] - layerWeight[b.kind];
        return diff === 0 ? a.y + a.height - (b.y + b.height) : diff;
      }),
    [objects],
  );

  return (
    <main className="canvas-shell">
      <div className="canvas-frame">
        <div className="canvas-title-card">
          <span className="live-dot" />
          <strong>Team World</strong>
          <em>{mode === 'edit' ? '编辑沙盘' : '观察模式'}</em>
        </div>
        <Stage
          width={stageSize.width}
          height={stageSize.height}
          ref={stageRef}
          onMouseDown={(event) => {
            if (event.target === event.target.getStage()) onSelect(undefined);
          }}
          onTap={(event) => {
            if (event.target === event.target.getStage()) onSelect(undefined);
          }}
        >
          <Layer>
            <Rect width={stageSize.width} height={stageSize.height} fillLinearGradientStartPoint={{ x: 0, y: 0 }} fillLinearGradientEndPoint={{ x: stageSize.width, y: stageSize.height }} fillLinearGradientColorStops={[0, '#eef7ff', 0.55, '#fff6e8', 1, '#eafaf1']} />
            <IsoGrid />
            <Line points={[560, 86, 1082, 382, 560, 646, 38, 382]} closed fill="#335b87" opacity={0.1} />
            <Line points={[60, 330, 560, 614, 560, 646, 38, 382]} closed fill="#aac0d5" opacity={0.34} />
            <Line points={[1060, 330, 560, 614, 560, 646, 1082, 382]} closed fill="#728da8" opacity={0.18} />
            <Line points={floor} closed fill="#edf8f3" stroke="#a9c8df" strokeWidth={2.4} shadowColor="#335b87" shadowBlur={28} shadowOpacity={0.18} />
            <Line points={[560, 96, 1010, 350, 560, 584, 110, 350]} closed fill="#f8fbff" opacity={0.42} stroke="#d9edf8" strokeWidth={1.5} />
            <DecorativePaths />
          </Layer>
          <Layer x={offset.x} y={offset.y} scaleX={zoom} scaleY={zoom}>
            {sorted.map((object) => (
              <MapObjectNode
                key={object.id}
                object={object}
                selected={object.id === selectedObjectId}
                highlighted={object.id === highlightedObjectId}
                draggable={mode === 'edit'}
                onSelect={onSelect}
                onDragEnd={onObjectMove}
              />
            ))}
          </Layer>
        </Stage>
        <CanvasStatusBar mode={mode} zoom={zoom} count={objects.length} />
      </div>
    </main>
  );
});

export default MapCanvas;
