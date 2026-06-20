import { Container } from '@/components/layout/Container';

export default function PersonalizarPage() {
  return (
    <div className="bg-creme min-h-screen py-12">
      <Container className="space-y-6">
        <h1 className="font-mainstay text-vinho text-4xl">Personalizar</h1>
        <p className="text-grafite font-dm-sans max-w-xl text-base">
          Quando o que voce tem em mente nao cabe no catalogo. Monte seu arranjo sob medida com a
          ajuda da Gisele.
        </p>
        <div className="text-grafite/60 rounded-2xl border border-dashed border-[color:var(--color-border)] bg-white p-8 text-center">
          Configurador virtual de buques personalizado em construcao. Em breve voce podera montar
          sua combinacao ideal aqui.
        </div>
      </Container>
    </div>
  );
}
