import type { MapObject } from '../types/map';

export function searchObjects(objects: MapObject[], query: string): MapObject[] {
  const term = query.trim().toLocaleLowerCase();
  if (!term) return [];

  return objects.filter((object) =>
    [
      object.label,
      object.employeeName,
      object.department,
      object.status,
      object.workStatus,
      object.spaceType,
      object.furnitureType,
      object.seatType,
      object.note,
    ]
      .filter(Boolean)
      .some((value) => String(value).toLocaleLowerCase().includes(term)),
  );
}
