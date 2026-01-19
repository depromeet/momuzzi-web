interface BadgeProps {
  children: React.ReactNode;
}

const Badge = ({ children }: BadgeProps) => {
  return (
    <span className="w-fit rounded-md bg-orange-100 px-2 py-1 label-2 text-xs font-semibold text-orange-600 select-none">
      {children}
    </span>
  );
};

export default Badge;
