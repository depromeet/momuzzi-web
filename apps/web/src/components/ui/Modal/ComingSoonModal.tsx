import Image from 'next/image';

import Button from '@/components/ui/Button';
import BaseModal from '@/components/ui/Modal/BaseModal';

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ComingSoonModal = ({ isOpen, onClose }: ComingSoonModalProps) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center gap-4">
        <Image
          src="/images/momuzzi-coming-soon.svg"
          alt="모무찌 커밍순 아이콘"
          width={80}
          height={60}
        />

        <div className="mb-2 flex flex-col gap-1">
          <h3 className="text-center body-2 font-semibold">해당 서비스는 준비중이에요!</h3>
          <p className="text-center body-3 text-neutral-800">많은 기대 부탁드립니다!</p>
        </div>

        <Button className="w-full" onClick={onClose}>
          확인
        </Button>
      </div>
    </BaseModal>
  );
};

export default ComingSoonModal;
