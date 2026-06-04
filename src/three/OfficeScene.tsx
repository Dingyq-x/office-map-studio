import { ContactShadows } from '@react-three/drei';
import { useEffect, useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import type { MapMode, MapObject, OfficeMapConfig } from '../types/map';
import OfficeCamera from './OfficeCamera';
import OfficeFloor from './OfficeFloor';
import OfficeDecoration from './OfficeDecoration';
import OfficeFurniture from './OfficeFurniture';
import OfficeSeat from './OfficeSeat';
import OfficeZone from './OfficeZone';

interface OfficeSceneProps {
  objects: MapObject[];
  selectedObjectId?: string;
  highlightedObjectId?: string;
  focusedObjectId?: string;
  mode: MapMode;
  zoom: number;
  mapConfig: OfficeMapConfig;
  onSelect: (id?: string) => void;
  onObjectMove: (id: string, x: number, y: number) => void;
  onObjectResize: (id: string, width: number, height: number) => void;
  onMapConfigChange: (patch: Partial<OfficeMapConfig>) => void;
  onCanvasReady: (exporter: () => string) => void;
}

function CanvasExporter({ onCanvasReady }: { onCanvasReady: (exporter: () => string) => void }) {
  const { gl } = useThree();
  useEffect(() => {
    onCanvasReady(() => gl.domElement.toDataURL('image/png'));
  }, [gl, onCanvasReady]);
  return null;
}

export default function OfficeScene({ objects, selectedObjectId, highlightedObjectId, focusedObjectId, mode, zoom, mapConfig, onSelect, onObjectMove, onObjectResize, onMapConfigChange, onCanvasReady }: OfficeSceneProps) {
  const sorted = useMemo(
    () => [...objects].sort((a, b) => {
      const layerWeight: Record<MapObject['kind'], number> = { space: 0, decoration: 1, furniture: 2, seat: 3 };
      const diff = layerWeight[a.kind] - layerWeight[b.kind];
      return diff || a.y - b.y;
    }),
    [objects],
  );

  return (
    <>
      <CanvasExporter onCanvasReady={onCanvasReady} />
      <OfficeCamera objects={objects} focusedObjectId={focusedObjectId} zoom={zoom} />
      <color attach="background" args={['#eaf7ff']} />
      <fog attach="fog" args={['#eaf7ff', 18, 34]} />
      <ambientLight intensity={0.9} />
      <hemisphereLight args={['#ffffff', '#b7d9ef', 0.82]} />
      <directionalLight
        position={[5, 9, 6]}
        intensity={1.38}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-9}
        shadow-camera-right={9}
        shadow-camera-top={9}
        shadow-camera-bottom={-9}
      />
      <pointLight position={[-5, 3.8, 4]} intensity={0.38} color="#ffc68a" />
      <spotLight position={[0, 8, 1.8]} angle={0.55} penumbra={0.82} intensity={0.34} color="#ffffff" />
      <OfficeFloor config={mapConfig} editable={mode === 'edit'} onResize={(width, depth) => onMapConfigChange({ width, depth })} />
      {sorted.map((object) => {
        const common = {
          key: object.id,
          object,
          selected: object.id === selectedObjectId,
          highlighted: object.id === highlightedObjectId,
          mode,
          onSelect: (id: string) => onSelect(id),
          onMove: onObjectMove,
          onResize: onObjectResize,
        };
        if (object.kind === 'space') return <OfficeZone {...common} />;
        if (object.kind === 'seat') return <OfficeSeat {...common} />;
        if (object.kind === 'decoration') return <OfficeDecoration {...common} />;
        return <OfficeFurniture {...common} />;
      })}
      <ContactShadows position={[0, 0.01, 0]} opacity={0.34} scale={18} blur={3.2} far={6} />
    </>
  );
}
