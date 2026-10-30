import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Layout from "../components/Layout";
import { sites, plotTypes } from "../lib/data";
import PropertyCard from "../components/PropertyCard";
import PlotCard from "../components/PlotCard";

const PHOTOS = ["/home1.jpg", "/home2.jpg", "/home3.jpg", "/home4.jpg"];
const INTERVAL = 2000;
const FADE_MS = 1000;

function useSlideshow(prefersReducedMotion) {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState(null);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = setInterval(() => {
      const n = (current + 1) % PHOTOS.length;
      setNext(n);
      setFading(true);
      setTimeout(() => { setCurrent(n); setNext(null); setFading(false); }, FADE_MS);
    }, INTERVAL + FADE_MS);
    return () => clearInterval(id);
  }, [current, prefersReducedMotion]);

  return { current, next, fading };
}

const chevron = (
  <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
  </svg>
);

export default function Home() {
  const router = useRouter();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    fetch("/api/properties").then((r) => r.json()).then(setProperties).catch(() => {});
  }, []);

  const { current, next, fading } = useSlideshow(prefersReducedMotion);

  const [search, setSearch] = useState("");
  const [plotType, setPlotType] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");

  function handleFind() {
    if (plotType) {
      const params = new URLSearchParams();
      if (city) params.set("city", city);
      if (search) params.set("q", search);
      router.push(`/plots/${plotType}?${params.toString()}`);
    } else if (city) {
      router.push(`/sites/${city}`);
    } else {
      router.push("/plots");
    }
  }

  function handleReset() { setSearch(""); setPlotType(""); setCategory(""); setCity(""); }

  const fieldClass = "w-full h-14 rounded-lg border border-slate-200 bg-white px-4 text-slate-700 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-teal-brand focus:border-teal-brand transition";
  const selectClass = "w-full h-14 rounded-lg border border-slate-200 bg-white pl-4 pr-10 text-slate-700 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-teal-brand focus:border-teal-brand transition cursor-pointer";

  return (
    <Layout
      title="Houses, Plots & Apartments for Sale in Rwanda"
      description="Browse houses, apartments and plots for sale or rent across Rwanda with Aqueduct Consultant Ltd."
      noPad
    >
      <style>{`
        @keyframes slideCard {
          from { opacity: 0; transform: translateX(30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .panel-slide { animation: slideCard 0.7s cubic-bezier(0.22, 1, 0.36, 1) both; }
      `}</style>

      {/* HERO */}
      <div className="relative flex flex-col lg:h-[580px] lg:flex-row">
        <div className="relative h-[45vh] min-h-[240px] max-h-[580px] w-full overflow-hidden lg:absolute lg:inset-0 lg:h-full">
          <Image key={current} src={PHOTOS[current]} alt="" aria-hidden="true" fill priority={current === 0} sizes="100vw" className="object-cover object-center" />
          {fading && next !== null && (
            <Image src={PHOTOS[next]} alt="" aria-hidden="true" fill sizes="100vw" className="object-cover object-center transition-opacity duration-1000" />
          )}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="panel-slide relative z-10 min-h-[520px] w-full overflow-y-auto bg-white px-8 py-8 lg:ml-auto lg:h-[580px] lg:w-[400px] lg:rounded-tl-3xl lg:shadow-2xl">
          <h1 className="text-[2.1rem] font-extrabold leading-tight text-slate-900">Find Your<br />Perfect Plot</h1>
          <div className="mt-8 flex flex-col gap-4">
            <div>
              <label htmlFor="search" className="sr-only">What are you looking for?</label>
              <input id="search" type="text" placeholder="What are you looking for?" value={search} onChange={(e) => setSearch(e.target.value)} className={fieldClass} />
            </div>
            <div className="relative">
              <label htmlFor="plotType" className="sr-only">Property Type</label>
              <select id="plotType" value={plotType} onChange={(e) => setPlotType(e.target.value)} className={selectClass}>
                <option value="">Property Type</option>
                {plotTypes.map((p) => <option key={p.slug} value={p.slug}>{p.name}</option>)}
              </select>
              {chevron}
            </div>
            <div className="relative">
              <label htmlFor="category" className="sr-only">All Categories</label>
              <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className={selectClass}>
                <option value="">All Categories</option>
                <option value="sale">Plots for sale</option>
                <option value="rent">Plots for rent</option>
              </select>
              {chevron}
            </div>
            <div className="relative">
              <label htmlFor="city" className="sr-only">All Cities</label>
              <select id="city" value={city} onChange={(e) => setCity(e.target.value)} className={selectClass}>
                <option value="">All Cities</option>
                {sites.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
              </select>
              {chevron}
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={handleFind} className="flex h-14 flex-1 items-center justify-center rounded-lg bg-navy px-6 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-navy-light">
                Find Property
              </button>
              <button onClick={handleReset} className="flex h-14 items-center justify-center gap-2 rounded-lg border-2 border-[#1f4d45] bg-white px-5 text-sm font-semibold text-[#1f4d45] transition hover:bg-[#1f4d45]/5">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" />
                </svg>
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* PLOT TYPES */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <h2 className="text-2xl font-bold text-navy mb-8">Browse Plot Types</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {plotTypes.map((p) => <PlotCard key={p.slug} plot={p} />)}
        </div>
      </section>

      {/* PROPERTY LISTINGS — read only */}
      {properties.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-14">
          <h2 className="text-2xl font-bold text-navy mb-8">Property Listings</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {properties.map((p) => <PropertyCard key={p.id} property={p} />)}
          </div>
        </section>
      )}
    </Layout>
  );
}
