import Link from "next/link";
import Layout from "../../components/Layout";
import ListingPage from "../../components/ListingPage";
import { furnitureCategories } from "../../lib/data";

export default function Furniture() {
  return (
    <Layout
      title="Furniture in Rwanda"
      description="Browse furniture by category and contact Aqueduct Consultant Ltd to order items across Kigali and Rwanda."
    >
      <section className="relative overflow-hidden bg-navy px-6 py-16 text-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-teal-brand/10" />
        <div className="relative mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">Furnitures in <span className="text-teal-brand">Rwanda</span></h1>
          <p className="mx-auto mt-5 max-w-2xl text-white/75 leading-relaxed">Browse quality furniture by category. Order directly on WhatsApp for fast delivery across Kigali and Rwanda.</p>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 50" preserveAspectRatio="none" className="h-10 w-full" fill="#f8fafc"><path d="M0,25 C360,50 1080,0 1440,25 L1440,50 L0,50 Z" /></svg>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="text-2xl font-bold text-navy mb-8">Browse by Category</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {furnitureCategories.map((c) => (
            <Link
              key={c.slug}
              href={`/furniture/${c.slug}`}
              className="group rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <div className="h-2 w-full bg-teal-brand" />
              <div className="flex flex-col flex-1 p-7 gap-3">
                <div className="text-3xl">{c.icon}</div>
                <div className="h-0.5 w-10 rounded-full bg-teal-brand" />
                <h3 className="text-lg font-bold text-navy group-hover:text-teal-brand transition-colors">{c.name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed flex-1">{c.blurb}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-teal-brand">
                  View items
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <ListingPage
        title="Available Furniture"
        blurb="Browse furniture currently available across Rwanda."
        filterKey="propertyType"
        filterValue="Furniture"
        emptyMessage="No furniture available at the moment."
      />
    </Layout>
  );
}
