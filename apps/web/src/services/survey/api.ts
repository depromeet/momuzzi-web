import {
  FoodCategoryResponse,
  UpdateAttendeeProfileRequest,
  MeetingDetailResponse,
} from '@/app/survey/_models/types';
import { api } from '@/lib/api';

/**
 * 설문 관련 API 모듈
 */
export const surveyApi = {
  /** 음식 카테고리 조회 */
  getSurveyCategories: (query?: string) =>
    api.get<FoodCategoryResponse>('/survey-categories', {
      params: query ? { q: query } : undefined,
    }),

  /** 모임 상세 조회 (참가자 목록 포함) */
  getMeetingDetail: (meetingId: number) => {
    return api.get<MeetingDetailResponse>(`/meetings/${meetingId}`);
  },

  /** 참석자 프로필 확정 (닉네임 + 색상) */
  putAttendeeProfile: (meetingId: number, body: UpdateAttendeeProfileRequest) => {
    return api.put(`/meetings/${meetingId}/attendees`, body);
  },

  /** 설문 제출 (선호 음식 선택) */
  postSurveyResult: (meetingId: number, selectedCategoryList: number[]) => {
    return api.post(`/meetings/${meetingId}/surveys`, {
      selectedCategoryList,
    });
  },
} as const;
