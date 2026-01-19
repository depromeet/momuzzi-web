'use client';

import { useEffect, useState } from 'react';

import { surveyApi } from '@/services/survey/api';

import type { FoodCategory } from '@/app/survey/_models/types';

/** useSurveyCategories
 * - /survey-categories API를 호출하여 카테고리 목록 조회
 * - 로딩/에러 상태를 포함해 반환
 * - FoodCategoryResponse → FoodCategory[] 구조로 변환하여 setCategories
 */
export const useSurveyCategories = () => {
  const [categories, setCategories] = useState<FoodCategory[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchCategories = async () => {
      try {
        const res = await surveyApi.getSurveyCategories();
        // fetchWithToken 구조 상 res는 FoodCategoryResponse
        if (mounted) {
          setCategories(Array.isArray(res) ? res : []);
        }
      } catch (err) {
        if (mounted) setError(err as Error);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    fetchCategories();
    return () => {
      mounted = false;
    };
  }, []);

  return { categories, error, isLoading };
};
