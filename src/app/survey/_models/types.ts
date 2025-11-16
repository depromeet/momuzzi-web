/** 타입/스텝/컨텍스트의 '단일 출처'
 * - 퍼널 단계(STEP_KEYS)와 결과 스키마(CommonCtx)를 한 곳에서 관리
 * - 분기 스텝(예: KoreanFollowUp)도 여기서 선언만 해두고 필요 시 활성화
 */

export type RoleLabel = '참여자' | '주최자';

export const STEP_KEYS = [
  'PreferCuisine', // prefer cuisine selection
  'Name', // attendee profile
  'DislikeCuisine', // 비선호하는 음식 선택
  'Review', // 선택 결과 확인
  'Complete', // 완료

  // --- (확장) domain-specific branches
  'KoreanFollowUp',
  'JapaneseFollowUp',
] as const;

export type StepKey = (typeof STEP_KEYS)[number];

/** 퍼널 전역 컨텍스트(상태)
 * - 선택은 'id 배열'로 관리 → 옵션 테이블과 join이 쉬움
 * - others: 스텝별 '기타' 입력 텍스트 보관용(없으면 비움)
 * - hostFlags: 주최자 설정(분기 활성화/잠금 등) → 룸 설정과 연동 가능
 */
export interface CommonCtx {
  role: RoleLabel;
  name: string;
  profileKey: string;

  /** 선택은 id 배열로 관리 */
  preferCuisineIds: string[];
  preferCategoryIds: number[];
  dislikeCuisineIds: string[];

  /** 스텝별 '기타' 입력값 */
  others: Partial<Record<StepKey, string>>;

  /** 주최자/설정값(고정 옵션, 분기 on/off 등) */
  hostFlags?: {
    lockPrefer?: boolean; // 선호 수정 잠금
    lockDislike?: boolean; // 비선호 수정 잠금
    enableCuisineBranch?: boolean; // 한식 등 상세 분기 활성화
  };
}

/** useFunnel이 기대하는 타입: "스텝키 → 컨텍스트" 매핑 */
export type FunnelCtxMap = Record<StepKey, CommonCtx>;

export type SurveyResult = CommonCtx;

export interface FoodCategory {
  id: number;
  level: 'BRANCH' | 'LEAF'; // 분기(하위 존재) or 리프(말단)
  name: string; // 음식 이름
  sortOrder: number; // 정렬 순서
  children: FoodCategory[]; // 하위 항목 (재귀 구조)
}

export interface FoodCategoryResponse {
  data: FoodCategory[];
  error: null | string;
}

export interface UpdateAttendeeProfileRequest {
  attendeeNickname: string;
  color: string;
}

export interface FunnelHistory<T> {
  replace: (step: string, updater: (prev: T) => T) => void;
}

/** 모임 상세 정보 조회 */
export interface Participant {
  userId: number;
  nickname: string;
  profileColor: string;
  selectedCategories: {
    id: number;
    name: string;
    leafCategoryList: { id: number; name: string }[];
  }[];
}

export interface MeetingInfo {
  id: number;
  title: string;
  hostUserId: number;
  totalParticipantCnt: number;
  isClosed: boolean;
  stationName: string;
  endAt: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface MeetingDetailResponse {
  currentUserId: number;
  meetingInfo: MeetingInfo;
  participantList: Participant[];
}
