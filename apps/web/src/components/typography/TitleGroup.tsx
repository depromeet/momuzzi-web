import { JSX } from 'react';

import { cn } from '@/lib/cn';

import Heading from './Heading';
import Text from './Text';

interface TitleGroupProps {
  title: string;
  description?: React.ReactNode;
  align?: 'left' | 'center';
  level?: 'h1' | 'h2' | 'h3' | 'h4';
  wrapperAs?: keyof JSX.IntrinsicElements;
  headingAs?: keyof JSX.IntrinsicElements;
  className?: string;
}

const TitleGroup = ({
  title,
  description,
  align = 'left',
  className,
  wrapperAs,
  headingAs,
  level = 'h3',
}: TitleGroupProps) => {
  const Wrapper = wrapperAs ?? 'header';

  return (
    <Wrapper
      className={cn(
        'flex flex-col gap-1',
        align === 'center' ? 'text-center' : 'text-left',
        className
      )}
    >
      <Heading level={level} as={headingAs}>
        {title}
      </Heading>
      {description && <Text>{description}</Text>}
    </Wrapper>
  );
};

export default TitleGroup;
