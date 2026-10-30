import { useState } from "react";
import { useRouter } from "next/router";
import mongoose from "mongoose";
import Layout from "../../components/Layout";
import OptimizedImage from "../../components/OptimizedImage";
import { connectDB } from "../../lib/mongoose";
import Property from "../../lib/models/Property";

const WA_NUMBER = "250785517847";
const CALL_NUMBER = "+250785517847";
const hasBeds = (t) => t === "House" || t === "Apartment";

export default function PropertyDetail({ property }) {
  const router = useRouter();
  const [imgIdx, setImgIdx] = useState(0);

  const images = property.images?.length ? property.images : property.image ? [property.image] : [];
  const waMsg = encodeURIComponent(`Hello, I am interested in this property: ${property.title} (ID: ${property._id})`);
  const displayType = property.propertyType || property.type;
  const location = [property.specificLocation, property.district].filter(Boolean).join(", ");
  const description = [
    property.title,
    displayType,
    property.listingType,
    location,
    property.price ? `RWF ${Number(property.price).toLocaleString()}` : "",
  ].filter(Boolean).join(" | ");

  return (
    <Layout title={property.title} description={description} image={images[0] || "/log.jpeg"}>
      <div className="mx-auto max-w-5xl px-6 py-10">
        <button onClick={() => router.back()} className="mb-6 flex items-center gap-2 text-sm text-slate-500 hover:text-navy transition">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
          Back
        </button>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Gallery */}
          <div>
            <div className="relative h-72 w-full overflow-hidden rounded-2xl bg-slate-100 sm:h-96">
              {images.length > 0
                ? <OptimizedImage src={images[imgIdx]} alt={property.title} priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                : <div className="flex h-full items-center justify-center text-slate-300">No image</div>
              }
              {property.status && property.status !== "Available" && (
                <span className="absolute top-4 right-4 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">{property.status}</span>
              )}
            </div>
            {images.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto">
                {images.map((img, i) => (
                  <button key={i} onClick={() => setImgIdx(i)} className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition ${i === imgIdx ? "border-teal-brand" : "border-transparent"}`}>
                    <OptimizedImage src={img} alt="" sizes="80px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-3">
              <h1 className="text-2xl font-extrabold text-navy leading-snug">{property.title}</h1>
              <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold text-white ${property.listingType === "For Sale" ? "bg-navy" : "bg-teal-brand"}`}>
                {property.listingType}
              </span>
            </div>

            <p className="text-2xl font-bold text-teal-brand">RWF {Number(property.price).toLocaleString()}</p>

            <div className="grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-4 text-sm">
              {displayType && <Detail label="Type" value={displayType} />}
              {property.plotCategory && <Detail label="Category" value={property.plotCategory} />}
              {location && <Detail label="Location" value={location} />}
              {property.sqm && <Detail label="Size" value={`${property.sqm} m²`} />}
              {hasBeds(displayType) && property.bedrooms !== undefined && <Detail label="Bedrooms" value={property.bedrooms} />}
              {hasBeds(displayType) && property.bathrooms !== undefined && <Detail label="Bathrooms" value={property.bathrooms} />}
              {property.status && <Detail label="Status" value={property.status} />}
            </div>

            {property.description && (
              <div>
                <h2 className="font-bold text-navy mb-1">Description</h2>
                <p className="text-sm text-slate-600 leading-relaxed">{property.description}</p>
              </div>
            )}

            {/* Contact buttons */}
            <div className="flex gap-3 mt-2">
              <a href={`https://wa.me/${WA_NUMBER}?text=${waMsg}`} target="_blank" rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-500 py-3 text-sm font-bold text-white hover:bg-green-600 transition">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.855L0 24l6.335-1.508A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.371l-.36-.214-3.727.977.994-3.634-.235-.374A9.818 9.818 0 1112 21.818z"/></svg>
                WhatsApp
              </a>
              <a href={`tel:${CALL_NUMBER}`}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-navy py-3 text-sm font-bold text-navy hover:bg-navy hover:text-white transition">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" /></svg>
                Call Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-400 uppercase tracking-wide">{label}</p>
      <p className="font-semibold text-navy">{value}</p>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  if (!mongoose.isValidObjectId(params.id)) return { notFound: true };

  await connectDB();
  const property = await Property.findById(params.id).lean();
  if (!property) return { notFound: true };

  return { props: { property: JSON.parse(JSON.stringify(property)) } };
}
