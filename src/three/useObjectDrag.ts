import { useCallback, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { sceneToMap } from './coordinates';

interface UseObjectDragOptions {
  enabled: boolean;
  objectId: string;
  onMove: (id: string, x: number, y: number) => void;
  width?: number;
  height?: number;
}

const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const point = new THREE.Vector3();

export function useObjectDrag({ enabled, objectId, onMove, width = 0, height = 0 }: UseObjectDragOptions) {
  const { camera, gl } = useThree();
  const draggingRef = useRef(false);

  const updateFromPointer = useCallback((clientX: number, clientY: number) => {
    const rect = gl.domElement.getBoundingClientRect();
    pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    if (raycaster.ray.intersectPlane(groundPlane, point)) {
      const mapped = sceneToMap(point.x, point.z);
      onMove(objectId, Math.round(mapped.x - width / 2), Math.round(mapped.y - height / 2));
    }
  }, [camera, gl, height, objectId, onMove, width]);

  const onPointerDown = useCallback((event: { stopPropagation: () => void; clientX: number; clientY: number }) => {
    if (!enabled) return;
    event.stopPropagation();
    draggingRef.current = true;
    gl.domElement.style.cursor = 'grabbing';
    updateFromPointer(event.clientX, event.clientY);

    const handleMove = (moveEvent: PointerEvent) => {
      if (!draggingRef.current) return;
      updateFromPointer(moveEvent.clientX, moveEvent.clientY);
    };
    const handleUp = () => {
      draggingRef.current = false;
      gl.domElement.style.cursor = '';
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
    };

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp, { once: true });
  }, [enabled, gl, updateFromPointer]);

  return { onPointerDown, draggingRef };
}
