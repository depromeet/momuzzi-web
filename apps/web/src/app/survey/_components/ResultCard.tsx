'use client';

import { useEffect } from 'react';

import Image from 'next/image';

import { Heading, Text } from '@/components/typography';
import { useConfetti } from '@/hooks/useConfetti';

interface ResultCardProps {
  title: string;
  subtitle: string;
  showConfetti?: boolean;
}

const ResultCard = ({ title, subtitle, showConfetti = false }: ResultCardProps) => {
  const { celebrate } = useConfetti();

  useEffect(() => {
    if (showConfetti) {
      celebrate();
    }
  }, [showConfetti, celebrate]);

  return (
    <div className="flex flex-col items-center justify-center">
      <Image src={'/firecracker.png'} alt="폭죽 이미지" width={156} height={156} />

      <div className="mt-4 flex flex-col items-center gap-2">
        <Heading>{title}</Heading>
        <Text className="text-center whitespace-pre-line text-[#757575]">{subtitle}</Text>
      </div>
    </div>
  );
};

export default ResultCard;
