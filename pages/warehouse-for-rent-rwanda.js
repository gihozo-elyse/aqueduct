import Link from "next/link";
import Layout from "../components/Layout";
import { warehouseTypes } from "../lib/data";

export default function Warehouse() {
  return (
    <Layout
      title="Warehouse for Rent and Sale in Rwanda"
      description="Browse commercial warehouses and storage facilities for rent and sale across Rwanda."
    >
      <section className="relative overflow-hidden bg-navy px-6 py-16 text-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-teal-brand/10" />
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="mb-3 inline-block rounded-full border border-teal-brand/40 px-4 py-1 text-xs font-semibold text-teal-brand tracking-widest uppercase">Ububiko mu Rwanda</span>
          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">Warehouse in <span className="text-teal-brand">Rwanda</span></h1>
          <p className="mx-auto mt-5 max-w-2xl text-white/75 leading-relaxed">Browse commercial warehouses and storage facilities for rent and sale across Rwanda. Choose a category below to see available listings.</p>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 50" preserveAspectRatio="none" className="h-10 w-full" fill="#f8fafc"><path d="M0,25 C360,50 1080,0 1440,25 L1440,50 L0,50 Z" /></svg>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-14">
        <h2 className="text-2xl font-bold text-navy mb-8">Choose a Category</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {warehouseTypes.map((w) => (
            <Link
              key={w.slug}
              href={`/warehouse/${w.slug}`}
              className="group rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <div className="h-2 w-full bg-teal-brand" />
              <div className="flex flex-col flex-1 p-8 gap-3">
                <div className="h-12 w-12 rounded-full bg-navy/10 flex items-center justify-center">
                  {w.slug === "for-rent" ? (
                    <svg className="h-6 w-6 text-navy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <rect x="2" y="7" width="20" height="14" rx="1" />
                      <path d="M2 10h20M12 7V3M8 7V4M16 7V4" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6 text-navy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <rect x="2" y="7" width="20" height="14" rx="1" />
                      <path d="M2 10h20M12 3v4M9 21v-4h6v4" />
                    </svg>
                  )}
                </div>
                <h3 className="text-xl font-bold text-navy group-hover:text-teal-brand transition-colors">Warehouse {w.name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed flex-1">{w.blurb}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-teal-brand">
                  View listings
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}
