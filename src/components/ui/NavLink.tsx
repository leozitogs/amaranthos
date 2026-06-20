import type { ComponentPropsWithoutRef } from 'react';
import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const navLinkVariants = cva(
  'inline-flex items-center rounded-full transition-colors duration-[var(--duration-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-background)]',
  {
    variants: {
      variant: {
        default:
          'px-3 py-2 text-sm text-[color:var(--color-muted-foreground)] hover:bg-[color:var(--color-muted)] hover:text-[color:var(--color-vinho)]',
        pill: 'whitespace-nowrap border border-[color:var(--color-border)] bg-[color:var(--color-card)] px-3.5 py-2 text-sm text-[color:var(--color-vinho)] hover:bg-[color:var(--color-muted)]',
        footer:
          'text-sm text-[color:var(--color-muted-foreground)] hover:text-[color:var(--color-vinho)]',
      },
      current: {
        true: 'text-[color:var(--color-vinho)]',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      current: false,
    },
  }
);

type NavLinkProps = ComponentPropsWithoutRef<typeof Link> & VariantProps<typeof navLinkVariants>;

export function NavLink({ className, variant, current, ...props }: NavLinkProps) {
  return <Link className={cn(navLinkVariants({ variant, current }), className)} {...props} />;
}
