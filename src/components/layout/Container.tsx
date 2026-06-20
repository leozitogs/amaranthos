import type { ElementType, HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const containerVariants = cva('mx-auto w-full px-4 sm:px-6 lg:px-12', {
  variants: {
    size: {
      default: 'max-w-7xl',
      narrow: 'max-w-5xl',
      wide: 'max-w-[88rem]',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

type ContainerProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof containerVariants> & {
    as?: ElementType;
  };

export function Container({ as: Component = 'div', size, className, ...props }: ContainerProps) {
  return <Component className={cn(containerVariants({ size }), className)} {...props} />;
}
