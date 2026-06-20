import type { AnchorHTMLAttributes, ButtonHTMLAttributes, PropsWithChildren } from 'react';
import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-full border text-sm font-medium transition-colors duration-[var(--duration-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-background)] disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
  {
    variants: {
      variant: {
        primary:
          'border-transparent bg-[color:var(--color-primary)] text-[color:var(--color-primary-foreground)] hover:bg-[color:var(--color-vinho-escuro)]',
        secondary:
          'border-[color:var(--color-border)] bg-[color:var(--color-card)] text-[color:var(--color-vinho)] hover:bg-[color:var(--color-muted)]',
        ghost:
          'border-transparent bg-transparent text-[color:var(--color-vinho)] hover:bg-[color:var(--color-muted)]',
      },
      size: {
        default: 'h-11 px-5',
        sm: 'h-10 px-4',
        icon: 'size-10 p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

type CommonProps = PropsWithChildren<VariantProps<typeof buttonVariants> & { className?: string }>;

type ButtonLinkProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'className'> & {
    href: string;
  };

type ButtonButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'> & {
    href?: undefined;
  };

function isExternalHref(href: string) {
  return href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:');
}

export function Button(props: ButtonLinkProps | ButtonButtonProps) {
  if ('href' in props && props.href) {
    const { href, variant, size, className, children, rel, ...anchorProps } = props;
    const classes = cn(buttonVariants({ variant, size }), className);

    if (isExternalHref(href)) {
      const safeRel = anchorProps.target === '_blank' ? (rel ?? 'noreferrer') : rel;

      return (
        <a href={href} rel={safeRel} className={classes} {...anchorProps}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} rel={rel} {...anchorProps}>
        {children}
      </Link>
    );
  }

  const {
    variant,
    size,
    className,
    children,
    type = 'button',
    ...buttonProps
  } = props as ButtonButtonProps;

  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
