import Image from 'next/image';

import { Participant } from '@/data/models/meeting';

interface AvatarListProps {
  surveyParticipantList: Participant[];
}

const AvatarList = ({ surveyParticipantList }: AvatarListProps) => {
  return (
    <div className="flex w-fit items-center justify-center gap-3 rounded-[20px] bg-neutral-100 px-2 py-1">
      <div className="flex">
        {surveyParticipantList.map((participant) => {
          const imageSrc = `/images/avatar/${participant.color.toUpperCase() === 'SWEET_POTATO' ? 'sweetPotato' : participant.color.toUpperCase() !== 'NONE' ? participant.color.toLowerCase() : 'default'}.svg`;
          return (
            <div key={participant.userId} className="-mr-2 h-5 w-5 rounded-full bg-neutral-100">
              <Image alt="설문 참여자 프로필 아이콘" src={imageSrc} width={20} height={20} />
            </div>
          );
        })}
      </div>
      <p className="label-2 font-semibold text-orange-800">{`+${surveyParticipantList.length ?? []}`}</p>
    </div>
  );
};

export default AvatarList;
