'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { surveyApi } from '@/app/_services/survey/api';
import SurveyLayout from '@/app/survey/_components/core/SurveyLayout';
import SurveyCuisineStep from '@/app/survey/_components/step/SurveyCuisineStep';
import SurveyProfileStep from '@/app/survey/_components/step/SurveyProfileStep';
import ConfirmModal from '@/app/survey/_components/ui/modal/ConfirmModal';
import { useSurveyFunnel } from '@/app/survey/_hooks/useSurveyFunnel';
import { getPrevStepKey, SURVEY_TOTAL_STEPS } from '@/app/survey/_models/constants';

import type { RoleLabel, SurveyResult } from '@/app/survey/_models/types';

interface SurveyFunnelProps {
  role: RoleLabel;
  meetingId: number;
  initial?: Partial<SurveyResult>;
  onComplete?: (r: SurveyResult) => void;
}

/** SurveyFunnel
 * - 설문 퍼널 전체 플로우를 제어하는 핵심 오케스트레이터
 * - useSurveyFunnel Hook으로 현재 step/context/history를 관리
 * - step에 따라 다음 컴포넌트 렌더링:
 *   ① PreferCuisine (음식 선택)
 *   ② Name (프로필 입력)
 * - 추가 분기(예: 한식 세부 질문)는 이후 단계로 확장 가능
 *
 * State:
 * - isSkipModalOpen: 건너뛰기/나가기 모달 표시
 */

const SurveyFunnel = ({ role, meetingId, initial, onComplete: _onComplete }: SurveyFunnelProps) => {
  const { step, context, history } = useSurveyFunnel({ ...initial, role });
  const router = useRouter();

  const [activeModal, setActiveModal] = useState<'exit' | 'skip' | null>(null);

  const closeModal = () => setActiveModal(null);

  const handleBack = () => {
    if (step === 'PreferCuisine') return router.push(`/events/${meetingId}/overview`);
    history.replace(getPrevStepKey(step), (p) => p);
  };

  switch (step) {
    /** STEP 1: 선호 음식 선택 */
    case 'PreferCuisine':
      return (
        <SurveyLayout
          stepValue={1}
          totalSteps={SURVEY_TOTAL_STEPS}
          onBack={() => setActiveModal('exit')}
          showNextButton
          rightLabel="건너뛰기"
          onRightClick={() => setActiveModal('skip')}
        >
          <SurveyCuisineStep
            title={`좋아하는 음식을\n최대 5개까지 선택해 주세요`}
            defaultSelectedIds={context.preferCuisineIds}
            onCancel={() => setActiveModal('exit')}
            context={context}
            history={history}
            onComplete={({ categoryIds }) => {
              history.push('Name', (prev) => ({
                ...prev,
                preferCategoryIds: categoryIds,
              }));
            }}
          />

          <ConfirmModal
            open={activeModal === 'exit'}
            title="설문을 그만둘까요?"
            description="지금 나가면 입력된 내용이 저장되지 않아요."
            cancelText="계속하기"
            confirmText="나가기"
            onCancel={closeModal}
            onConfirm={() => {
              closeModal();
              router.push(`/events/${meetingId}/overview`);
            }}
          />

          <ConfirmModal
            open={activeModal === 'skip'}
            title="건너뛰고 넘어갈까요?"
            description="선호 음식이 저장되지 않아요."
            cancelText="취소"
            confirmText="건너뛰기"
            onCancel={closeModal}
            onConfirm={() => {
              closeModal();
              history.push('Name', (prev) => ({
                ...prev,
                name: '',
                profileKey: 'default',
                preferCuisineIds: [],
                preferCategoryIds: [3],
              }));
            }}
          />
        </SurveyLayout>
      );

    /** STEP 2: 프로필(닉네임/색상) 확정 */
    case 'Name':
      return (
        <SurveyLayout stepValue={2} totalSteps={SURVEY_TOTAL_STEPS} onBack={handleBack}>
          <SurveyProfileStep
            initialValue={context.name}
            initialProfileKey={context.profileKey}
            onNext={async ({ name, profileKey }) => {
              history.replace('Name', (prev) => ({ ...prev, name, profileKey }));

              const fallbackCategoryIds = context.preferCuisineIds
                .map((id) => Number(id))
                .filter((value): value is number => Number.isFinite(value));
              const categoryIds = context.preferCategoryIds?.length
                ? context.preferCategoryIds
                : fallbackCategoryIds;

              if (!categoryIds.length) {
                throw new Error('선호 음식을 먼저 선택해 주세요.');
              }

              await surveyApi.postSurveyResult(meetingId, categoryIds);
              router.push(`/events/${meetingId}/overview`);
            }}
            onCancel={handleBack}
            meetingId={meetingId}
          />

          <ConfirmModal
            open={activeModal === 'exit'}
            title="설문을 종료할까요?"
            description="지금 나가면 입력된 내용이 저장되지 않아요."
            cancelText="계속하기"
            confirmText="나가기"
            onCancel={closeModal}
            onConfirm={() => {
              closeModal();
              router.push(`/events/${meetingId}/overview`);
            }}
          />
        </SurveyLayout>
      );

    default:
      return null;
  }
};

export default SurveyFunnel;
