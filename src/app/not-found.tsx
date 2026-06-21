import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="bg-creme text-grafite flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6">
        <Image
          src="/assets/brand/isologo/amaranthos-isologo-sem-contorno.svg"
          alt="Flor perdida"
          width={120}
          height={120}
          className="mx-auto"
          priority
        />
      </div>
      <h1 className="font-mainstay text-vinho mb-4 text-4xl">Flor fora do jardim</h1>
      <p className="text-grafite font-dm-sans mb-8 max-w-md">
        Esta pagina nao existe ou foi colhida antes de sua visita. Retorne para a pagina inicial
        para ver as flores que estao florindo.
      </p>
      <Link
        href="/"
        className="bg-vinho text-creme hover:bg-vinho-escuro font-dm-sans rounded-full px-6 py-3 font-medium transition-colors duration-250"
      >
        Voltar para o atelie
      </Link>
    </div>
  );
}
