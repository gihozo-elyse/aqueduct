import Layout from "../../components/Layout";
import ListingPage from "../../components/ListingPage";
import PlotCard from "../../components/PlotCard";
import { plotTypes } from "../../lib/data";

export default function Plots() {
  return (
    <Layout
      title="Plots for Sale and Rent in Rwanda"
      description="Browse land and plots available across Rwanda, including residential, commercial, agricultural and industrial plots."
    >
      <section className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="text-2xl font-bold text-navy mb-8">Browse Plot Types</h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plotTypes.map((p) => (
            <PlotCard key={p.slug} plot={p} />
          ))}
        </div>
      </section>
      <ListingPage
        title="Available Plots"
        blurb="Browse land and plots available across Rwanda."
        filterKey="propertyType"
        filterValue="Land/Plot"
        emptyMessage="No plots available at the moment."
      />
    </Layout>
  );
}
