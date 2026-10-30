import { useEffect, useRef, useState } from "react";

const TYPES = ["House", "Apartment", "Land", "Commercial Property"];
const LISTING_TYPES = ["For Sale", "For Rent"];
const hasBeds = (type) => type === "House" || type === "Apartment";

const empty = { title: "", type: "House", listingType: "For Sale", price: "", location: "", sqm: "", bedrooms: "", bathrooms: "", image: "" };

export default function PropertyForm({ onSubmit, onCancel, initial }) {
  const [form, setForm] = useState(initial || empty);
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(initial?.image || "");
  const fileRef = useRef();

  useEffect(() => {
    if (initial) { setForm(initial); setPreview(initial.image || ""); }
  }, [initial]);

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  }

  function handleImage(e) {
    const file = e.target.files[0];
    if (!file) return;
    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      setErrors((e) => ({ ...e, image: "Only JPG, PNG or WEBP images are allowed." }));
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    set("image", url);
  }

  function validate() {
    const e = {};
    if (!form.image) e.image = "Please upload a property image.";
    if (!form.title.trim()) e.title = "Title is required.";
    if (!form.location.trim()) e.location = "Location is required.";
    if (!form.price || Number(form.price) <= 0) e.price = "Enter a valid price.";
    if (!form.sqm || Number(form.sqm) <= 0) e.sqm = "Enter a valid size.";
    if (hasBeds(form.type)) {
      if (form.bedrooms === "" || Number(form.bedrooms) < 0) e.bedrooms = "Enter number of bedrooms.";
      if (form.bathrooms === "" || Number(form.bathrooms) < 0) e.bathrooms = "Enter number of bathrooms.";
    }
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onSubmit({ ...form, id: initial?.id || Date.now() });
  }

  const field = "w-full h-12 rounded-lg border border-slate-200 px-4 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-brand focus:border-teal-brand transition";
  const sel = "w-full h-12 rounded-lg border border-slate-200 px-4 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-brand focus:border-teal-brand transition bg-white cursor-pointer";
  const err = "text-red-500 text-xs mt-1";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="sticky top-0 bg-white px-8 pt-8 pb-4 border-b border-slate-100">
          <h2 className="text-xl font-bold text-navy">{initial ? "Edit Property" : "Add New Property"}</h2>
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-6 flex flex-col gap-4">

          {/* Image upload */}
          <div>
            <label className="block text-sm font-semibold text-navy mb-1">Property Image *</label>
            <div
              onClick={() => fileRef.current.click()}
              className="cursor-pointer rounded-xl border-2 border-dashed border-slate-200 hover:border-teal-brand transition flex flex-col items-center justify-center h-40 overflow-hidden bg-slate-50"
            >
              {preview
                ? <img src={preview} alt="preview" className="h-full w-full object-cover" />
                : <span className="text-slate-400 text-sm">Click to upload image</span>
              }
            </div>
            <input ref={fileRef} type="file" accept="image/jpeg,image/jpg,image/png,image/webp" className="hidden" onChange={handleImage} />
            {errors.image && <p className={err}>{errors.image}</p>}
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-navy mb-1">Property Title *</label>
            <input value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. Modern Villa in Kigali" className={field} />
            {errors.title && <p className={err}>{errors.title}</p>}
          </div>

          {/* Type + Listing Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-navy mb-1">Property Type *</label>
              <select value={form.type} onChange={(e) => set("type", e.target.value)} className={sel}>
                {TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy mb-1">Listing Type *</label>
              <select value={form.listingType} onChange={(e) => set("listingType", e.target.value)} className={sel}>
                {LISTING_TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>

          {/* Price + Location */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-navy mb-1">Price (RWF) *</label>
              <input type="number" min="1" value={form.price} onChange={(e) => set("price", e.target.value)} placeholder="e.g. 25000000" className={field} />
              {errors.price && <p className={err}>{errors.price}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy mb-1">Location *</label>
              <input value={form.location} onChange={(e) => set("location", e.target.value)} placeholder="e.g. Kagarama, Kicukiro" className={field} />
              {errors.location && <p className={err}>{errors.location}</p>}
            </div>
          </div>

          {/* Sqm */}
          <div>
            <label className="block text-sm font-semibold text-navy mb-1">Size (m²) *</label>
            <input type="number" min="1" value={form.sqm} onChange={(e) => set("sqm", e.target.value)} placeholder="e.g. 300" className={field} />
            {errors.sqm && <p className={err}>{errors.sqm}</p>}
          </div>

          {/* Beds + Baths — only for House / Apartment */}
          {hasBeds(form.type) && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-navy mb-1">Bedrooms *</label>
                <input type="number" min="0" value={form.bedrooms} onChange={(e) => set("bedrooms", e.target.value)} placeholder="e.g. 3" className={field} />
                {errors.bedrooms && <p className={err}>{errors.bedrooms}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy mb-1">Bathrooms *</label>
                <input type="number" min="0" value={form.bathrooms} onChange={(e) => set("bathrooms", e.target.value)} placeholder="e.g. 2" className={field} />
                {errors.bathrooms && <p className={err}>{errors.bathrooms}</p>}
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button type="submit" className="flex-1 h-12 rounded-lg bg-navy text-white font-bold text-sm hover:bg-navy-light transition">
              {initial ? "Save Changes" : "Submit Property"}
            </button>
            <button type="button" onClick={onCancel} className="flex-1 h-12 rounded-lg border-2 border-slate-300 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition">
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
