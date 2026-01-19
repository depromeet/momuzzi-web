import { CuisineId } from '@/data/constants/cuisine';

// 빠른 탐색을 위해 레코드 타입 사용

export type MainCount = Partial<Record<CuisineId, { id: CuisineId; name: string; count: number }>>;

export type LeafCountPerMain = Partial<
  Record<
    CuisineId,
    {
      mainId: CuisineId;
      mainName: string;
      leaves: Record<number, { id: number; name: string; count: number }>;
      total: number;
    }
  >
>;

export type CurrentUserSelection = Partial<{
  userId: number | null;
  mainCategories: Partial<{ id: CuisineId; name: string }[]>;
  leavesByMain: Partial<Record<CuisineId, { id: number; name: string }[]>>;
}>;
