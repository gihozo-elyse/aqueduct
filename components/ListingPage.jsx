import { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";

export default function ListingPage({ title, blurb, filterKey, filterValue, filterValues, extraFilter = {}, emptyMessage = "No listings found" }) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [search, setSearch] = useState("");
  const [listingType, setListingType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minSqm, setMinSqm] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(extraFilter);
    if (filterValues) params.set(filterKey, filterValues.join(","));
    else params.set(filterKey, filterValue);
    fetch(`/api/properties?${params}`)
      .then((r) => {
        if (!r.ok) throw new Error("Unable to load listings.");
        return r.json();
      })
      .then((d) => { setProperties(Array.isArray(d) ? d : []); setLoadError(""); setLoading(false); })
      .catch(() => { setLoadError("Listings could not be loaded. Please try again later."); setLoading(false); });
  }, [filterKey, filterValue, JSON.stringify(filterValues), JSON.stringify(extraFilter)]);

  const filtered = properties.filter((p) => {
    if (listingType && p.listingType !== listingType) return false;
    if (minPrice && Number(p.price) < Number(minPrice)) return false;
    if (maxPrice && Number(p.price) > Number(maxPrice)) return false;
    if (minSqm && Number(p.sqm) < Number(minSqm)) return false;
    if (search) {
      const q = search.toLowerCase();
      return (p.title || "").toLowerCase().includes(q) ||
        (p.specificLocation || "").toLowerCase().includes(q) ||
        (p.district || "").toLowerCase().includes(q);
    }
    return true;
  });

  const input = "h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-brand transition";
  const sel = `${input} cursor-pointer`;

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {title && (
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-navy">{title}</h1>
          {blurb && <p className="mt-2 text-slate-500">{blurb}</p>}
        </div>
      )}

      {/* Filters */}
      <div className="mb-8 flex flex-wrap gap-3 rounded-2xl bg-slate-50 p-4">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search…" className={`${input} w-48`} />
        {!extraFilter.listingType && (
          <select value={listingType} onChange={(e) => setListingType(e.target.value)} className={`${sel} w-36`}>
            <option value="">All Types</option>
            <option value="For Sale">For Sale</option>
            <option value="For Rent">For Rent</option>
          </select>
        )}
        <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="Min Price (RWF)" className={`${input} w-40`} />
        <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="Max Price (RWF)" className={`${input} w-40`} />
        <input type="number" value={minSqm} onChange={(e) => setMinSqm(e.target.value)} placeholder="Min m²" className={`${input} w-28`} />
        <button onClick={() => { setSearch(""); setListingType(""); setMinPrice(""); setMaxPrice(""); setMinSqm(""); }}
          className="h-10 rounded-lg border border-slate-300 px-4 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition">
          Reset
        </button>
      </div>

      {/* Results */}
      {loading ? (
        <div className="py-20 text-center text-slate-400">Loading…</div>
      ) : loadError ? (
        <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 py-12 text-center text-red-700">
          <p className="font-semibold">{loadError}</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 py-20 text-slate-400">
          <svg className="h-12 w-12 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
          <p className="font-medium">{emptyMessage}</p>
          <p className="text-sm mt-1">There are currently no available listings matching your search.</p>
        </div>
      ) : (
        <>
          <p className="mb-4 text-sm text-slate-500">{filtered.length} listing{filtered.length !== 1 ? "s" : ""} found</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => <PropertyCard key={p._id || p.id} property={p} />)}
          </div>
        </>
      )}
    </div>
  );
}
