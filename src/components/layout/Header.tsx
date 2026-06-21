'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Isologo } from '@/components/brand/Isologo';
import { cn } from '@/lib/utils';
import { Container } from './Container';
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
        'group relative inline-flex items-center py-1 text-sm font-light transition-colors duration-[var(--duration-fast)] [transition-timing-function:var(--ease-expo)] focus-visible:ring-2 focus-visible:ring-[color:var(--color-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-creme)] focus-visible:outline-none',
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'animate-header-in fixed inset-x-0 top-0 z-[60] transition-colors duration-300',
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
      <Container>
        <div className="grid min-h-[72px] grid-cols-[1fr_auto_1fr] items-center gap-4 pb-2">
          <nav aria-label="Navegacao principal" className="flex items-center justify-end gap-7">
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
            className="flex items-center justify-center rounded-full focus-visible:ring-2 focus-visible:ring-[color:var(--color-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-creme)] focus-visible:outline-none"
          >
            <Isologo size={56} loading="eager" alt="Amaranthos Atelie" />
          </Link>

          <nav aria-label="Navegacao secundaria" className="flex items-center justify-start gap-7">
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
      </Container>
    </header>
  );
}
