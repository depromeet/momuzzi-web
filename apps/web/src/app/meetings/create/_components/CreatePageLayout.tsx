'use client';

import { useRouter } from 'next/navigation';

import TopNavigation from '@/app/_components/layout/TopNavigation';
import { Heading } from '@/app/_components/typography';
import Badge from '@/app/_components/ui/Badge';
import { ConfirmModal } from '@/app/_components/ui/Modal';
import { useDisclosure } from '@/app/_hooks/useDisclosure';

interface CreatePageLayoutProps {
  children: React.ReactNode;
}

const CreatePageLayout = ({ children }: CreatePageLayoutProps) => {
  const { isOpen: showModal, handler: modalHandler } = useDisclosure();
  const router = useRouter();

  const handleNavigateHome = () => {
    router.push('/');
  };

  return (
    <div className="no-scrollbar relative flex h-[100dvh] flex-col overflow-y-auto background-1">
      <TopNavigation showBackButton onLeftClick={modalHandler.open} className="bg-white" />

      <header className="mt-2 flex flex-col gap-3 px-5 pt-2 pb-8 select-none">
        <Badge>모임 만들기</Badge>
        <Heading as="h1">{`모임 이름과 내용을\n작성해 주세요`}</Heading>
      </header>

      <main className="no-scrollbar flex flex-1 flex-col gap-8 px-5">{children}</main>

      <ConfirmModal
        isOpen={showModal}
        title="모임 만들기를 취소하시겠어요?"
        onConfirm={handleNavigateHome}
        onCancel={modalHandler.close}
      />
    </div>
  );
};

export default CreatePageLayout;
