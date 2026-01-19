export const CUISINE_MAP = {
  1: `한식`,
  4: `중식`,
  5: `양식`,
  6: `일식`,
  7: `동남아`,
  3: `다 괜찮아요`,
} as const;

export type CuisineId = keyof typeof CUISINE_MAP;

const BASE_URL = '/images/menu';

export const getCuisineImageSrc = (id: number): string => {
  if (!(id in CUISINE_MAP)) {
    console.warn(`[getCuisineImageSrc] Unknown cuisine id: ${id}`);
    return `${BASE_URL}/한식.svg`;
  }

  return `${BASE_URL}/${CUISINE_MAP[id as CuisineId]}.svg`;
};
