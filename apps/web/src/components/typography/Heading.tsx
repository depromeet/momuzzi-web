import { JSX } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/cn';

const headingVariants = cva('type-gradient font-bold whitespace-pre-line text-transparent', {
  variants: {
    level: {
      h1: 'heading-1',
      h2: 'heading-2',
      h3: 'heading-3',
      h4: 'heading-4',
    },
  },
  defaultVariants: {
    level: 'h3',
  },
});

interface HeadingProps extends VariantProps<typeof headingVariants> {
  level?: 'h1' | 'h2' | 'h3' | 'h4';
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  className?: string;
}

const Heading = ({ level = 'h3', as, children, className }: HeadingProps) => {
  const Tag = as ?? level;

  return <Tag className={cn(headingVariants({ level }), className)}>{children}</Tag>;
};

export default Heading;
