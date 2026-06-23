'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Isologo } from '@/components/brand/Isologo';
import { cn } from '@/lib/utils';
import { primaryNavigation } from './primary-navigation';

const leftNav = primaryNavigation.filter((item) => item.side === 'left');
const rightNav = primaryNavigation.filter((item) => item.side === 'right');

function NavItem({
  href,
  label,
  isScrolled,
}: {
  href: string;
  label: string;
  isScrolled: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group relative inline-flex items-center py-1 font-poppins text-sm font-light tracking-wide transition-colors duration-[var(--duration-fast)] [transition-timing-function:var(--ease-expo)] focus-visible:ring-2 focus-visible:ring-[color:var(--color-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-creme)] focus-visible:outline-none',
        isScrolled ? 'text-grafite/90 hover:text-vinho' : 'text-creme/90 hover:text-white'
      )}
    >
      {label}
      <span
        aria-hidden
        className="bg-menta absolute -bottom-0.5 left-0 h-px w-0 transition-[width] duration-[var(--duration-fast)] [transition-timing-function:var(--ease-expo)] group-hover:w-full"
      />
    </Link>
  );
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [heroRevealed, setHeroRevealed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as unknown as { __heroRevealed?: boolean }).__heroRevealed) {
      setHeroRevealed(true);
      return;
    }

    const handleReveal = () => setHeroRevealed(true);
    window.addEventListener('hero-revealed', handleReveal);
    return () => window.removeEventListener('hero-revealed', handleReveal);
  }, []);

  return (
    <motion.header
      initial={{ y: -88, opacity: 0 }}
      animate={heroRevealed ? { y: 0, opacity: 1 } : { y: -88, opacity: 0 }}
      transition={{
        duration: 1.0,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        'fixed inset-x-0 top-0 z-[60] transition-colors duration-300',
        isScrolled
          ? 'bg-creme/80 shadow-sm backdrop-blur-md'
          : '[background-color:rgba(253,247,241,0.08)]'
      )}
      style={{
        // Topo: fade levissimo, SEM blur (sem borrao sobre a cena). A presenca
        // vem do creme translucido a 8 por cento dissolvido pela mascara alpha.
        // Scrolled: ganha blur-md e mais corpo para legibilidade sobre o creme.
        // Dissolucao por mascara de transparencia (canal alpha), nao gradiente de cor:
        // a superficie e Creme translucido chapado; so o alpha decai na base.
        maskImage:
          'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 62%, rgba(0,0,0,0) 100%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 62%, rgba(0,0,0,0) 100%)',
      }}
    >
      <div className="mx-auto w-full px-6 sm:px-10 lg:px-[12.5vw]">
        <div className="grid min-h-[88px] grid-cols-[1fr_auto_1fr] items-center gap-8 py-2">
          <nav aria-label="Navegacao principal" className="flex w-full items-center justify-between">
            {leftNav.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                label={item.label}
                isScrolled={isScrolled}
              />
            ))}
          </nav>

          <Link
            href="/#inicio"
            aria-label="Amaranthos Atelie, voltar para o inicio"
            className="flex items-center justify-center rounded-full focus-visible:ring-2 focus-visible:ring-[color:var(--color-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-creme)] focus-visible:outline-none transition-transform duration-200 hover:scale-105"
          >
            <motion.div
              initial={{ rotate: 0, scale: 0, opacity: 0 }}
              animate={
                heroRevealed
                  ? { rotate: 360, scale: [0, 1.15, 1], opacity: 1 }
                  : { rotate: 0, scale: 0, opacity: 0 }
              }
              transition={{
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.15,
              }}
              className="relative flex h-16 w-16 items-center justify-center shadow-[var(--shadow-sm)]"
            >
              <Isologo size={48} loading="eager" alt="Amaranthos Atelie" />
            </motion.div>
          </Link>

          <nav aria-label="Navegacao secundaria" className="flex w-full items-center justify-between">
            {rightNav.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                label={item.label}
                isScrolled={isScrolled}
              />
            ))}
          </nav>
        </div>
      </div>
    </motion.header>
  );
}
