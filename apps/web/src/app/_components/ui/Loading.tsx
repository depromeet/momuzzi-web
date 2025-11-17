import Image from 'next/image';

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/60" />
      <Image alt="로딩 아이콘" src="/loading.gif" width={270} height={270} className="z-50" />
    </div>
  );
};

export default Loading;
