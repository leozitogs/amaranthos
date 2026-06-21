import localFont from 'next/font/local';
import { DM_Sans, Inter } from 'next/font/google';

export const mainstay = localFont({
  src: [
    { path: '../../public/fonts/Mainstay/Mainstay.otf', weight: '400', style: 'normal' },
    { path: '../../public/fonts/Mainstay/Mainstay.ttf', weight: '400', style: 'normal' },
  ],
  variable: '--font-mainstay',
  display: 'swap',
});

export const moontime = localFont({
  src: '../../public/fonts/Moontime/moontime-regular.ttf',
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

export const viaodaLibre = localFont({
  src: '../../public/fonts/ViaodaLibre/ViaodaLibre-Regular.ttf',
  variable: '--font-viaoda-libre',
  display: 'swap',
  weight: '400',
  style: 'normal',
});

export const poppins = localFont({
  src: [
    { path: '../../public/fonts/Poppins/Poppins-Light.ttf', weight: '300', style: 'normal' },
    { path: '../../public/fonts/Poppins/Poppins-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../../public/fonts/Poppins/Poppins-Medium.ttf', weight: '500', style: 'normal' },
    { path: '../../public/fonts/Poppins/Poppins-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: '../../public/fonts/Poppins/Poppins-Bold.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-poppins',
  display: 'swap',
});
