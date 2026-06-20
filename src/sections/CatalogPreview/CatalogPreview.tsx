import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/layout/Container';

const previewSections = [
  {
    id: 'buques',
    label: 'Buques',
    href: '/buques',
    note: '6 composicoes',
    description: 'Seis composicoes configuraveis, pensadas flor por flor.',
  },
  {
    id: 'flores-avulsas',
    label: 'Flores avulsas',
    href: '/flores-avulsas',
    note: '3 formatos',
    description: 'Tres formatos de embalagem para gestos menores e mais intimos.',
  },
  {
    id: 'centros-de-mesa',
    label: 'Centros de mesa',
    href: '/centros-de-mesa',
    note: '3 tamanhos',
    description: 'Pecas com vaso em chenille, feitas para permanecer sobre a mesa.',
  },
  {
    id: 'chaveiros',
    label: 'Chaveiros',
    href: '/chaveiros',
    note: '16 flores',
    description: 'Miniaturas leves para levar a flor por perto, todos os dias.',
  },
  {
    id: 'personalizar',
    label: 'Personalizar',
    href: '/personalizar',
    note: 'sob medida',
    description: 'Quando a ideia nao cabe no catalogo e precisa de outro formato.',
  },
] as const;

export default function CatalogPreview() {
  return (
    <section
      id="buques"
      className="border-t border-[color:var(--color-border)] bg-[color:var(--color-muted)] py-20"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="space-y-4">
            <p className="text-sm font-medium text-[color:var(--color-vinho)]">Linhas do atelie</p>
            <h2 className="text-3xl leading-tight font-medium text-[color:var(--color-foreground)] sm:text-4xl">
              Nossas colecoes de chenille
            </h2>
            <p className="text-base leading-relaxed text-[color:var(--color-muted-foreground)]">
              Pecas exclusivas feitas para durar. Cada haste e moldada com o cuidado e carinho do
              fazer manual.
            </p>
          </div>

          <div className="overflow-hidden rounded-[28px] border border-[color:var(--color-border)] bg-[color:var(--color-card)]">
            <ol className="divide-y divide-[color:var(--color-border)]">
              {previewSections.map((section) => (
                <li
                  key={section.id}
                  className="hover:bg-creme/50 px-6 py-5 transition-colors duration-200 sm:px-8 sm:py-6"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                    <div className="space-y-1">
                      <h3 className="text-lg font-medium text-[color:var(--color-vinho)]">
                        {section.label}
                      </h3>
                      <p className="max-w-xl text-sm leading-relaxed text-[color:var(--color-muted-foreground)]">
                        {section.description}
                      </p>
                      <Link
                        href={section.href}
                        className="text-vinho hover:text-vinho-escuro mt-2 inline-flex items-center gap-1 text-xs font-semibold"
                      >
                        Ver detalhes
                        <ArrowRight className="size-3" />
                      </Link>
                    </div>
                    <span className="self-start rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-muted)] px-3 py-1 text-xs text-[color:var(--color-vinho)]">
                      {section.note}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
