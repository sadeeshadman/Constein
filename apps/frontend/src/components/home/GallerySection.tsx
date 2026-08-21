'use client';

import { HeroSlideshow, type HeroSlide } from '@/components/shared/HeroSlideshow';

const slides: HeroSlide[] = [
  {
    title: 'Home Inspection',
    description:
      'Detailed inspections that reveal hidden issues early and provide clear recommendations for safer decisions.',
    image: '/slides/home-inspection.svg',
  },
  {
    title: 'Property Management',
    description:
      'Proactive support for day-to-day operations, maintenance planning, and long-term property performance.',
    image: '/slides/property-management.svg',
  },
  {
    title: 'Construction Services',
    description:
      'Reliable execution for renovations and upgrades with consistent quality control and timeline discipline.',
    image: '/slides/construction-services.svg',
  },
  {
    title: 'Engineering Consultants',
    description:
      'Technical guidance for structural and systems planning so each project stays safe, compliant, and efficient.',
    image: '/slides/engineering-consultants.svg',
  },
];

export function GallerySection() {
  return (
    <HeroSlideshow
      sectionId="home"
      eyebrow="Constein Group"
      slides={slides}
      overlayGradientClassName="absolute inset-0 bg-gradient-to-r from-slate-950/92 via-indigo-950/70 to-slate-900/30"
      radialGradientClassName="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_26%,rgba(99,102,241,0.24),transparent_42%),radial-gradient(circle_at_82%_75%,rgba(20,184,166,0.16),transparent_36%)]"
    />
  );
}
