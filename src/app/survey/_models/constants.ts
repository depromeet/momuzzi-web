import { STEP_KEYS, type StepKey } from './types';

export const SURVEY_TOTAL_STEPS = 2; // Prefer / Name
export const MAX_SELECT_COUNT = 5; // 설문 선택 최대 5개

/** 숫자 스텝 인덱스(1-base) ↔ 스텝키 매핑 유틸 */
export const stepIndexToKey = (i: number): StepKey => {
  const idx0 = Math.max(0, Math.min(STEP_KEYS.length - 1, i - 1));
  return STEP_KEYS[idx0];
};
export const stepKeyToIndex = (k: StepKey): number => STEP_KEYS.indexOf(k) + 1;

/** 이전 스텝 계산 (최소 1 반환) */
export const getPrevStepIndex = (i: number) => Math.max(1, i - 1);

/** 이전 스텝 키 */
export const getPrevStepKey = (k: StepKey): StepKey => {
  const prevIdx0 = Math.max(0, STEP_KEYS.indexOf(k) - 1);
  return STEP_KEYS[prevIdx0];
};

/** Survey Any Option ID */
export const ANY_ID = 'c:any';
