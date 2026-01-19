'use client';

import { useEffect } from 'react';

import { Copy } from 'lucide-react';
import Image from 'next/image';

import BaseModal from '@/components/ui/Modal/BaseModal';
import { useToast } from '@/features/toast';
import { initKakaoSDK, shareKakaoLink } from '@/lib/kakao';

interface CreateMeetingSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateMeetingSuccessModal = ({ isOpen, onClose }: CreateMeetingSuccessModalProps) => {
  const { success } = useToast();

  useEffect(() => {
    initKakaoSDK();
  }, []);

  const handleCopyUrl = async () => {
    try {
      const url = typeof window !== 'undefined' ? window.location.href : '';
      await navigator.clipboard.writeText(url);
      success(`참여 링크가 복사되었어요.\n공유해서 참여를 독촉해보세요.`, { duration: 2500 });
      onClose();
    } catch (err) {
      console.error('URL 복사 실패:', err);
      success('링크 복사에 실패했습니다.', { duration: 2500 });
    }
  };

  const handleShareKakao = () => {
    shareKakaoLink();
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} showCloseButton className="max-w-[335px] pt-4">
      <div className="flex flex-col items-center pb-13 select-none">
        <Image src="/images/confetti.svg" alt="폭죽 아이콘" width={100} height={100} />
        <div className="flex flex-col items-center gap-2 pt-1 pb-2">
          <h3 className="title-gradient heading-3 font-bold">모임이 생성되었어요!</h3>
          <p className="text-center body-3 whitespace-pre-wrap text-neutral-800">
            {`더 많은 멤버가 취향 설문에 참여하도록\n지금 링크를 공유해보세요!`}
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleShareKakao}
            className="flex cursor-pointer flex-col gap-3 px-4 py-3 transition-opacity hover:opacity-70"
          >
            <Image src="/icons/kakaotalk.svg" alt="카카오톡 아이콘" width={52} height={52} />
            <div className="label-1 text-neutral-1000">카카오톡</div>
          </button>
          <button
            onClick={handleCopyUrl}
            className="flex cursor-pointer flex-col gap-3 px-4 py-3 transition-opacity hover:opacity-70"
          >
            <div className="flex h-13 w-13 items-center justify-center rounded-full bg-neutral-200">
              <Copy size={27} className="text-neutral-1300" />
            </div>
            <div className="label-1 text-neutral-1000">URL 복사</div>
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default CreateMeetingSuccessModal;
