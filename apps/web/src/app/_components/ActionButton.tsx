import Image from 'next/image';

interface ActionButtonProps {
  icon: string;
  label: string;
  onClick: () => void;
}

const ActionButton = ({ icon, label, onClick }: ActionButtonProps) => {
  return (
    <div className="flex animate-slide-up items-center gap-3 opacity-0 select-none">
      <p className="body-2 font-semibold text-white">{label}</p>
      <button
        type="button"
        onClick={onClick}
        onKeyDown={(event: React.KeyboardEvent<HTMLButtonElement>) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onClick();
          }
        }}
        className="flex h-15 w-15 cursor-pointer items-center justify-center rounded-full bg-white"
        aria-label={label}
      >
        <Image alt={`${label} 아이콘`} src={icon} width={40} height={40} />
      </button>
    </div>
  );
};

export default ActionButton;
