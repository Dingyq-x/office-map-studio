import type { MapObject } from '../types/map';

export const STORAGE_KEY = 'office-map-studio.objects.v1';

export function loadObjects(): MapObject[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as MapObject[];
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function saveObjects(objects: MapObject[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(objects));
}

export function resetObjects(): void {
  localStorage.removeItem(STORAGE_KEY);
}
