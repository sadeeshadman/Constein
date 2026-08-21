import { notFound, redirect } from 'next/navigation';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { ServiceDetail } from '@/components/services/ServiceDetail';
import { ServiceHero } from '@/components/services/ServiceHero';
import { getServiceBySlug, services } from '@/lib/services';

type ServicePageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ subservice?: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Readonly<ServicePageProps>) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {};
  }

  return {
    title: `${service.name} in Ottawa | Constein Group`,
    description: service.overview,
    openGraph: {
      title: `${service.name} in Ottawa | Constein Group`,
      description: service.shortDescription,
    },
  };
}

export default async function ServicePage({ params, searchParams }: Readonly<ServicePageProps>) {
  const { slug } = await params;
  const { subservice } = await searchParams;

  if (slug === 'construction-services') {
    redirect('/construction');
  }

  if (slug === 'engineering-consultants') {
    redirect('/coring');
  }

  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const initialExpandedSubserviceId =
    subservice && service.subservices.some((item) => item.id === subservice) ? subservice : null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <SiteHeader />
      <ServiceHero service={service} />
      <ServiceDetail
        key={`${service.slug}:${initialExpandedSubserviceId ?? 'none'}`}
        service={service}
        initialExpandedSubserviceId={initialExpandedSubserviceId}
      />
    </div>
  );
}
