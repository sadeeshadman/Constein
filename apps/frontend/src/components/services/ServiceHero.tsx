import type { Service } from '@/lib/services';

type ServiceHeroProps = {
  service: Service;
};

const serviceThemes: Record<string, string> = {
  'home-inspection': 'from-blue-950/95 via-slate-950/85 to-cyan-950/45',
  'property-management': 'from-teal-950/95 via-slate-950/85 to-emerald-950/45',
  construction: 'from-indigo-950/95 via-slate-950/85 to-slate-900/45',
};

export function ServiceHero({ service }: Readonly<ServiceHeroProps>) {
  const theme =
    serviceThemes[service.slug] ?? 'from-slate-950/95 via-slate-950/85 to-orange-950/45';

  return (
    <section className="relative overflow-hidden border-b border-slate-700/70">
      <div className={`absolute inset-0 bg-gradient-to-br ${theme}`} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(45,212,191,0.18),transparent_36%),radial-gradient(circle_at_20%_80%,rgba(99,102,241,0.16),transparent_40%)]" />
      <div className="relative mx-auto flex min-h-[52vh] w-full max-w-6xl items-end px-6 py-16 md:min-h-[58vh] md:px-10 md:py-24">
        <div className="max-w-4xl">
          <p className="animate-fade-up text-sm font-semibold tracking-[0.28em] text-slate-300 uppercase">
            Constein Group Services
          </p>
          <h1 className="animate-fade-up-delay-1 mt-4 font-serif text-4xl leading-tight text-white md:text-6xl">
            {service.name}
          </h1>
          <p className="animate-fade-up-delay-2 mt-5 max-w-3xl text-base leading-8 text-slate-100 md:text-xl">
            {service.overview}
          </p>
        </div>
      </div>
    </section>
  );
}
