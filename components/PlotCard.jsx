import Link from "next/link";

export default function PlotCard({ plot }) {
  return (
    <Link
      href={`/plots/${plot.slug}`}
      className="group rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
    >
      {/* Color banner */}
      <div className="h-2 w-full bg-teal-brand" />

      <div className="flex flex-col flex-1 p-6 gap-3">
        {/* Icon */}
        <div className="h-10 w-10 rounded-full bg-navy/10 flex items-center justify-center">
          <svg className="h-5 w-5 text-navy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9h18M9 21V9" />
          </svg>
        </div>

        <h3 className="text-lg font-bold text-navy group-hover:text-teal-brand transition-colors">{plot.name}</h3>
        <p className="text-sm text-slate-500 leading-relaxed flex-1">{plot.blurb}</p>

        <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-teal-brand">
          View plots
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </span>
      </div>
    </Link>
  );
}
