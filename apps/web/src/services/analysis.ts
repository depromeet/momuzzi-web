import { api } from '@/lib/api';

const ANALYSIS_CACHE_DURATION = 300; // 5분

export interface CuisinePreference {
  name: string;
  value: number;
  percentage: number;
  description?: string;
}

export interface AnalysisData {
  summary: string; // "이번 모임에서는 주로 한식과 일식을 원해요"
  preferredCuisines: CuisinePreference[];
  dislikedCuisines: CuisinePreference[];
}

export const getAnalysis = async (eventId: string): Promise<AnalysisData> => {
  const response = await api.get<AnalysisData>(`/events/${eventId}/analysis`, {
    next: { revalidate: ANALYSIS_CACHE_DURATION },
  });
  return response;
};

// 임시 Mock 데이터 (백엔드 API 준비 전까지)
export const getMockAnalysis = async (_eventId: string): Promise<AnalysisData> => {
  // 실제로는 API 호출, 지금은 mock
  return {
    summary: '이번 모임에서의 \n 한식과 일식을 원해요',
    preferredCuisines: [
      { name: '한식', value: 6, percentage: 60, description: '김치찌개, 된장찌개, 불고기 등' },
      { name: '일식', value: 3, percentage: 30, description: '초밥, 라멘, 돈카츠 등' },
      { name: '중식', value: 1, percentage: 10, description: '짜장면, 짬뽕 등' },
    ],
    dislikedCuisines: [
      { name: '중식', value: 6, percentage: 60, description: '기름진 음식, 향신료 등' },
      { name: '일식', value: 3, percentage: 30, description: '회, 생선 요리 등' },
      { name: '한식', value: 1, percentage: 10, description: '매운 음식 등' },
    ],
  };
};
