'use client';

import { HeroSlideshow, type HeroSlide } from '@/components/shared/HeroSlideshow';

const slides: HeroSlide[] = [
  {
    title: 'Slab Sawing',
    description:
      'Precision cutting through concrete slabs for mechanical, electrical, and plumbing installations with minimal disturbance.',
    image: '/slides/coring-slab-sawing.svg',
  },
  {
    title: 'Core Drilling',
    description:
      'Expert drilling to create precise holes through concrete for utilities and structural modifications.',
    image: '/slides/coring-core-drilling.svg',
  },
  {
    title: 'Concrete Grinding',
    description:
      'Surface preparation and finishing through controlled grinding to achieve smooth, even concrete surfaces.',
    image: '/slides/coring-concrete-grinding.svg',
  },
  {
    title: 'Wire Sawing',
    description:
      'Advanced wire cutting technology for complex concrete separation and precision demolition work.',
    image: '/slides/coring-wire-sawing.svg',
  },
  {
    title: 'Wall Sawing',
    description:
      'Specialized wall cutting services for openings, alterations, and structural modifications.',
    image: '/slides/coring-wall-sawing.svg',
  },
  {
    title: 'Breaking & Removal',
    description:
      'Controlled concrete breaking and removal services with proper waste management and site cleanup.',
    image: '/slides/coring-breaking-removal.svg',
  },
];

export function CoringHero() {
  return (
    <HeroSlideshow
      sectionId="coring-hero"
      eyebrow="Coring Services"
      slides={slides}
      overlayGradientClassName="absolute inset-0 bg-gradient-to-r from-slate-950/92 via-orange-950/70 to-slate-900/30"
      radialGradientClassName="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_26%,rgba(234,88,12,0.24),transparent_42%),radial-gradient(circle_at_82%_75%,rgba(20,184,166,0.16),transparent_36%)]"
    />
  );
}
