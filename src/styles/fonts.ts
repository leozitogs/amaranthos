import localFont from 'next/font/local';
import { DM_Sans, Inter } from 'next/font/google';

export const mainstay = localFont({
  src: [
    { path: '../../public/fonts/Mainstay.otf', weight: '400', style: 'normal' },
    { path: '../../public/fonts/Mainstay.ttf', weight: '400', style: 'normal' },
  ],
  variable: '--font-mainstay',
  display: 'swap',
});

export const moontime = localFont({
  src: '../../public/fonts/moontime-regular.ttf',
  variable: '--font-moontime',
  display: 'swap',
  weight: '400',
  style: 'normal',
});

export const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['400', '500', '700'],
  display: 'swap',
});

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600'],
  display: 'swap',
});
