import { Suspense } from 'react';

import Loading from '@/components/ui/Loading';

import { CreatePageLayout, CreatePageClient } from './_components';

const CreatePageContent = async () => {
  return <CreatePageClient />;
};

const CreatePage = () => {
  return (
    <CreatePageLayout>
      <Suspense fallback={<Loading />}>
        <CreatePageContent />
      </Suspense>
    </CreatePageLayout>
  );
};

export default CreatePage;
