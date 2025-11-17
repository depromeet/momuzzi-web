'use client';

import { useFunnel } from '@use-funnel/browser';

import type { CommonCtx, FunnelCtxMap } from '@/app/survey/_models/types';

/** useFunnel
 * - 설문 단계 공용 컨텍스트를 초기화
 * - (필요 시) 여기에서 로컬스토리지/URL 동기화 같은 확장도 추가 가능
 */
export const useSurveyFunnel = (initial?: Partial<CommonCtx>) => {
  return useFunnel<FunnelCtxMap>({
    id: 'survey',
    initial: {
      step: 'PreferCuisine',
      context: {
        role: initial?.role ?? '참여자',
        name: initial?.name ?? '',
        profileKey: initial?.profileKey ?? 'default',
        preferCuisineIds: initial?.preferCuisineIds ?? [],
        preferCategoryIds: initial?.preferCategoryIds ?? [],
        dislikeCuisineIds: initial?.dislikeCuisineIds ?? [],
        others: initial?.others ?? {},
        hostFlags: initial?.hostFlags ?? {
          enableCuisineBranch: false,
        },
      },
    },
  });
};
