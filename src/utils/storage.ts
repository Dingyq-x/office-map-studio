import type { MapObject, OfficeMapConfig } from '../types/map';

export const STORAGE_KEY = 'office-map-studio-layout';
export const CONFIG_STORAGE_KEY = 'office-map-studio-config';

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
  localStorage.removeItem(CONFIG_STORAGE_KEY);
}

export function loadConfig(): OfficeMapConfig | null {
  try {
    const raw = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as OfficeMapConfig;
    return parsed && typeof parsed.width === 'number' && typeof parsed.depth === 'number' ? parsed : null;
  } catch {
    return null;
  }
}

export function saveConfig(config: OfficeMapConfig): void {
  localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
}
