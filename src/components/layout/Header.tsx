import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Isologo } from '@/components/brand/Isologo';
import { Logo } from '@/components/brand/Logo';
import { Button } from '@/components/ui/Button';
import { NavLink } from '@/components/ui/NavLink';
import { Container } from './Container';
import { siteNavigation } from './site-navigation';

const headerNavigation = siteNavigation.filter((item) => item.label !== 'Inicio');

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--color-border)] bg-[color:var(--color-background)]">
      <Container className="py-4 sm:py-5">
        <div className="flex items-center gap-4">
          <Link
            href="/#inicio"
            aria-label="Amaranthos Atelie, voltar para o inicio"
            className="flex min-w-0 flex-1 items-center gap-3"
          >
            <Isologo size={40} decorative loading="eager" />
            <div className="min-w-0">
              <Logo variant="wordmark" height={36} decorative loading="eager" />
              <p className="mt-1 text-xs text-[color:var(--color-muted-foreground)]">
                flores feitas a mao em Recife
              </p>
            </div>
          </Link>

          <span className="hidden rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-card)] px-3 py-1 text-xs text-[color:var(--color-vinho)] xl:inline-flex">
            feito a mao em Recife
          </span>

          <nav className="hidden items-center gap-1 lg:flex">
            {headerNavigation.map((item) => (
              <NavLink key={item.href} href={item.href}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <Button href="/#buques" size="sm" className="shrink-0">
            ver colecao
            <ArrowRight className="size-4" strokeWidth={1.5} />
          </Button>
        </div>

        <nav className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:hidden">
          {siteNavigation.map((item) => (
            <NavLink key={item.href} href={item.href} variant="pill">
              {item.label}
            </NavLink>
          ))}
        </nav>
      </Container>
    </header>
  );
}
