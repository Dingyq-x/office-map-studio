import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import type { MapObject } from '../types/map';
import { objectToScene } from './coordinates';

interface OfficeCameraProps {
  objects: MapObject[];
  focusedObjectId?: string;
  zoom: number;
}

export default function OfficeCamera({ objects, focusedObjectId, zoom }: OfficeCameraProps) {
  const controlsRef = useRef<any>(null);
  const cameraTarget = useRef(new THREE.Vector3(0, 0, 0));
  const cameraPosition = useRef(new THREE.Vector3(7.5, 6.8, 8.4));

  useFrame(({ camera }) => {
    const object = focusedObjectId ? objects.find((item) => item.id === focusedObjectId) : undefined;
    if (object) {
      const [x, , z] = objectToScene(object);
      cameraTarget.current.set(x, 0.35, z);
      cameraPosition.current.set(x + 4.2 / zoom, 4.5 / zoom, z + 4.8 / zoom);
    } else {
      cameraTarget.current.set(0, 0, 0);
      cameraPosition.current.set(7.5 / zoom, 6.8 / zoom, 8.4 / zoom);
    }

    camera.position.lerp(cameraPosition.current, 0.08);
    if (controlsRef.current) {
      controlsRef.current.target.lerp(cameraTarget.current, 0.1);
      controlsRef.current.update();
    } else {
      camera.lookAt(cameraTarget.current);
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[7.5, 6.8, 8.4]} fov={42} near={0.1} far={80} />
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableDamping
        dampingFactor={0.12}
        minDistance={5}
        maxDistance={16}
        minPolarAngle={Math.PI / 4.2}
        maxPolarAngle={Math.PI / 2.55}
        minAzimuthAngle={-Math.PI / 3.2}
        maxAzimuthAngle={Math.PI / 3.2}
      />
    </>
  );
}
