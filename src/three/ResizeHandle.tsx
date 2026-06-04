import { useCallback, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { MAP_CENTER, MAP_SCALE, sceneToMap, sizeToScene } from './coordinates';
import type { MapObject, OfficeMapConfig } from '../types/map';

type PointerLike = { stopPropagation: () => void; clientX: number; clientY: number };
const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const point = new THREE.Vector3();

function useGroundPointer(onPoint: (mapPoint: { x: number; y: number }) => void) {
  const { camera, gl } = useThree();
  const update = useCallback((clientX: number, clientY: number) => {
    const rect = gl.domElement.getBoundingClientRect();
    pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    if (raycaster.ray.intersectPlane(groundPlane, point)) onPoint(sceneToMap(point.x, point.z));
  }, [camera, gl, onPoint]);

  return { gl, update };
}

export function ObjectResizeHandle({ object, enabled, onResize }: { object: MapObject; enabled: boolean; onResize: (id: string, width: number, height: number) => void }) {
  const draggingRef = useRef(false);
  const { width, depth } = sizeToScene(object.width, object.height);
  const { gl, update } = useGroundPointer(useCallback((mapPoint: { x: number; y: number }) => {
    const nextWidth = Math.max(32, Math.round(mapPoint.x - object.x));
    const nextHeight = Math.max(32, Math.round(mapPoint.y - object.y));
    onResize(object.id, nextWidth, nextHeight);
  }, [object.id, object.x, object.y, onResize]));

  const onPointerDown = useCallback((event: PointerLike) => {
    if (!enabled) return;
    event.stopPropagation();
    draggingRef.current = true;
    gl.domElement.style.cursor = 'nwse-resize';
    update(event.clientX, event.clientY);
    const move = (moveEvent: PointerEvent) => draggingRef.current && update(moveEvent.clientX, moveEvent.clientY);
    const up = () => {
      draggingRef.current = false;
      gl.domElement.style.cursor = '';
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up, { once: true });
  }, [enabled, gl, update]);

  if (!enabled) return null;
  return (
    <mesh position={[width / 2 + 0.08, 0.26, depth / 2 + 0.08]} onPointerDown={onPointerDown} castShadow>
      <boxGeometry args={[0.16, 0.16, 0.16]} />
      <meshStandardMaterial color="#2f8cff" emissive="#2f8cff" emissiveIntensity={0.2} roughness={0.55} flatShading />
    </mesh>
  );
}

export function MapBoundaryResizeHandle({ config, enabled, onResize }: { config: OfficeMapConfig; enabled: boolean; onResize: (width: number, depth: number) => void }) {
  const draggingRef = useRef(false);
  const sceneWidth = config.width / MAP_SCALE;
  const sceneDepth = config.depth / MAP_SCALE;
  const { gl, update } = useGroundPointer(useCallback((mapPoint: { x: number; y: number }) => {
    const nextWidth = Math.max(560, Math.round((mapPoint.x - MAP_CENTER.x) * 2));
    const nextDepth = Math.max(360, Math.round((mapPoint.y - MAP_CENTER.y) * 2));
    onResize(nextWidth, nextDepth);
  }, [onResize]));

  const onPointerDown = useCallback((event: PointerLike) => {
    if (!enabled) return;
    event.stopPropagation();
    draggingRef.current = true;
    gl.domElement.style.cursor = 'nwse-resize';
    update(event.clientX, event.clientY);
    const move = (moveEvent: PointerEvent) => draggingRef.current && update(moveEvent.clientX, moveEvent.clientY);
    const up = () => {
      draggingRef.current = false;
      gl.domElement.style.cursor = '';
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up, { once: true });
  }, [enabled, gl, update]);

  if (!enabled || !config.showBoundary) return null;
  return (
    <mesh position={[sceneWidth / 2 + 0.14, 0.34, sceneDepth / 2 + 0.14]} onPointerDown={onPointerDown} castShadow>
      <boxGeometry args={[0.22, 0.22, 0.22]} />
      <meshStandardMaterial color="#ffd76a" emissive="#ffd76a" emissiveIntensity={0.22} roughness={0.5} flatShading />
    </mesh>
  );
}
