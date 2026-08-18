import { SiteHeader } from '@/components/layout/SiteHeader';
import { CoringHero } from '@/components/coring/CoringHero';
import { CoringServices } from '@/components/coring/CoringServices';

type CoringPageProps = {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string>>;
};

export const metadata = {
  title: 'Professional Coring Services in Ottawa | Concrete Sawing & Drilling',
  description:
    'Expert concrete coring services in Ottawa including slab sawing, core drilling, concrete grinding, wire sawing, wall sawing, and breaking & removal. Get a quote today.',
  openGraph: {
    title: 'Professional Coring Services in Ottawa | Constein Group',
    description: 'Expert concrete coring solutions for construction projects. Precision sawing, drilling, and removal services.',
  },
};

export default async function CoringPage({ params, searchParams }: CoringPageProps) {
  // Await params and searchParams as required by Next.js
  await params;
  await searchParams;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <SiteHeader />
      <CoringHero />
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        <CoringServices />
      </div>
    </div>
  );
}
