import Link from "next/link";
import Layout from "../../components/Layout";
import ListingPage from "../../components/ListingPage";
import { sites } from "../../lib/data";

export default function Sites() {
  return (
    <Layout
      title="Land Sites in Rwanda"
      description="Browse land sites and available plots by district across Rwanda, including Kigali, Kamonyi, Bugesera, Rwamagana and Rulindo."
    >
      <section className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="text-3xl font-extrabold text-navy">Browse Sites by District</h1>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sites.map((site) => (
            <Link
              key={site.slug}
              href={`/sites/${site.slug}`}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <h2 className="text-xl font-bold text-navy">{site.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{site.blurb}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-teal-brand">View available sites →</span>
            </Link>
          ))}
        </div>
      </section>
      <ListingPage
        title="Available Land Sites"
        blurb="Browse available plots and land sites across Rwanda."
        filterKey="propertyType"
        filterValue="Land/Plot"
        extraFilter={{ status: "Available" }}
        emptyMessage="No available land sites at the moment."
      />
    </Layout>
  );
}
