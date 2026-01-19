import { MapPin, MapPinned, Send } from 'lucide-react';
import Image from 'next/image';

import { Restaurant } from '@/app/events/[eventId]/result_refact/_models/result';
import { cn } from '@/lib/cn';

const colors = [
  {
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-500',
  },
  {
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-600',
  },
  {
    bgColor: 'bg-green-100',
    textColor: 'text-green-600',
  },
  {
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-600',
  },
  {
    bgColor: 'bg-pink-100',
    textColor: 'text-pink-600',
  },
  {
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-600',
  },
];

interface FanCardProps {
  restaurant: Restaurant;
}
const FanCard = ({ restaurant }: FanCardProps) => {
  return (
    <div
      key={restaurant.id}
      className={cn(
        'mx-auto h-fit w-[12.25rem] shrink-0 snap-center overflow-hidden rounded-[0.625rem] bg-white transition-all duration-500'
      )}
      style={{
        boxShadow: '0 4px 40px 4px rgba(255, 79, 20, 0.32)',
      }}
    >
      <div className="relative h-[13.5rem] w-full">
        <Image
          src={restaurant.image}
          alt={restaurant.name}
          fill
          sizes="300px"
          priority
          className="z-10 object-cover"
        />
      </div>
      <div className="flex flex-col gap-1 px-2 pt-2 pb-3">
        <div className="flex flex-row items-center gap-2">
          <span className="flex-grow text-xs font-bold text-orange-900">{restaurant.name}</span>
          <div className="flex flex-row items-center gap-3">
            <MapPinned className="h-3 w-3 text-neutral-800" absoluteStrokeWidth strokeWidth={1} />
            <Send className="h-3.5 w-3.5 text-neutral-800" absoluteStrokeWidth strokeWidth={0.5} />
          </div>
        </div>
        <div className="flex flex-row items-center gap-1">
          <MapPin className="h-2 w-2 text-neutral-1000" absoluteStrokeWidth strokeWidth={0.5} />
          <span className="text-[0.5rem] leading-3 font-normal text-neutral-1000">
            {restaurant.location}
          </span>
        </div>
        <div className="flex flex-row items-center gap-1">
          <span className="text-[0.5rem] leading-3 font-semibold text-neutral-1000">
            {restaurant.status}
          </span>
          <span className="text-[0.5rem] leading-3 font-normal text-neutral-1000">
            {restaurant.lastOrder}
          </span>
        </div>
        <div className="flex flex-row flex-wrap gap-2 overflow-hidden">
          {restaurant.reason.slice(0, 3).map((reason, index) => {
            return (
              <span
                key={reason}
                className={cn(
                  'rounded-md px-1 py-0.5 text-[0.5rem] leading-3 font-medium',
                  colors[index % colors.length].bgColor,
                  colors[index % colors.length].textColor
                )}
              >
                {reason}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FanCard;
