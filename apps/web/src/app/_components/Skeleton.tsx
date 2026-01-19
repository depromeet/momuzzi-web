const Skeleton = () => {
  return (
    <div className="flex flex-col gap-4 px-5 py-7">
      <div
        className="h-6 w-1/2 animate-pulse rounded-[20px] skeleton-gradient"
        aria-hidden="true"
      />
      <div className="h-39 w-full animate-pulse rounded-3xl skeleton-gradient" aria-hidden="true" />
    </div>
  );
};

export default Skeleton;
