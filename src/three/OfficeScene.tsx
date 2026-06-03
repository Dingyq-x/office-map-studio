import { ContactShadows } from '@react-three/drei';
import { useEffect, useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import type { MapMode, MapObject } from '../types/map';
import OfficeCamera from './OfficeCamera';
import OfficeFloor from './OfficeFloor';
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
  onSelect: (id?: string) => void;
  onObjectMove: (id: string, x: number, y: number) => void;
  onCanvasReady: (exporter: () => string) => void;
}

function CanvasExporter({ onCanvasReady }: { onCanvasReady: (exporter: () => string) => void }) {
  const { gl } = useThree();
  useEffect(() => {
    onCanvasReady(() => gl.domElement.toDataURL('image/png'));
  }, [gl, onCanvasReady]);
  return null;
}

export default function OfficeScene({ objects, selectedObjectId, highlightedObjectId, focusedObjectId, mode, zoom, onSelect, onObjectMove, onCanvasReady }: OfficeSceneProps) {
  const sorted = useMemo(
    () => [...objects].sort((a, b) => {
      const layerWeight = { space: 0, furniture: 1, seat: 2 };
      const diff = layerWeight[a.kind] - layerWeight[b.kind];
      return diff || a.y - b.y;
    }),
    [objects],
  );

  return (
    <>
      <CanvasExporter onCanvasReady={onCanvasReady} />
      <OfficeCamera objects={objects} focusedObjectId={focusedObjectId} zoom={zoom} />
      <color attach="background" args={['#eef7ff']} />
      <fog attach="fog" args={['#eef7ff', 16, 30]} />
      <ambientLight intensity={0.72} />
      <directionalLight position={[4, 8, 5]} intensity={1.55} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
      <hemisphereLight args={['#ffffff', '#b7d9ef', 0.65]} />
      <OfficeFloor />
      {sorted.map((object) => {
        const common = {
          key: object.id,
          object,
          selected: object.id === selectedObjectId,
          highlighted: object.id === highlightedObjectId,
          mode,
          onSelect: (id: string) => onSelect(id),
          onMove: onObjectMove,
        };
        if (object.kind === 'space') return <OfficeZone {...common} />;
        if (object.kind === 'seat') return <OfficeSeat {...common} />;
        return <OfficeFurniture {...common} />;
      })}
      <ContactShadows position={[0, 0.01, 0]} opacity={0.24} scale={16} blur={2.6} far={5} />
    </>
  );
}
