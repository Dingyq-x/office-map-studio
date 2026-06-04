export const MAP_CENTER = { x: 560, y: 330 };
export const MAP_SCALE = 70;

export function mapToScene(x: number, y: number): [number, number, number] {
  return [(x - MAP_CENTER.x) / MAP_SCALE, 0, (y - MAP_CENTER.y) / MAP_SCALE];
}

export function objectToScene(object: { x: number; y: number; width: number; height: number }): [number, number, number] {
  return mapToScene(object.x + object.width / 2, object.y + object.height / 2);
}

export function sceneToMap(x: number, z: number): { x: number; y: number } {
  return { x: Math.round(x * MAP_SCALE + MAP_CENTER.x), y: Math.round(z * MAP_SCALE + MAP_CENTER.y) };
}

export function sizeToScene(width: number, height: number) {
  return { width: Math.max(width / MAP_SCALE, 0.35), depth: Math.max(height / MAP_SCALE, 0.35) };
}
