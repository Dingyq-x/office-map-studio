import { Canvas } from '@react-three/fiber';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import type { MapMode, MapObject } from '../types/map';
import CanvasStatusBar from './CanvasStatusBar';
import OfficeScene from '../three/OfficeScene';

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

const MapCanvas = forwardRef<MapCanvasHandle, Props>(function MapCanvas(
  { objects, selectedObjectId, highlightedObjectId, focusedObjectId, mode, zoom, onSelect, onObjectMove },
  ref,
) {
  const exporterRef = useRef<() => string>(() => '');
  const setExporter = useCallback((exporter: () => string) => {
    exporterRef.current = exporter;
  }, []);

  useImperativeHandle(ref, () => ({
    toDataURL: () => exporterRef.current(),
  }));

  return (
    <main className="canvas-shell three-canvas-shell">
      <div className="canvas-frame three-canvas-frame">
        <div className="canvas-title-card">
          <span className="live-dot" />
          <strong>Low Poly Virtual Office</strong>
          <em>{mode === 'edit' ? '3D 编辑模式' : '3D 观察模式'}</em>
        </div>
        <Canvas
          className="office-three-canvas"
          shadows
          dpr={[1, 2]}
          gl={{ preserveDrawingBuffer: true, antialias: true, alpha: false }}
          onPointerMissed={() => onSelect(undefined)}
        >
          <OfficeScene
            objects={objects}
            selectedObjectId={selectedObjectId}
            highlightedObjectId={highlightedObjectId}
            focusedObjectId={focusedObjectId}
            mode={mode}
            zoom={zoom}
            onSelect={onSelect}
            onObjectMove={onObjectMove}
            onCanvasReady={setExporter}
          />
        </Canvas>
        <div className="three-scene-hint">
          <span>Orbit · 低角度俯视</span>
          <span>Raycast · 地面拖拽</span>
          <span>WebGL PNG Export</span>
        </div>
        <CanvasStatusBar mode={mode} zoom={zoom} count={objects.length} />
      </div>
    </main>
  );
});

export default MapCanvas;
