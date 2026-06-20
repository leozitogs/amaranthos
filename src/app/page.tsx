import Hero from '@/sections/Hero/Hero';
import CatalogPreview from '@/sections/CatalogPreview/CatalogPreview';
import Sobre from '@/sections/Sobre/Sobre';
import Contato from '@/sections/Contato/Contato';

export default function Home() {
  return (
    <div className="flex w-full flex-col overflow-hidden">
      <Hero />
      <CatalogPreview />
      <Sobre />
      <Contato />
    </div>
  );
}
