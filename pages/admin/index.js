import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import PropertyCard from "../../components/PropertyCard";

const TYPES = ["House", "Apartment", "Land/Plot", "Commercial Property", "Furniture"];
const LISTING_TYPES = ["For Sale", "For Rent"];
const DISTRICTS = ["Kigali", "Kamonyi", "Bugesera", "Rwamagana", "Rulindo"];
const PLOT_CATS = ["Residential", "Commercial", "Agricultural", "Industrial", "Institutional"];
const STATUSES = ["Available", "Reserved", "Sold", "Rented"];
const FURNITURE_CATS = ["Living Room", "Bedroom", "Office", "Outdoor", "Workshop"];
const isFurniture = (t) => t === "Furniture";
const hasBeds = (t) => t === "House" || t === "Apartment";
const needsPlotCat = (t) => t === "Land/Plot";

const empty = { title: "", propertyType: "Land/Plot", listingType: "For Sale", price: "", district: "Kigali", specificLocation: "", plotCategory: "Residential", sqm: "", description: "", bedrooms: "", bathrooms: "", status: "Available", images: [] };

async function optimizeImage(file) {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1600 / bitmap.width, 1200 / bitmap.height);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const context = canvas.getContext("2d");
  if (!context) {
    bitmap.close();
    throw new Error("Image optimization is not supported by this browser.");
  }
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/webp", 0.82));
  if (!blob) throw new Error("The selected image could not be optimized.");
  return blob;
}

function readAsDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("The selected image could not be read."));
    reader.readAsDataURL(blob);
  });
}

function StatCard({ label, value, color }) {
  return (
    <div className={`rounded-xl p-5 text-white ${color}`}>
      <p className="text-sm font-medium opacity-80">{label}</p>
      <p className="text-3xl font-extrabold mt-1">{value}</p>
    </div>
  );
}

function PropertyForm({ initial, onSubmit, onCancel, adminKey }) {
  const [form, setForm] = useState(initial || empty);
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef();

  useEffect(() => { if (initial) setForm({ ...empty, ...initial }); }, [initial]);

  function set(f, v) { setForm((p) => ({ ...p, [f]: v })); setErrors((e) => ({ ...e, [f]: "" })); }

  function setPropertyType(type) {
    setForm((current) => ({
      ...current,
      propertyType: type,
      plotCategory: type === "Furniture"
        ? (FURNITURE_CATS.includes(current.plotCategory) ? current.plotCategory : FURNITURE_CATS[0])
        : type === "Land/Plot"
          ? (PLOT_CATS.includes(current.plotCategory) ? current.plotCategory : PLOT_CATS[0])
          : current.plotCategory,
    }));
    setErrors((current) => ({ ...current, propertyType: "" }));
  }

  async function handleImages(e) {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    const urls = [];
    try {
      for (const file of files) {
        if (!["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file.type)) {
          throw new Error("Only JPG, PNG or WEBP images are allowed.");
        }
        const image = await optimizeImage(file);
        const extension = image.type.split("/")[1] || "jpg";
        const filename = `${file.name.replace(/\.[^.]+$/, "")}.${extension}`;
        const base64 = await readAsDataUrl(image);
        const resp = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ adminKey, base64, filename }),
        });
        const data = await resp.json();
        if (!resp.ok) throw new Error(data.error || "An image could not be uploaded.");
        urls.push(data.url);
      }
      setErrors((current) => ({ ...current, images: "" }));
    } catch (error) {
      setErrors((current) => ({ ...current, images: error.message || "Images could not be uploaded." }));
    } finally {
      if (urls.length) {
        setForm((p) => ({ ...p, images: [...(p.images || []), ...urls], image: [...(p.images || []), ...urls][0] }));
      }
      setUploading(false);
      e.target.value = "";
    }
  }

  function removeImage(idx) { setForm((p) => { const imgs = p.images.filter((_, i) => i !== idx); return { ...p, images: imgs, image: imgs[0] || "" }; }); }

  function validate() {
    const e = {};
    if (!form.title.trim()) e.title = "Required.";
    if (!form.price || Number(form.price) <= 0) e.price = "Enter a valid price.";
    if (!isFurniture(form.propertyType) && (!form.sqm || Number(form.sqm) <= 0)) e.sqm = "Enter a valid size.";
    if (isFurniture(form.propertyType) && form.sqm && Number(form.sqm) <= 0) e.sqm = "Enter a valid size.";
    if (!form.specificLocation.trim()) e.specificLocation = "Required.";
    if (hasBeds(form.propertyType)) {
      if (form.bedrooms === "" || Number(form.bedrooms) < 0) e.bedrooms = "Required.";
      if (form.bathrooms === "" || Number(form.bathrooms) < 0) e.bathrooms = "Required.";
    }
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onSubmit({ ...form, image: form.images?.[0] || form.image || "" });
  }

  const field = "w-full h-11 rounded-lg border border-slate-200 px-3 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-brand transition";
  const sel = `${field} bg-white cursor-pointer`;
  const err = "text-red-500 text-xs mt-1";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="sticky top-0 bg-white px-8 pt-6 pb-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-navy">{initial ? "Edit Property" : "Add New Property"}</h2>
          <button onClick={onCancel} className="text-slate-400 hover:text-slate-600">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="px-8 py-6 flex flex-col gap-4">

          {/* Images */}
          <div>
            <label className="block text-sm font-semibold text-navy mb-1">Property Images</label>
            <div onClick={() => !uploading && fileRef.current.click()} className="cursor-pointer rounded-xl border-2 border-dashed border-slate-200 hover:border-teal-brand transition flex items-center justify-center h-28 bg-slate-50">
              {uploading ? <span className="text-slate-400 text-sm">Uploading…</span> : <span className="text-slate-400 text-sm">Click to upload images</span>}
            </div>
            <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" multiple className="hidden" onChange={handleImages} disabled={uploading} />
            {errors.images && <p className={err}>{errors.images}</p>}
            {form.images?.length > 0 && (
              <div className="mt-2 flex gap-2 flex-wrap">
                {form.images.map((img, i) => (
                  <div key={i} className="relative h-16 w-20 rounded-lg overflow-hidden border border-slate-200">
                    <img src={img} alt="" className="h-full w-full object-cover" />
                    <button type="button" onClick={() => removeImage(i)} className="absolute top-0.5 right-0.5 rounded-full bg-red-500 text-white text-xs h-4 w-4 flex items-center justify-center">✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-navy mb-1">Title *</label>
            <input value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. Residential Plot in Kigali" className={field} />
            {errors.title && <p className={err}>{errors.title}</p>}
          </div>

          {/* Type + Listing */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-navy mb-1">Property Type *</label>
              <select value={form.propertyType} onChange={(e) => setPropertyType(e.target.value)} className={sel}>
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

          {/* Price + Sqm */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-navy mb-1">Price (RWF) *</label>
              <input type="number" min="1" value={form.price} onChange={(e) => set("price", e.target.value)} placeholder="e.g. 25000000" className={field} />
              {errors.price && <p className={err}>{errors.price}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy mb-1">
                Size (m²){isFurniture(form.propertyType) ? " (optional)" : " *"}
              </label>
              <input type="number" min="1" value={form.sqm} onChange={(e) => set("sqm", e.target.value)} placeholder="e.g. 500" className={field} />
              {errors.sqm && <p className={err}>{errors.sqm}</p>}
            </div>
          </div>

          {/* District + Specific Location */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-navy mb-1">District *</label>
              <select value={form.district} onChange={(e) => set("district", e.target.value)} className={sel}>
                {DISTRICTS.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy mb-1">Specific Location *</label>
              <input value={form.specificLocation} onChange={(e) => set("specificLocation", e.target.value)} placeholder="e.g. Kagarama, Kicukiro" className={field} />
              {errors.specificLocation && <p className={err}>{errors.specificLocation}</p>}
            </div>
          </div>

          {/* Furniture Category — only for Furniture */}
          {isFurniture(form.propertyType) && (
            <div>
              <label className="block text-sm font-semibold text-navy mb-1">Furniture Category *</label>
              <select value={form.plotCategory} onChange={(e) => set("plotCategory", e.target.value)} className={sel}>
                {FURNITURE_CATS.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          )}

          {/* Plot Category — only for Land/Plot */}
          {needsPlotCat(form.propertyType) && (
            <div>
              <label className="block text-sm font-semibold text-navy mb-1">Plot Category *</label>
              <select value={form.plotCategory} onChange={(e) => set("plotCategory", e.target.value)} className={sel}>
                {PLOT_CATS.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          )}

          {/* Beds + Baths — only for House/Apartment */}
          {hasBeds(form.propertyType) && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-navy mb-1">Bedrooms *</label>
                <input type="number" min="0" value={form.bedrooms} onChange={(e) => set("bedrooms", e.target.value)} className={field} />
                {errors.bedrooms && <p className={err}>{errors.bedrooms}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy mb-1">Bathrooms *</label>
                <input type="number" min="0" value={form.bathrooms} onChange={(e) => set("bathrooms", e.target.value)} className={field} />
                {errors.bathrooms && <p className={err}>{errors.bathrooms}</p>}
              </div>
            </div>
          )}

          {/* Status */}
          <div>
            <label className="block text-sm font-semibold text-navy mb-1">Status *</label>
            <select value={form.status} onChange={(e) => set("status", e.target.value)} className={sel}>
              {STATUSES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-navy mb-1">Description</label>
            <textarea rows={3} value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Describe the property…" className={`${field} h-auto py-2`} />
          </div>

          {/* Where will this appear */}
          <div className="rounded-xl bg-teal-brand/10 border border-teal-brand/30 px-4 py-3 text-sm">
            <p className="font-semibold text-teal-brand mb-1">📍 Where will this appear on the website?</p>
            <ul className="text-slate-600 space-y-0.5 text-xs">
              {form.propertyType === "Land/Plot" && <li>→ <strong>Plots</strong> → {form.plotCategory || "(select category)"}</li>}
              {form.propertyType === "Land/Plot" && <li>→ <strong>Sites</strong> → {form.district || "(select district)"}</li>}
              {(form.propertyType === "House" || form.propertyType === "Apartment") && form.listingType === "For Sale" && <li>→ <strong>Houses &amp; Apartments</strong> → For Sale</li>}
              {(form.propertyType === "House" || form.propertyType === "Apartment") && form.listingType === "For Rent" && <li>→ <strong>Houses &amp; Apartments</strong> → For Rent</li>}
              {form.propertyType === "Commercial Property" && form.listingType === "For Rent" && <li>→ <strong>Warehouse</strong> → For Rent</li>}
              {form.propertyType === "Commercial Property" && form.listingType === "For Sale" && <li>→ <strong>Warehouse</strong> → For Sale</li>}
              {form.propertyType === "Furniture" && <li>→ <strong>Furnitures</strong> → {form.plotCategory || "(select category)"}</li>}
            </ul>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="flex-1 h-11 rounded-lg bg-navy text-white font-bold text-sm hover:bg-navy-light transition">
              {initial ? "Save Changes" : "Add Property"}
            </button>
            <button type="button" onClick={onCancel} className="flex-1 h-11 rounded-lg border-2 border-slate-300 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const [adminKey, setAdminKey] = useState("");
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [msg, setMsg] = useState({ text: "", type: "success" });
  const [tab, setTab] = useState("all");
  const [messages, setMessages] = useState([]);
  const [section, setSection] = useState("properties");

  useEffect(() => {
    const key = sessionStorage.getItem("adminKey");
    if (!key) { router.replace("/admin/login"); return; }
    setAdminKey(key);
    fetch("/api/properties").then((r) => r.json()).then((d) => { setProperties(d); setLoading(false); });
    fetch(`/api/messages?adminKey=${key}`).then((r) => r.json()).then((d) => Array.isArray(d) && setMessages(d)).catch(() => {});
  }, []);

  function flash(text, type = "success") { setMsg({ text, type }); setTimeout(() => setMsg({ text: "", type: "success" }), 3000); }

  async function handleAdd(form) {
    const res = await fetch("/api/properties", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, adminKey }) });
    if (res.ok) { const p = await res.json(); setProperties((prev) => [p, ...prev]); setShowForm(false); flash("Property added!"); }
    else flash("Error adding property.", "error");
  }

  async function handleSave(form) {
    const id = editTarget._id || editTarget.id;
    const res = await fetch(`/api/properties/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, adminKey }) });
    if (res.ok) { const p = await res.json(); setProperties((prev) => prev.map((x) => (x._id||x.id) === (p._id||p.id) ? p : x)); setShowForm(false); setEditTarget(null); flash("Property updated!"); }
    else flash("Error updating.", "error");
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this property? This cannot be undone.")) return;
    const res = await fetch(`/api/properties/${id}`, { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ adminKey }) });
    if (res.ok) { setProperties((prev) => prev.filter((x) => (x._id||x.id) !== id)); flash("Property deleted."); }
    else flash("Error deleting.", "error");
  }

  const stats = {
    total: properties.length,
    forSale: properties.filter((p) => p.listingType === "For Sale").length,
    forRent: properties.filter((p) => p.listingType === "For Rent").length,
    available: properties.filter((p) => p.status === "Available").length,
    sold: properties.filter((p) => p.status === "Sold" || p.status === "Rented").length,
  };

  const filtered = tab === "all" ? properties
    : tab === "sale" ? properties.filter((p) => p.listingType === "For Sale")
    : tab === "rent" ? properties.filter((p) => p.listingType === "For Rent")
    : properties.filter((p) => p.status === tab.charAt(0).toUpperCase() + tab.slice(1));

  if (loading) return <div className="min-h-screen flex items-center justify-center text-navy font-bold">Loading…</div>;

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Top bar */}
      <header className="bg-navy text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/log.jpeg" alt="Aqueduct" className="h-10 w-10 rounded-lg bg-white p-0.5 object-contain" />
          <span className="font-bold text-lg">Admin Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setSection("properties")} className={`text-sm font-semibold transition ${section==="properties" ? "text-teal-300" : "text-white/70 hover:text-white"}`}>Properties</button>
          <button onClick={() => setSection("messages")} className={`text-sm font-semibold transition relative ${section==="messages" ? "text-teal-300" : "text-white/70 hover:text-white"}`}>
            Messages
            {messages.filter((m) => !m.read).length > 0 && <span className="absolute -top-1 -right-3 h-4 w-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">{messages.filter((m) => !m.read).length}</span>}
          </button>
          <a href="/" target="_blank" className="text-sm text-white/70 hover:text-white">View Site ↗</a>
          <button onClick={() => { sessionStorage.removeItem("adminKey"); router.push("/admin/login"); }} className="text-sm text-white/70 hover:text-white">Logout</button>
        </div>
      </header>

      {section === "properties" && <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 mb-8">
          <StatCard label="Total Properties" value={stats.total} color="bg-navy" />
          <StatCard label="For Sale" value={stats.forSale} color="bg-navy-light" />
          <StatCard label="For Rent" value={stats.forRent} color="bg-teal-brand" />
          <StatCard label="Available" value={stats.available} color="bg-green-600" />
          <StatCard label="Sold / Rented" value={stats.sold} color="bg-slate-500" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-navy">Property Listings</h1>
          <button onClick={() => { setEditTarget(null); setShowForm(true); }} className="flex items-center gap-2 rounded-lg bg-navy px-4 py-2.5 text-sm font-bold text-white hover:bg-navy-light transition">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
            Add Property
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {[["all","All"],["sale","For Sale"],["rent","For Rent"],["available","Available"],["sold","Sold/Rented"]].map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)} className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${tab === key ? "bg-navy text-white" : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"}`}>
              {label}
            </button>
          ))}
        </div>

        {msg.text && (
          <div className={`mb-4 rounded-lg px-4 py-3 text-sm font-semibold ${msg.type === "error" ? "bg-red-50 border border-red-300 text-red-600" : "bg-teal-brand/10 border border-teal-brand text-teal-brand"}`}>
            {msg.text}
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white py-20 text-slate-400">
            <p className="font-medium">No properties in this category</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => (
              <PropertyCard key={p.id} property={p} onEdit={(prop) => { setEditTarget(prop); setShowForm(true); }} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </main>}

      {section === "messages" && (
        <div className="mx-auto max-w-4xl px-6 py-8">
          <h1 className="text-xl font-bold text-navy mb-6">Contact Messages ({messages.length})</h1>
          {messages.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white py-16 text-center text-slate-400">No messages yet.</div>
          ) : (
            <div className="flex flex-col gap-4">
              {messages.map((m) => (
                <div key={m._id} className={`rounded-2xl bg-white p-6 shadow-sm border-l-4 ${m.read ? "border-slate-200" : "border-teal-brand"}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {!m.read && <span className="rounded-full bg-teal-brand px-2 py-0.5 text-xs font-bold text-white">New</span>}
                        <span className="font-bold text-navy">{m.name}</span>
                        <span className="text-slate-400 text-sm">·</span>
                        <span className="text-slate-500 text-sm">{m.phone}</span>
                        {m.email && <><span className="text-slate-400 text-sm">·</span><span className="text-slate-500 text-sm">{m.email}</span></>}
                      </div>
                      {m.subject && <p className="text-sm font-semibold text-slate-600 mb-1">{m.subject}</p>}
                      <p className="text-sm text-slate-600 leading-relaxed">{m.message}</p>
                      <p className="text-xs text-slate-400 mt-2">{new Date(m.createdAt).toLocaleString()}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      {!m.read && (
                        <button onClick={async () => { await fetch("/api/messages", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ adminKey, id: m._id }) }); setMessages((prev) => prev.map((x) => x._id === m._id ? { ...x, read: true } : x)); }} className="rounded-lg border border-teal-brand px-3 py-1.5 text-xs font-semibold text-teal-brand hover:bg-teal-brand hover:text-white transition">Mark Read</button>
                      )}
                      <button onClick={async () => { if (!window.confirm("Delete this message?")) return; await fetch("/api/messages", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ adminKey, id: m._id }) }); setMessages((prev) => prev.filter((x) => x._id !== m._id)); }} className="rounded-lg border border-red-300 px-3 py-1.5 text-xs font-semibold text-red-500 hover:bg-red-500 hover:text-white transition">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {showForm && (
        <PropertyForm initial={editTarget} adminKey={adminKey} onSubmit={editTarget ? handleSave : handleAdd} onCancel={() => { setShowForm(false); setEditTarget(null); }} />
      )}
    </div>
  );
}
