import { ArrowUpRight } from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import { NavLink } from '@/components/ui/NavLink';
import { Container } from './Container';
import { siteNavigation } from './site-navigation';

const collectionLinks = siteNavigation.filter((item) => item.label !== 'Inicio');

export default function Footer() {
  return (
    <footer className="border-t border-[color:var(--color-border)] bg-[color:var(--color-muted)]">
      <Container className="py-12 sm:py-16">
        <div className="flex flex-col items-center gap-4 text-center">
          <Logo variant="full" height={88} className="mx-auto" />
          <p className="max-w-2xl text-sm leading-7 text-[color:var(--color-muted-foreground)] sm:text-base">
            Flores feitas a mao em chenille, uma a uma, com calma, para permanecer por perto.
          </p>
        </div>

        <div className="mt-10 grid gap-10 border-t border-[color:var(--color-border)] pt-10 lg:grid-cols-[1.2fr,0.9fr,0.9fr]">
          <div className="space-y-4">
            <h2 className="text-sm font-medium text-[color:var(--color-vinho)]">
              Amaranthos Atelie
            </h2>
            <p className="text-sm leading-7 text-[color:var(--color-muted-foreground)] sm:text-base">
              Um atelie artesanal em Recife, com pecas que carregam tempo, afeto e um cuidado mais
              intimo com cada flor.
            </p>
            <address className="text-sm text-[color:var(--color-muted-foreground)] not-italic">
              Jordao Baixo, Recife, PE
            </address>
          </div>

          <div>
            <h2 className="text-sm font-medium text-[color:var(--color-vinho)]">Colecao</h2>
            <nav className="mt-4 flex flex-col gap-3">
              {collectionLinks.map((item) => (
                <NavLink key={item.href} href={item.href} variant="footer">
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <h2 className="text-sm font-medium text-[color:var(--color-vinho)]">Acompanhar</h2>
            <a
              href="https://instagram.com/amaranthos"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[color:var(--color-muted-foreground)] transition-colors duration-[var(--duration-fast)] hover:text-[color:var(--color-vinho)]"
            >
              @amaranthos
              <ArrowUpRight className="size-4" strokeWidth={1.5} />
            </a>
            <p className="text-sm leading-7 text-[color:var(--color-muted-foreground)]">
              O site segue em construcao, mas a base visual ja acompanha o tom do atelie.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-[color:var(--color-border)] pt-6 text-sm text-[color:var(--color-muted-foreground)] sm:flex-row sm:items-center sm:justify-between">
          <p>Flores que nao murcham, feitas a mao.</p>
          <p>Amaranthos Atelie</p>
        </div>
      </Container>
    </footer>
  );
}
