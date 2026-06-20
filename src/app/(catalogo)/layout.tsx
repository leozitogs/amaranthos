import { Container } from '@/components/layout/Container';

export default function CatalogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-creme min-h-screen py-12">
      <Container>{children}</Container>
    </div>
  );
}
