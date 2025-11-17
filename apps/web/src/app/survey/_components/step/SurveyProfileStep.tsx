'use client';

import { useState } from 'react';

import Input from '@/app/_components/ui/Input';
import Loading from '@/app/_components/ui/Loading';
import { surveyApi } from '@/app/_services/survey/api';
import StepFormLayout from '@/app/survey/_components/ui/form/StepFormLayout';
import ProfileSelector from '@/app/survey/_components/ui/selector/ProfileSelector';
import { useProfileValidation } from '@/app/survey/_hooks/useProfileValidation';

interface SurveyProfileStepProps {
  onNext: (payload: { name: string; profileKey: string }) => Promise<void> | void;
  onCancel: () => void;
  initialValue?: string;
  initialProfileKey?: string;
  title?: string;
  description?: string;
  meetingId: number;
}

/** SurveyProfileStep
 * - 닉네임/프로필 색상 입력
 * - 기본 텍스트 규칙만 검증 (중복 허용)
 * - 저장 후 다음 단계(or 완료)로 이동
 */
const SurveyProfileStep = ({
  onNext,
  onCancel,
  initialValue = '',
  initialProfileKey = 'default',
  title = '사용하실 프로필과\n이름을 알려주세요',
  description = '다음 단계로 넘어가면 수정할 수 없어요.',
  meetingId,
}: SurveyProfileStepProps) => {
  const [name, setName] = useState(initialValue);
  const [profileKey, setProfileKey] = useState(initialProfileKey);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { error, setError, validateNickname, handleApiError } = useProfileValidation();

  const handleNext = async () => {
    const nicknameError = validateNickname(name);
    if (nicknameError) return setError(nicknameError);

    try {
      setIsSubmitting(true);
      const normalizedColor =
        profileKey === 'sweetPotato' ? 'SWEET_POTATO' : profileKey.toUpperCase();
      await surveyApi.putAttendeeProfile(meetingId, {
        attendeeNickname: name.trim(),
        color: normalizedColor,
      });
      await onNext({ name, profileKey });
    } catch (e) {
      handleApiError();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <StepFormLayout
        title={title}
        description={description}
        onNext={handleNext}
        onCancel={onCancel}
        isNextDisabled={!name.trim() || !!error || isSubmitting}
        nextButtonText="다음 단계로"
      >
        <ProfileSelector value={profileKey} onChange={setProfileKey} />
        <Input
          value={name}
          onChange={(event) => {
            const { value } = event.target;
            setName(value);
            setError(validateNickname(value));
          }}
          onClear={() => setName('')}
          hasError={!!error}
          errorMessage={error}
          placeholder="이름 입력"
        />
      </StepFormLayout>
      {isSubmitting && <Loading />}
    </>
  );
};

export default SurveyProfileStep;
