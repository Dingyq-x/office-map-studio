import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import type { PointerEvent } from 'react';
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
const floor = '560,46 1060,330 560,614 60,330';

type DragState = {
  id: string;
  startClientX: number;
  startClientY: number;
  startX: number;
  startY: number;
};

function IsoGrid() {
  const lines = [];
  for (let x = -760; x < 1800; x += 42) {
    lines.push(<line key={`grid-r-${x}`} x1={x} y1="22" x2={x + 980} y2="584" stroke="#cbe0f3" strokeWidth="1" opacity="0.55" />);
    lines.push(<line key={`grid-l-${x}`} x1={x} y1="584" x2={x + 980} y2="22" stroke="#cbe0f3" strokeWidth="1" opacity="0.55" />);
  }
  return <>{lines}</>;
}

function DecorativePaths() {
  return (
    <g opacity="0.72" pointerEvents="none">
      <polygon points="224,322 360,245 514,332 376,410" fill="#fff6e8" stroke="#f1d8b6" strokeWidth="1.5" />
      <polygon points="738,326 832,274 960,348 866,402" fill="#fff6e8" stroke="#f1d8b6" strokeWidth="1.5" />
      <polygon points="326,468 454,396 562,458 434,530" fill="#eafaf1" stroke="#bfe9d2" strokeWidth="1.4" />
      <circle cx="294" cy="250" r="4" fill="#9bd9ff" />
      <circle cx="780" cy="456" r="4" fill="#ffcbdf" />
      <circle cx="894" cy="112" r="4" fill="#d8c7ff" />
      <text x="560" y="604" textAnchor="middle" fontSize="16" fontWeight="900" fill="#6c8298">Virtual Office Sandbox</text>
    </g>
  );
}

function serializeSvg(svg: SVGSVGElement) {
  const clone = svg.cloneNode(true) as SVGSVGElement;
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  const source = new XMLSerializer().serializeToString(clone);
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(source)}`;
}

const MapCanvas = forwardRef<MapCanvasHandle, Props>(function MapCanvas(
  { objects, selectedObjectId, highlightedObjectId, focusedObjectId, mode, zoom, onSelect, onObjectMove },
  ref,
) {
  const svgRef = useRef<SVGSVGElement>(null);
  const dragRef = useRef<DragState | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useImperativeHandle(ref, () => ({
    toDataURL: () => (svgRef.current ? serializeSvg(svgRef.current) : ''),
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

  useEffect(() => {
    const handlePointerUp = (event: globalThis.PointerEvent) => {
      const drag = dragRef.current;
      if (!drag) return;
      dragRef.current = null;
      onObjectMove(
        drag.id,
        Math.round(drag.startX + (event.clientX - drag.startClientX) / zoom),
        Math.round(drag.startY + (event.clientY - drag.startClientY) / zoom),
      );
    };
    window.addEventListener('pointerup', handlePointerUp);
    return () => window.removeEventListener('pointerup', handlePointerUp);
  }, [onObjectMove, zoom]);

  const sorted = useMemo(
    () =>
      [...objects].sort((a, b) => {
        const layerWeight = { space: 0, furniture: 1, seat: 2 };
        const diff = layerWeight[a.kind] - layerWeight[b.kind];
        return diff === 0 ? a.y + a.height - (b.y + b.height) : diff;
      }),
    [objects],
  );

  const startDrag = (event: PointerEvent<SVGGElement>, object: MapObject) => {
    event.stopPropagation();
    onSelect(object.id);
    if (mode !== 'edit') return;
    dragRef.current = {
      id: object.id,
      startClientX: event.clientX,
      startClientY: event.clientY,
      startX: object.x,
      startY: object.y,
    };
  };

  return (
    <main className="canvas-shell">
      <div className="canvas-frame">
        <div className="canvas-title-card">
          <span className="live-dot" />
          <strong>Team World</strong>
          <em>{mode === 'edit' ? '编辑沙盘' : '观察模式'}</em>
        </div>
        <svg
          ref={svgRef}
          className="map-svg-stage"
          viewBox={`0 0 ${stageSize.width} ${stageSize.height}`}
          role="img"
          aria-label="Virtual office map"
          onPointerDown={(event) => {
            if (event.target === event.currentTarget) onSelect(undefined);
          }}
        >
          <defs>
            <linearGradient id="stageGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#eef7ff" />
              <stop offset="0.55" stopColor="#fff6e8" />
              <stop offset="1" stopColor="#eafaf1" />
            </linearGradient>
            <filter id="selectionGlow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="floorShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="18" stdDeviation="18" floodColor="#335b87" floodOpacity="0.18" />
            </filter>
          </defs>
          <rect width={stageSize.width} height={stageSize.height} fill="url(#stageGradient)" />
          <IsoGrid />
          <polygon points="560,86 1082,382 560,646 38,382" fill="#335b87" opacity="0.1" />
          <polygon points="60,330 560,614 560,646 38,382" fill="#aac0d5" opacity="0.34" />
          <polygon points="1060,330 560,614 560,646 1082,382" fill="#728da8" opacity="0.18" />
          <polygon points={floor} fill="#edf8f3" stroke="#a9c8df" strokeWidth="2.4" filter="url(#floorShadow)" />
          <polygon points="560,96 1010,350 560,584 110,350" fill="#f8fbff" opacity="0.42" stroke="#d9edf8" strokeWidth="1.5" />
          <DecorativePaths />
          <g transform={`translate(${offset.x} ${offset.y}) scale(${zoom})`}>
            {sorted.map((object) => (
              <MapObjectNode
                key={object.id}
                object={object}
                selected={object.id === selectedObjectId}
                highlighted={object.id === highlightedObjectId}
                draggable={mode === 'edit'}
                onSelect={onSelect}
                onPointerStart={startDrag}
              />
            ))}
          </g>
        </svg>
        <CanvasStatusBar mode={mode} zoom={zoom} count={objects.length} />
      </div>
    </main>
  );
});

export default MapCanvas;
