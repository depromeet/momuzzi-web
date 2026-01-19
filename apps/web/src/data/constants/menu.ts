const IMAGE_PATH = '/images/menu';

export const FOOD_MAP_CONSTANT = {
  mexican: { name: '멕시칸', imageSrc: `${IMAGE_PATH}/멕시칸.svg` },
  vietnamese: { name: '베트남 음식', imageSrc: `${IMAGE_PATH}/베트남 음식.svg` },
  bunsik: { name: '분식', imageSrc: `${IMAGE_PATH}/분식.svg` },
  western: { name: '양식', imageSrc: `${IMAGE_PATH}/양식.svg` },
  indian: { name: '인도 음식', imageSrc: `${IMAGE_PATH}/인도 음식.svg` },
  japanese: { name: '일식', imageSrc: `${IMAGE_PATH}/일식.svg` },
  southeast: { name: '기타 해외 음식', imageSrc: `${IMAGE_PATH}/태국 음식.svg` },
} as const;

export type FoodKey = keyof typeof FOOD_MAP_CONSTANT;
export type FoodMeta = (typeof FOOD_MAP_CONSTANT)[FoodKey];
export const FOOD_MAP: Record<FoodKey, FoodMeta> = FOOD_MAP_CONSTANT;
