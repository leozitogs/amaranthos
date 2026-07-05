import type { Metadata } from 'next';
import { mainstay, moontime, dmSans, inter, viaodaLibre, poppins, sugoProDisplay } from '@/styles/fonts';
import './globals.css';
import Header from '@/components/layout/Header';
// Footer oculto temporariamente durante a construcao passo a passo do hero.
// Retorna quando a Secao 2 (subida para as nuvens) existir.
// import Footer from '@/components/layout/Footer';
import { LenisProvider } from '@/components/providers/LenisProvider';

export const metadata: Metadata = {
  title: 'Amaranthos Atelie - Flores que nao murcham',
  description:
    'Flores feitas a mao em hastes de chenille que nao murcham. Atelie artesanal premium em Recife, PE.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${mainstay.variable} ${moontime.variable} ${dmSans.variable} ${inter.variable} ${viaodaLibre.variable} ${poppins.variable} ${sugoProDisplay.variable}`}
    >
      <body className="flex min-h-screen flex-col antialiased">
        <LenisProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          {/* <Footer /> oculto temporariamente, ver nota no import acima. */}
        </LenisProvider>
      </body>
    </html>
  );
}
