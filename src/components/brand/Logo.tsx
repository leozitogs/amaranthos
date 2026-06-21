import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';

const logoAssets = {
  full: {
    src: '/assets/brand/logo/amaranthos-logo.svg',
    width: 1440,
    height: 810,
    alt: 'Logotipo da Amaranthos Atelie',
  },
  wordmark: {
    src: '/assets/brand/tipografia/amaranthos-tipografia.svg',
    width: 388,
    height: 139,
    alt: 'Tipografia da Amaranthos Atelie',
  },
} as const;

type LogoProps = Omit<ComponentPropsWithoutRef<'img'>, 'src' | 'alt' | 'width' | 'height'> & {
  variant?: keyof typeof logoAssets;
  height?: number;
  decorative?: boolean;
  alt?: string;
};

export function Logo({
  variant = 'full',
  height = 80,
  decorative = false,
  alt,
  className,
  style,
  loading = 'lazy',
  ...props
}: LogoProps) {
  const asset = logoAssets[variant];
  const width = Math.round((asset.width / asset.height) * height);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset.src}
      alt={decorative ? '' : (alt ?? asset.alt)}
      aria-hidden={decorative ? true : undefined}
      role={decorative ? 'presentation' : undefined}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
      draggable={false}
      className={cn('block h-auto w-auto max-w-full select-none', className)}
      style={{ height, width: 'auto', ...style }}
      {...props}
    />
  );
}
