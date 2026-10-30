import Link from "next/link";
import OptimizedImage from "./OptimizedImage";

const hasBeds = (type) => type === "House" || type === "Apartment";
const WA_NUMBER = "250785517847";
const CALL_NUMBER = "+250785517847";

export default function PropertyCard({ property, onEdit, onDelete }) {
  const propId = property._id || property.id;
  const { image, images, title, propertyType, type, listingType, price, location, specificLocation, district, sqm, bedrooms, bathrooms, status } = property;
  const displayType = propertyType || type;
  const displayLocation = specificLocation || location || district || "";
  const displayImage = image || (images && images[0]) || null;
  const waMsg = encodeURIComponent(`Hello, I am interested in this property: ${title}`);

  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
      {/* Image */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-100">
        {displayImage
          ? <OptimizedImage src={displayImage} alt={title} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover" />
          : <div className="h-full w-full flex items-center justify-center text-slate-300 text-sm">No image</div>
        }
        <span className={`absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-bold text-white ${listingType === "For Sale" ? "bg-navy" : "bg-teal-brand"}`}>
          {listingType}
        </span>
        {status && status !== "Available" && (
          <span className="absolute top-3 right-3 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">{status}</span>
        )}
        <span className="absolute bottom-3 left-3 rounded-lg bg-black/60 px-3 py-1 text-sm font-bold text-white">
          RWF {Number(price).toLocaleString()}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <h3 className="font-bold text-navy text-base leading-snug">{title}</h3>
        {displayType === "Furniture" && property.plotCategory && (
          <p className="text-sm font-medium text-teal-brand">{property.plotCategory}</p>
        )}

        {displayLocation && (
          <div className="flex items-center gap-1 text-slate-500 text-sm">
            <svg className="h-4 w-4 text-teal-brand shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            {displayLocation}
          </div>
        )}

        <div className="flex flex-wrap gap-3 text-sm text-slate-600 mt-1">
          {hasBeds(displayType) && bedrooms !== undefined && (
            <>
              <span className="flex items-center gap-1">
                <svg className="h-4 w-4 text-teal-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 9V19M21 9V19M3 13H21M3 9a4 4 0 014-4h10a4 4 0 014 4" /></svg>
                {bedrooms} Bed
              </span>
              <span className="flex items-center gap-1">
                <svg className="h-4 w-4 text-teal-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 12h16M4 12V8a4 4 0 018 0M4 12v4a2 2 0 002 2h12a2 2 0 002-2v-4" /></svg>
                {bathrooms} Bath
              </span>
            </>
          )}
          {sqm && (
            <span className="flex items-center gap-1">
              <svg className="h-4 w-4 text-teal-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
              {sqm} m²
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="mt-auto pt-3 flex flex-col gap-2 border-t border-slate-100">
          {propId && !onEdit && (
            <Link href={`/properties/${propId}`} className="w-full rounded-lg bg-navy py-2 text-center text-xs font-bold text-white hover:bg-navy-light transition">
              View Details
            </Link>
          )}
          {!onEdit && (
            <div className="flex gap-2">
              <a href={`https://wa.me/${WA_NUMBER}?text=${waMsg}`} target="_blank" rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-green-500 py-2 text-xs font-bold text-white hover:bg-green-600 transition">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.855L0 24l6.335-1.508A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.371l-.36-.214-3.727.977.994-3.634-.235-.374A9.818 9.818 0 1112 21.818z"/></svg>
                WhatsApp
              </a>
              <a href={`tel:${CALL_NUMBER}`}
                className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-navy py-2 text-xs font-bold text-navy hover:bg-navy hover:text-white transition">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" /></svg>
                Call Us
              </a>
            </div>
          )}
          {(onEdit || onDelete) && (
            <div className="flex gap-2">
              {onEdit && <button onClick={() => onEdit(property)} className="flex-1 rounded-lg border border-navy py-2 text-xs font-semibold text-navy hover:bg-navy hover:text-white transition">Edit</button>}
              {onDelete && <button onClick={() => onDelete(propId)} className="flex-1 rounded-lg border border-red-400 py-2 text-xs font-semibold text-red-500 hover:bg-red-500 hover:text-white transition">Delete</button>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
