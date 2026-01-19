import Image from 'next/image';

interface SectionHeaderProps {
  icon: string;
  title: string;
}

const SectionHeader = ({ icon, title }: SectionHeaderProps) => {
  return (
    <div className="flex gap-3 p-5 select-none">
      <Image alt={`${title} 아이콘`} src={icon} width={24} height={24} />
      <h3 className="body-3 leading-6 font-semibold">{title}</h3>
    </div>
  );
};

export default SectionHeader;
