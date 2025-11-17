const CuisineNoticeFrame = () => {
  return (
    <div
      style={{
        background:
          'linear-gradient(180deg, rgba(255,240,235,0) 0%, rgba(255,247,245,0.6) 16px, rgba(255,247,245,0.8) 32px, rgba(255,247,245,1) 100%)',
      }}
      className="mx-auto flex w-full items-center justify-center"
    >
      <p className="label-1 font-medium text-orange-900">중복 선택 최대 5개</p>
    </div>
  );
};

export default CuisineNoticeFrame;
