import Image from 'next/image';
import { Container } from '@/components/layout/Container';

export default function Sobre() {
  return (
    <section id="sobre" className="bg-creme border-t border-[color:var(--color-border)] py-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <h2 className="font-mainstay text-vinho text-3xl sm:text-4xl">
              Flores feitas para durar
            </h2>
            <p className="text-grafite/80 font-dm-sans text-base leading-relaxed">
              A Amaranthos nasceu no Jordao Baixo, em Recife, do desejo de transformar afeto em algo
              permanente. Cada haste de limpador de canudo (chenille) e moldada a mao, petala por
              petala, em um processo calmo e singular.
            </p>
            <p className="text-grafite/80 font-dm-sans text-base leading-relaxed">
              O nome vem do amaranto, a flor lendaria que dizem nunca murchar. Nossas pecas nao
              competem com a beleza do efemero, elas celebram a permanencia de uma lembranca.
            </p>
            <div className="pt-4">
              <Image
                src="/assets/brand/gisele_estefane.svg"
                alt="Assinatura Gisele Estefane"
                width={150}
                height={50}
                className="opacity-80"
              />
              <p className="text-grafite/60 font-dm-sans mt-2 text-xs">Fundadora e artesa</p>
            </div>
          </div>
          <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-card)] p-8">
            <Image
              src="/assets/brand/isologo_vazado.svg"
              alt="Mascote Amaranthos"
              width={200}
              height={200}
              className="opacity-20"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
