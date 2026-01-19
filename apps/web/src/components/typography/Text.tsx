import { cn } from '@/lib/cn';

interface TextProps {
  children: React.ReactNode;
  className?: string;
}

const Text = ({ children, className }: TextProps) => {
  return <p className={cn('body-3 font-medium text-neutral-800', className)}>{children}</p>;
};

export default Text;
