import { useState, useCallback } from 'react';

import { validateText } from '@/app/meetings/_utils/validation';

export const useProfileValidation = () => {
  const [error, setError] = useState<string>('');

  const validateNickname = useCallback((value: string) => {
    const { isValid, error: textError } = validateText(value.trim());
    if (!isValid) return textError;
    return '';
  }, []);

  const handleApiError = useCallback(() => {
    setError('프로필 저장 중 오류가 발생했습니다.');
  }, []);

  return { error, setError, validateNickname, handleApiError };
};
