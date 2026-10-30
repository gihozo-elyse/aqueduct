import Link from "next/link";
import Layout from "../components/Layout";

const services = [
  {
    title: "Property Valuation",
    description:
      "We provide accurate and professional property valuation services to help clients understand the market value of their residential, commercial, and other real estate properties.",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
        <path d="M12 2v4M8 6h8" />
      </svg>
    ),
  },
  {
    title: "Property Management",
    description:
      "We provide reliable property management solutions, helping property owners maintain their investments, manage tenants, and protect the long-term value of their properties.",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" />
        <line x1="10" y1="14" x2="14" y2="14" />
      </svg>
    ),
  },
  {
    title: "Sales & Renting of Properties",
    description:
      "We help clients buy, sell, and rent properties by connecting property owners with suitable buyers and tenants while providing professional support throughout the process.",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 12V22H4V12" />
        <path d="M22 7H2l10-7 10 7z" />
        <path d="M12 22V12h-4v10" />
      </svg>
    ),
  },
  {
    title: "Asset Register Management",
    description:
      "We help organizations maintain accurate and organized asset records to improve asset tracking, reporting, accountability, and management.",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    title: "Asset Tagging",
    description:
      "We provide asset tagging services that help organizations identify, label, and track their assets more efficiently, improving inventory control and asset accountability.",
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <Layout
      title="Services"
      description="Explore Aqueduct Consultant Ltd services in Rwanda, including property valuation, management, sales and rentals."
    >
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both; }
        .fade-up-1 { animation-delay: 0.1s; }
        .fade-up-2 { animation-delay: 0.2s; }
        .fade-up-3 { animation-delay: 0.3s; }
        .fade-up-4 { animation-delay: 0.4s; }
        .fade-up-5 { animation-delay: 0.5s; }
        .service-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(23,51,92,0.13);
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-navy px-6 py-20 text-white">
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-teal-brand/10" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-white/5" />

        <div className="relative mx-auto max-w-4xl text-center">
          <span className="mb-4 inline-block rounded-full border border-teal-brand/40 px-4 py-1 text-sm font-semibold text-teal-brand tracking-widest uppercase">
            What We Offer
          </span>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight sm:text-5xl">
            Our <span className="text-teal-brand">Services</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
            Aqueduct Consultant Ltd provides reliable real estate valuation and property management
            solutions across Rwanda — tailored to individual and corporate needs.
          </p>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="h-12 w-full" fill="#f8fafc">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* ── SERVICE CARDS ── */}
      <section className="bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 3).map((s, i) => (
              <ServiceCard key={s.title} service={s} delay={i + 1} />
            ))}
          </div>
          {/* Second row — 2 cards centered */}
          <div className="mt-7 grid gap-7 sm:grid-cols-2 lg:grid-cols-2 lg:mx-auto lg:max-w-2xl">
            {services.slice(3).map((s, i) => (
              <ServiceCard key={s.title} service={s} delay={i + 4} />
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTE ── */}
      <section className="relative overflow-hidden bg-navy px-6 py-20 text-center text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />
          <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />
        </div>
        <div className="relative mx-auto max-w-3xl">
          <div className="mb-6 flex justify-center">
            <svg className="h-10 w-10 text-teal-brand opacity-60" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>
          <blockquote className="text-2xl font-bold leading-snug text-white sm:text-3xl">
            "Valuing Properties, Building Trust,{" "}
            <span className="text-teal-brand">Shaping Futures.</span>"
          </blockquote>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/65">
            Your trusted partner in real estate valuation and property management,
            committed to creating lasting value for every client.
          </p>
          <div className="mt-8 flex justify-center gap-2">
            <div className="h-1 w-8 rounded-full bg-teal-brand" />
            <div className="h-1 w-4 rounded-full bg-white/30" />
            <div className="h-1 w-2 rounded-full bg-white/20" />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-2xl rounded-3xl bg-white px-8 py-14 text-center shadow-xl" style={{ boxShadow: "0 8px 40px rgba(23,51,92,0.10)" }}>
          <div className="mb-4 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-brand/10">
              <svg className="h-7 w-7 text-teal-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">
            Need Professional Real Estate Services?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-slate-500 leading-relaxed">
            Let Aqueduct Consultant Ltd help you make informed property decisions with confidence.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-navy px-8 py-4 text-sm font-bold text-white transition hover:bg-navy-light"
          >
            Contact Us
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </Link>
        </div>
      </section>
    </Layout>
  );
}

function ServiceCard({ service, delay }) {
  return (
    <div
      className={`service-card fade-up fade-up-${delay} flex flex-col rounded-2xl bg-white p-8 shadow-md transition-all duration-300`}
      style={{ boxShadow: "0 4px 20px rgba(23,51,92,0.08)" }}
    >
      {/* Icon */}
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-teal-brand/10 text-teal-brand">
        {service.icon}
      </div>
      {/* Teal accent line */}
      <div className="mb-4 h-0.5 w-10 rounded-full bg-teal-brand" />
      <h3 className="text-lg font-bold text-navy">{service.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-500">{service.description}</p>
    </div>
  );
}
