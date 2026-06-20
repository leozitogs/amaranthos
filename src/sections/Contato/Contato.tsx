import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

export default function Contato() {
  return (
    <section
      id="contato"
      className="border-t border-[color:var(--color-border)] bg-[color:var(--color-muted)] py-20"
    >
      <Container>
        <div className="mx-auto flex max-w-2xl flex-col items-center space-y-6 text-center">
          <div className="mb-2">
            <Image
              src="/assets/brand/circle_isotipo.svg"
              alt="Selo Amaranthos"
              width={100}
              height={100}
              className="mx-auto"
            />
          </div>
          <h2 className="font-mainstay text-vinho text-3xl sm:text-4xl">Leve o afeto para casa</h2>
          <p className="text-grafite/80 font-dm-sans text-base leading-relaxed">
            Tem alguma ideia em mente ou deseja encomendar uma de nossas pecas? Fale comigo
            diretamente pelo WhatsApp para alinharmos os detalhes, cores e prazos.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button href="https://wa.me/5581999999999" target="_blank" rel="noreferrer">
              Falar no WhatsApp
              <ArrowUpRight className="size-4" />
            </Button>
            <Button
              href="https://instagram.com/amaranthos"
              target="_blank"
              rel="noreferrer"
              variant="secondary"
            >
              Ver no Instagram
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
