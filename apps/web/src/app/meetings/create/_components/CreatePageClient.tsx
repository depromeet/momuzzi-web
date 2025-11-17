'use client';

import { useState } from 'react';

import { MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';

import Button from '@/app/_components/ui/Button';
import Input from '@/app/_components/ui/Input';
import StepperInput from '@/app/_components/ui/StepperInput';
import { useDisclosure } from '@/app/_hooks/useDisclosure';
import { cn } from '@/app/_lib/cn';
import { meetingsApi } from '@/app/_services/meetings';

import { useMeetingForm } from '../_hooks/useMeetingForm';

import DateTimePicker from './DateTimePicker';
import FormSection from './FormSection';
import LocationBottomSheet from './LocationBottomSheet';

const CreatePageClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const meetingForm = useMeetingForm();

  const { isOpen: isLocationSheetOpen, handler: locationSheetHandler } = useDisclosure();

  const router = useRouter();

  const handleSubmit = async () => {
    if (!meetingForm.isFormValid || !meetingForm.formData.station || isLoading) return;

    setIsLoading(true);
    try {
      const formattedForm = {
        name: meetingForm.formData.name,
        attendeeCount: meetingForm?.formData.attendeeCount,
        stationId: meetingForm.formData.station.id,
        endAt: `${meetingForm.formData.date}T${meetingForm.formData.time}:00:00`,
      };
      const { id, token } = await meetingsApi.createMeeting(formattedForm);
      router.replace(`/events/${id}/overview?token=${token}&created=1`);
    } catch (error) {
      console.error('모임 생성 실패:', error);
      // TODO: 모임 생성 실패 에러 처리
    } finally {
      setIsLoading(false);
    }
  };

  const isDisabled = !meetingForm.isFormValid || isLoading;

  return (
    <>
      <FormSection label="모임 이름">
        <Input
          value={meetingForm.formData.name}
          onChange={(event) => meetingForm.setName(event.target.value)}
          onClear={() => meetingForm.setName('')}
          showClearButton
          maxLength={20}
          placeholder="모임명 입력"
        />
      </FormSection>

      <FormSection label="모임 인원">
        <StepperInput
          value={meetingForm.formData.attendeeCount}
          onChange={meetingForm.setMembers}
        />
      </FormSection>

      <FormSection label="모임 장소">
        <button
          type="button"
          onClick={locationSheetHandler.toggle}
          className={cn(
            'flex items-center gap-2 border-b-1 border-b-neutral-300 pt-3 pb-2 body-2 font-semibold',
            meetingForm.formData.station ? 'text-gray-1600' : 'text-neutral-400'
          )}
        >
          <MapPin size={20} strokeWidth={2} className="text-neutral-400" />
          <span>{meetingForm.formData.station?.name || '지하철역으로 검색'}</span>
        </button>
      </FormSection>

      <FormSection label="식당 추천 시간">
        <div className="flex flex-col gap-4 pb-8">
          <DateTimePicker
            date={meetingForm.formData.date}
            time={meetingForm.formData.time}
            onDateChange={meetingForm.setDate}
            onTimeChange={meetingForm.setTime}
          />

          <span className="flex items-center justify-center rounded-sm bg-orange-500/[0.08] p-3 label-2 text-xs font-medium text-neutral-700 select-none">
            식당 추천 시간까지 모임원의 식사 취향 설문이 가능합니다.
          </span>
        </div>
      </FormSection>

      <footer className="sticky bottom-0 pb-6">
        <Button onClick={handleSubmit} status={isDisabled ? 'disabled' : 'normal'}>
          {isLoading ? '모임 생성 중...' : '모임 생성하기'}
        </Button>
      </footer>

      <LocationBottomSheet
        isOpen={isLocationSheetOpen}
        onStationSelect={meetingForm.setStation}
        onClose={locationSheetHandler.close}
      />
    </>
  );
};

export default CreatePageClient;
