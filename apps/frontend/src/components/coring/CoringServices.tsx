'use client';

import { useState } from 'react';
import { QuoteRequestModal } from '@/components/modals/QuoteRequestModal';
import { SectionHeading } from '@/components/home/SectionHeading';

const coringSubservices = [
  {
    id: 'slab-sawing',
    name: 'Slab Sawing',
    description:
      'Precision cutting through concrete slabs for mechanical, electrical, and plumbing installations. Our controlled sawing technique minimizes dust and disturbance, ensuring accuracy for your project needs.',
  },
  {
    id: 'core-drilling',
    name: 'Core Drilling',
    description:
      'Expert drilling to create precise holes through concrete for utilities, structural modifications, and installation needs. We handle various diameters and depths with professional equipment and trained operators.',
  },
  {
    id: 'concrete-grinding',
    name: 'Concrete Grinding',
    description:
      'Surface preparation and finishing through controlled grinding to achieve smooth, even concrete surfaces. Perfect for floor preparation, finish work, and surface restoration.',
  },
  {
    id: 'wire-sawing',
    name: 'Wire Sawing',
    description:
      'Advanced wire cutting technology for complex concrete separation and precision demolition work. Ideal for intricate cuts and challenging projects where traditional methods are impractical.',
  },
  {
    id: 'wall-sawing',
    name: 'Wall Sawing',
    description:
      'Specialized wall cutting services for openings, alterations, and structural modifications. We create clean, precise openings in walls while maintaining structural integrity.',
  },
  {
    id: 'breaking-removal',
    name: 'Breaking & Removal',
    description:
      'Controlled concrete breaking and removal services with proper waste management and site cleanup. Safe, efficient removal of concrete sections as needed for your project.',
  },
];

export function CoringServices() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedSpecification, setSelectedSpecification] = useState<string | null>(null);

  function openQuoteModal(subserviceName: string) {
    setSelectedSpecification(subserviceName);
    setIsQuoteModalOpen(true);
  }

  return (
    <section className="space-y-12 py-16">
      <SectionHeading
        eyebrow="Our Services"
        title="Complete Coring Solutions for Your Project"
        description="We specialize in precision concrete cutting and drilling. Choose the service that fits your project needs."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {coringSubservices.map((subservice, index) => (
          <div
            key={subservice.id}
            className="animate-fade-up-delay-1 group relative overflow-hidden rounded-xl border border-slate-700 bg-gradient-to-br from-orange-400/10 via-slate-900 to-slate-900 p-6 transition duration-300 hover:border-orange-500/50 hover:bg-gradient-to-br hover:from-orange-400/15 hover:via-slate-800 hover:to-slate-900"
            style={{ animationDelay: `${120 + index * 60}ms` }}
          >
            <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-orange-400/10 blur-2xl" />

            <div className="relative z-10">
              <h3 className="font-serif text-xl font-semibold text-orange-300">{subservice.name}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{subservice.description}</p>

              <button
                type="button"
                onClick={() => openQuoteModal(subservice.name)}
                className="mt-4 inline-flex rounded-md border border-orange-400/40 px-3 py-1.5 text-xs font-semibold text-orange-200 transition hover:border-orange-400 hover:bg-orange-500/10 hover:text-orange-100"
              >
                Get a Quote
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-xl border border-slate-700 bg-gradient-to-r from-orange-500/10 via-slate-900 to-slate-900 p-8">
        <h2 className="font-serif text-2xl font-semibold text-white md:text-3xl">
          Ready to Get Started?
        </h2>
        <p className="mt-3 text-slate-300">
          Contact us today to discuss your coring project. Our team is ready to provide a customized solution for your needs.
        </p>
        <button
          type="button"
          onClick={() => openQuoteModal('Coring Services - General Inquiry')}
          className="mt-6 inline-flex rounded-md border border-orange-300/40 bg-gradient-to-r from-orange-600 to-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:border-orange-300 hover:from-orange-500 hover:to-orange-400"
        >
          Request a Quote
        </button>
      </div>

      <QuoteRequestModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        serviceName="Construction Services"
        specification={selectedSpecification}
        sourcePage="/coring"
      />
    </section>
  );
}
