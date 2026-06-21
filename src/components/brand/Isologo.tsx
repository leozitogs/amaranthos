import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';

const isologoAssets = {
  default: {
    src: '/assets/brand/isologo/amaranthos-isologo.svg',
    alt: 'Isologo da Amaranthos Atelie',
  },
  outline: {
    src: '/assets/brand/isologo/amaranthos-isologo-sem-contorno.svg',
    alt: 'Isologo vazado da Amaranthos Atelie',
  },
} as const;

type IsologoProps = Omit<ComponentPropsWithoutRef<'img'>, 'src' | 'alt' | 'width' | 'height'> & {
  size?: number;
  variant?: keyof typeof isologoAssets;
  decorative?: boolean;
  alt?: string;
};

export function Isologo({
  size = 40,
  variant = 'default',
  decorative = false,
  alt,
  className,
  style,
  loading = 'lazy',
  ...props
}: IsologoProps) {
  const asset = isologoAssets[variant];

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset.src}
      alt={decorative ? '' : (alt ?? asset.alt)}
      aria-hidden={decorative ? true : undefined}
      role={decorative ? 'presentation' : undefined}
      width={size}
      height={size}
      loading={loading}
      decoding="async"
      draggable={false}
      className={cn('block shrink-0 select-none', className)}
      style={{ width: size, height: size, ...style }}
      {...props}
    />
  );
}
