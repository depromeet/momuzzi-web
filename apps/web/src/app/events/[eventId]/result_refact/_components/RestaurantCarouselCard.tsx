import { motion } from 'framer-motion';
import { MapPin, MapPinned, Send } from 'lucide-react';
import Image from 'next/image';

import { Restaurant } from '@/app/events/[eventId]/result_refact/_models/result';
import ThumbsUpTagIcon from '@/components/icons/ThumbsUpTagIcon';
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

interface RestaurantCardProps {
  restaurant: Restaurant;
  index: number;
  isActive: boolean;
}

const RestaurantCarouselCard = ({ restaurant, isActive }: RestaurantCardProps) => {
  return (
    <motion.div
      key={restaurant.id}
      className={cn(
        'mx-auto flex h-[28.25rem] w-[19.75rem] shrink-0 snap-center flex-col overflow-hidden rounded-2xl bg-white transition-all duration-500',
        !isActive && 'opacity-40'
      )}
    >
      <div className="relative flex w-full flex-grow">
        {isActive && (
          <div className="absolute top-6 left-0 z-20 flex flex-row gap-2 rounded-r-lg px-3 py-2 chip-gradient">
            <ThumbsUpTagIcon className="h-5 w-5" />
            <span className="text-[0.9375rem] leading-5 font-semibold text-white">강력추천</span>
          </div>
        )}

        <Image
          src={restaurant.image}
          alt={restaurant.name}
          fill
          sizes="400px"
          priority
          className="z-10 object-cover"
        />
      </div>
      <div className="flex flex-col gap-1 px-4 transition-all duration-500">
        <div className="flex flex-row items-center gap-2 pt-4 pb-2">
          <span className="flex-grow text-[1.125rem] leading-7 font-bold text-orange-900">
            {restaurant.name}
          </span>
          <div className="flex flex-row items-center gap-3">
            <MapPinned className="h-5 w-5 text-neutral-800" absoluteStrokeWidth strokeWidth={1.5} />
            <Send className="h-5 w-5 text-neutral-800" absoluteStrokeWidth strokeWidth={1.5} />
          </div>
        </div>
        <div className="flex flex-row items-center gap-1">
          <MapPin className="h-4 w-4 text-neutral-500" absoluteStrokeWidth strokeWidth={1} />
          <span className="label-2 font-medium text-neutral-1200">{restaurant.location}</span>
        </div>
        <div className="flex flex-row items-center gap-1">
          <span className="label-2 font-semibold text-blue-700">{restaurant.status}</span>
          <span className="label-2 font-medium text-neutral-1200">{restaurant.lastOrder}</span>
        </div>
        <div className="flex flex-row flex-wrap gap-2 pt-2 pb-4">
          {restaurant.reason.map((reason, index) => {
            return (
              <span
                key={reason}
                className={cn(
                  'rounded-md px-1.5 py-[0.1875rem] label-1 font-medium',
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
    </motion.div>
  );
};

export default RestaurantCarouselCard;
