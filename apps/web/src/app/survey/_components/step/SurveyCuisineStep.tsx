'use client';

import { useState, useEffect, useMemo } from 'react';

import Image from 'next/image';

import Loading from '@/app/_components/ui/Loading';
import { getCuisineImageSrc } from '@/app/_constants/cuisine';
import { FOOD_MAP } from '@/app/_constants/menu';
import ChipGroupMultiSelect from '@/app/survey/_components/ui/form/ChipGroupMultiSelect';
import StepFormLayout from '@/app/survey/_components/ui/form/StepFormLayout';
import FoodConfirmModal from '@/app/survey/_components/ui/modal/FoodConfirmModal';
import { useSurveyCategories } from '@/app/survey/_hooks/useSurveyCategories';
import { ANY_ID } from '@/app/survey/_models/constants';

import type { FunnelHistory, FoodCategory, CommonCtx } from '@/app/survey/_models/types';

interface SurveyCuisineStepProps {
  title: string;
  defaultSelectedIds?: string[];
  onCancel?: () => void;
  context: CommonCtx;
  history: FunnelHistory<CommonCtx>;
  onComplete: (payload: { selectedIds: string[]; categoryIds: number[] }) => Promise<void> | void;
}

/** SurveyCuisineStep
 * - 음식 카테고리(Branch & Leaf) 선택 단계
 * - 최다 5개까지 선택 가능 / 선택 시 context 즉시 업데이트
 * - 확인 모달에서 최종 확인 후 부모(onComplete)에 선택 결과 전달
 */
const SurveyCuisineStep = ({
  title,
  defaultSelectedIds = [],
  onCancel,
  context,
  history,
  onComplete,
}: SurveyCuisineStepProps) => {
  const { categories, isLoading: isCategoryLoading } = useSurveyCategories();

  const [selectedIds, setSelectedIds] = useState<string[]>(defaultSelectedIds);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /** context 초기값 반영 */
  useEffect(() => {
    setSelectedIds(context.preferCuisineIds || []);
  }, [context.preferCuisineIds]);

  /** 상위 카테고리 이미지 src 결정 */
  const resolveCategoryIconSrc = (category: FoodCategory): string => {
    const byName = Object.values(FOOD_MAP).find((m) => m.name === category.name);
    if (byName) return byName.imageSrc;
    return getCuisineImageSrc(category.id);
  };

  /** 선택 변동 시 즉시 context 업데이트 */
  const handleSelectChange = (ids: string[]) => {
    if (ids.length > 5) return alert('최대 5개까지 선택이 가능합니다.');
    setSelectedIds(ids);
    history.replace('PreferCuisine', (prev: CommonCtx) => ({
      ...prev,
      preferCuisineIds: ids,
    }));
  };

  /** "다음으로" 버튼 -> 확인 모달 */
  const handleNext = () => {
    if (selectedIds.length === 0) return;
    setIsModalOpen(true);
  };

  /** 선택 결과 부모로 전달 */
  const confirmNext = async () => {
    try {
      setIsSubmitting(true);
      const categoryList = Array.isArray(categories) ? categories : [];
      const selectedLeafIds = selectedIds.map(Number);
      const branchIds: number[] = [];

      selectedLeafIds.forEach((leafId) => {
        const parent = categoryList.find((cat) =>
          cat.children.some((child) => child.id === leafId)
        );
        if (parent) branchIds.push(parent.id);
      });

      const categoryIds = Array.from(new Set([...branchIds, ...selectedLeafIds])).filter((id) =>
        Number.isFinite(id)
      ) as number[];

      await onComplete({ selectedIds, categoryIds });
      setIsModalOpen(false);
    } catch (error) {
      const err = error as Error;
      console.error('선호 음식 선택 처리 실패:', err.message);
      alert('선택을 저장하는 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /** "다 괜찮아요" 제외 브랜치 카테고리 */
  const displayCategories = useMemo(() => {
    if (!Array.isArray(categories)) return [];
    return categories.filter((c) => c.name !== '다 괜찮아요');
  }, [categories]);

  const isBusy = isCategoryLoading || isSubmitting;

  return (
    <>
      <StepFormLayout
        title={title}
        onCancel={onCancel}
        onNext={handleNext}
        isNextDisabled={selectedIds.length === 0 || isBusy}
        nextButtonText={isSubmitting ? '처리 중...' : '다음 단계로'}
        showNotice
      >
        {isCategoryLoading ? (
          <div className="py-10 text-center text-sm text-neutral-500">
            음식 목록을 불러오는 중...
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {displayCategories.map((category) => {
              const iconSrc = resolveCategoryIconSrc(category);

              return (
                <div key={category.id}>
                  <div className="mb-2 flex items-center gap-2">
                    <Image
                      src={iconSrc}
                      alt={category.name}
                      width={24}
                      height={24}
                      className="aspect-square"
                    />
                    <h3 className="type-gradient text-lg font-semibold">{category.name}</h3>
                  </div>

                  <ChipGroupMultiSelect
                    options={category.children.map((c) => ({
                      id: c.id.toString(),
                      label: c.name,
                      variant: 'cuisine' as const,
                    }))}
                    selectedIds={selectedIds}
                    onChange={handleSelectChange}
                    exclusiveIds={[ANY_ID]}
                  />
                </div>
              );
            })}
          </div>
        )}
      </StepFormLayout>

      {/* 선택 확인 모달 */}
      {isModalOpen && (
        <FoodConfirmModal
          open={isModalOpen}
          title="이대로 선택할까요?"
          subtitle="선호하는 조합이 맞는지 다시 확인해 주세요"
          selectedFoods={selectedIds.map((id) => {
            // 선택된 leaf
            const categoryList = Array.isArray(categories) ? categories : [];
            // 부모 브랜치
            const found = categoryList
              .flatMap((c) => c.children)
              .find((d) => d.id.toString() === id);
            const parent = categoryList.find((c) =>
              c.children.some((child) => child.id.toString() === id)
            );

            const iconSrc = parent ? resolveCategoryIconSrc(parent) : getCuisineImageSrc(1);

            return {
              categoryLabel: parent?.name ?? '기타',
              iconSrc,
              detailLabel: found?.name ?? '',
            };
          })}
          onCancel={() => setIsModalOpen(false)}
          onConfirm={confirmNext}
        />
      )}

      {/* API 저장 / 카테고리 로딩 중 전체 오버레이 */}
      {isBusy && <Loading />}
    </>
  );
};

export default SurveyCuisineStep;
