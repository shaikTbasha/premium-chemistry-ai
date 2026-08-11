"use client";

import { useState } from 'react';

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  const tiers = [
    {
      name: 'High School',
      id: 'tier-high-school',
      href: '#',
      priceMonthly: 15,
      priceAnnual: 12,
      description: 'Perfect for AP/IB Chemistry and standard introductory courses.',
      features: [
        'Step-by-step equation balancing',
        'Basic stoichiometry & thermodynamics',
        '24/7 AI Chat interface',
        'Standard web access',
      ],
      featured: false,
      cta: 'Start Basic Trial',
    },
    {
      name: 'University Pro',
      id: 'tier-university',
      href: '#',
      priceMonthly: 39,
      priceAnnual: 29,
      description: 'Advanced mechanisms, 3D rendering, and organic synthesis for undergrads.',
      features: [
        'Everything in High School, plus:',
        'Complex organic reaction mechanisms',
        'Interactive 3D molecular visualization',
        'Direct syllabus & textbook alignment',
        'LaTeX export for lab reports',
        'Priority compute for fast generation',
      ],
      featured: true,
      cta: 'Get Pro Now',
    },
    {
      name: 'Lab & Research',
      id: 'tier-research',
      href: '#',
      priceMonthly: 79,
      priceAnnual: 59,
      description: 'Dedicated tools for graduate students, researchers, and lab technicians.',
      features: [
        'Everything in University Pro, plus:',
        'Literature review synthesis',
        'Advanced spectroscopy analysis (NMR/IR)',
        'API access for bulk processing',
        'Dedicated account manager',
      ],
      featured: false,
      cta: 'Contact Sales',
    },
  ];

  return (
    <section className="bg-slate-900 py-24 sm:py-32" id="pricing">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold uppercase tracking-wider text-indigo-400">
            Pricing
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Choose the right intelligence for your studies
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-slate-300">
          Whether you are balancing simple equations or mapping out complex multi-step organic syntheses, we have a plan tailored for your academic level.
        </p>

        {/* Billing Toggle */}
        <div className="mt-16 flex justify-center items-center gap-x-4">
          <span className={`text-sm font-semibold ${!isAnnual ? 'text-white' : 'text-slate-400'}`}>
            Monthly
          </span>
          <button
            type="button"
            className="relative inline-flex h-8 w-16 cursor-pointer items-center rounded-full border-2 border-transparent bg-indigo-500/20 ring-1 ring-indigo-500/50 transition-colors duration-200 ease-in-out focus:outline-none"
            role="switch"
            aria-checked={isAnnual}
            onClick={() => setIsAnnual(!isAnnual)}
          >
            <span
              aria-hidden="true"
              className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-indigo-400 shadow ring-0 transition duration-200 ease-in-out ${
                isAnnual ? 'translate-x-8' : 'translate-x-0'
              }`}
            />
          </button>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-semibold ${isAnnual ? 'text-white' : 'text-slate-400'}`}>
              Annually
            </span>
            <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400 border border-emerald-500/20">
              Save 25%
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`flex flex-col justify-between rounded-3xl p-8 xl:p-10 transition-all ${
                tier.featured
                  ? 'bg-slate-800/80 ring-2 ring-indigo-500 shadow-2xl shadow-indigo-500/10 scale-100 lg:scale-105 z-10'
                  : 'bg-slate-900 ring-1 ring-slate-800 hover:bg-slate-800/50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3
                    id={tier.id}
                    className={`text-lg font-semibold leading-8 ${
                      tier.featured ? 'text-indigo-400' : 'text-white'
                    }`}
                  >
                    {tier.name}
                  </h3>
                  {tier.featured && (
                    <p className="rounded-full bg-indigo-500/20 px-2.5 py-1 text-xs font-semibold leading-5 text-indigo-300 border border-indigo-500/30">
                      Most popular
                    </p>
                  )}
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-300 h-12">
                  {tier.description}
                </p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-white">
                    ${isAnnual ? tier.priceAnnual : tier.priceMonthly}
                  </span>
                  <span className="text-sm font-semibold leading-6 text-slate-400">
                    /month
                  </span>
                </p>
                {isAnnual && (
                  <p className="mt-1 text-xs text-emerald-400">
                    Billed ${tier.priceAnnual * 12} annually
                  </p>
                )}
                {!isAnnual && <p className="mt-1 text-xs text-slate-500 opacity-0">Spacer</p>}
                
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-slate-300">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <svg
                        className={`h-6 w-5 flex-none ${
                          tier.featured ? 'text-indigo-400' : 'text-slate-500'
                        }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <a
                href={tier.href}
                aria-describedby={tier.id}
                className={`mt-8 block rounded-full px-3 py-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors ${
                  tier.featured
                    ? 'bg-indigo-500 text-white hover:bg-indigo-400 focus-visible:outline-indigo-500 shadow-sm'
                    : 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700'
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}