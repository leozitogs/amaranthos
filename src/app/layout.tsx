import type { Metadata } from 'next';
import { mainstay, moontime, dmSans, inter } from '@/styles/fonts';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Amaranthos Atelie | Flores que nao murcham',
  description:
    'Flores feitas a mao em hastes de chenille que nao murcham. Atelie artesanal premium em Recife, PE.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${mainstay.variable} ${moontime.variable} ${dmSans.variable} ${inter.variable}`}
    >
      <body className="flex min-h-screen flex-col antialiased">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
