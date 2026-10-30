import { useState } from "react";
import Link from "next/link";
import Layout from "../components/Layout";

const WA = "250785517847";
const CALL = "+250785517847";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is property valuation in Rwanda? / Igenagaciro ry'umutungo mu Rwanda ni iki?",
      acceptedAnswer: { "@type": "Answer", text: "Property valuation in Rwanda is the professional process of estimating the market value of land, buildings, or other real estate assets. It is carried out by a certified valuer registered with the Institute of Real Property Valuers in Rwanda (IRPV). Valuation is required for sales, mortgages, insurance, taxation, and legal purposes. / Igenagaciro ry'umutungo mu Rwanda ni uburyo bw'umwuga bwo gushyiraho agaciro k'ubutaka, inyubako, cyangwa indi mitungo itimukanwa. Rikorwa n'umugenagaciro wemerewe wanditswe muri IRPV." }
    },
    {
      "@type": "Question",
      name: "Who is a valuer? / Umugenagaciro ni muntu ki?",
      acceptedAnswer: { "@type": "Answer", text: "A valuer is a trained and certified professional who assesses the monetary value of real property. In Rwanda, valuers must be registered with the Institute of Real Property Valuers in Rwanda (IRPV) and hold a relevant qualification such as a BSc in Estate Management and Valuation. / Umugenagaciro ni inzobere yigishijwe kandi yemerewe gushyiraho agaciro k'umutungo. Mu Rwanda, abagenagaciro bagomba kwandikwa muri IRPV kandi bafite impamyabumenyi nka BSc mu Gucunga no Gushyiraho Agaciro k'Umutungo." }
    },
    {
      "@type": "Question",
      name: "What does a valuer do? / Umugenagaciro akora iki?",
      acceptedAnswer: { "@type": "Answer", text: "A valuer inspects the property, researches comparable sales and market data, applies recognized valuation methods, and produces a formal written valuation report. They advise clients on market value for buying, selling, renting, mortgaging, insuring, or taxing property. / Umugenagaciro asuzuma umutungo, ashakisha amakuru y'isoko, akoresha uburyo bwemerewe bwo gushyiraho agaciro, hanyuma akandika raporo. Agira inama abakiriya ku gaciro k'isoko mu kugura, kugurisha, gukodesha, cyangwa gufatira inguzanyo." }
    },
    {
      "@type": "Question",
      name: "How is property valuation done in Rwanda? / Igenagaciro rikorwa rite mu Rwanda?",
      acceptedAnswer: { "@type": "Answer", text: "In Rwanda, property valuation follows internationally recognized standards. The valuer visits the site, collects data on location, size, condition, and comparable transactions, then applies methods such as the sales comparison approach, income approach, or cost approach. A formal report is issued and signed by the registered valuer. / Mu Rwanda, igenagaciro ry'umutungo rikurikiza amahame mpuzamahanga. Umugenagaciro asura ahantu, akusanya amakuru, hanyuma akoresha uburyo nka comparison, income, cyangwa cost approach. Raporo isinywa n'umugenagaciro wanditswe." }
    },
    {
      "@type": "Question",
      name: "Where can I find a property valuer in Rwanda? / Ese nakurahe umugenagaciro mu Rwanda?",
      acceptedAnswer: { "@type": "Answer", text: "You can find a registered property valuer in Rwanda through the Institute of Real Property Valuers in Rwanda (IRPV) or by contacting a reputable real estate firm such as Aqueduct Consultant Ltd, based in Kigali. Our certified valuer, Mr Jean Bosco RUKUNDO (RC/IRPV/352/2026), is available to assist you. / Ushobora kubona umugenagaciro wanditswe mu Rwanda binyuze muri IRPV cyangwa usabe sosiyete nziza nka Aqueduct Consultant Ltd i Kigali." }
    },
    {
      "@type": "Question",
      name: "How much does a property valuation report cost in Rwanda? / Igenagaciro rikorwa angahe mu Rwanda?",
      acceptedAnswer: { "@type": "Answer", text: "The cost of a property valuation report in Rwanda depends on the type, size, and complexity of the property. Fees are generally calculated as a percentage of the assessed value or as a fixed professional fee. Contact Aqueduct Consultant Ltd for a free quote tailored to your property. / Igiciro cy'igenagaciro ry'umutungo mu Rwanda gishingira ku bwoko, ingano, n'ubukurikacyaha bw'umutungo. Twandikire cyangwa tuhamagare kugira ngo tubone igiciro cy'ubuntu." }
    },
  ],
};

const sections = faqSchema.mainEntity;

export default function PropertyValuation() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, subject: "Property Valuation Request" }) });
    setSent(true);
  }

  const inp = "w-full h-11 rounded-lg border border-slate-200 px-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-brand transition";

  return (
    <Layout
      title="Property Valuation in Rwanda"
      description="Professional property valuation in Rwanda by a certified IRPV valuer. Residential, commercial and land valuation in Kigali. Request a report today."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy px-6 py-16 text-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-teal-brand/10" />
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="mb-3 inline-block rounded-full border border-teal-brand/40 px-4 py-1 text-xs font-semibold text-teal-brand tracking-widest uppercase">Igenagaciro ry'Umutungo mu Rwanda</span>
          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">Property Valuation in <span className="text-teal-brand">Rwanda</span></h1>
          <p className="mx-auto mt-5 max-w-2xl text-white/75 leading-relaxed">Aqueduct Consultant Ltd provides accurate, professional property valuation services in Rwanda. Our certified valuer is registered with the Institute of Real Property Valuers in Rwanda (IRPV).</p>
          <a href="#request" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-teal-brand px-7 py-3 text-sm font-bold text-white hover:opacity-90 transition">Request a Valuation</a>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 50" preserveAspectRatio="none" className="h-10 w-full" fill="#f8fafc"><path d="M0,25 C360,50 1080,0 1440,25 L1440,50 L0,50 Z" /></svg>
        </div>
      </section>

      {/* Valuer profile */}
      <section className="mx-auto max-w-3xl px-6 py-12">
        <div className="rounded-2xl bg-white border border-slate-200 p-8 shadow-md flex flex-col sm:flex-row gap-6 items-center" style={{ boxShadow: "0 4px 24px rgba(23,51,92,0.08)" }}>
          <div className="h-20 w-20 shrink-0 rounded-full bg-teal-brand/10 flex items-center justify-center">
            <svg className="h-10 w-10 text-teal-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" /></svg>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-teal-brand mb-1">Our Certified Valuer</p>
            <h2 className="text-xl font-bold text-navy">Mr Jean Bosco RUKUNDO</h2>
            <p className="text-sm text-slate-600 mt-1">BSc. Estate Management and Valuation · Certified Valuer</p>
            <p className="text-sm text-slate-500">Registered: Institute of Real Property Valuers in Rwanda</p>
            <p className="text-sm text-slate-500">Registration No: RC/IRPV/352/2026</p>
          </div>
        </div>
      </section>

      {/* Bilingual content sections */}
      <section className="bg-slate-50 px-6 py-14">
        <div className="mx-auto max-w-4xl space-y-10">
          {sections.map((s) => (
            <div key={s.name} className="rounded-2xl bg-white p-8 shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-navy mb-4">{s.name}</h2>
              <p className="text-slate-600 leading-relaxed text-sm">{s.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ accordion */}
      <section className="mx-auto max-w-3xl px-6 py-14">
        <h2 className="text-2xl font-bold text-navy mb-8">Quick FAQ — Property Valuation in Rwanda</h2>
        {sections.map((f) => (
          <details key={f.name} className="mb-4 rounded-xl border border-slate-200 bg-white p-5 cursor-pointer">
            <summary className="font-semibold text-navy text-sm">{f.name}</summary>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">{f.acceptedAnswer.text}</p>
          </details>
        ))}
      </section>

      {/* Request form */}
      <section id="request" className="bg-navy px-6 py-14">
        <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow-xl">
          <h2 className="text-xl font-bold text-navy mb-1">Request a Property Valuation</h2>
          <p className="text-slate-500 text-sm mb-6">Fill in the form below and our certified valuer will contact you within 24 hours.</p>
          {sent ? (
            <div className="rounded-xl bg-teal-brand/10 border border-teal-brand px-6 py-8 text-center">
              <p className="font-bold text-navy">Request received! We will contact you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input required value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder="Your Name" className={inp} />
              <input required value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} placeholder="Phone / WhatsApp" className={inp} />
              <input type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} placeholder="Email (optional)" className={inp} />
              <textarea rows={4} value={form.message} onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))} placeholder="Describe your property (type, location, size)…" className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-brand" />
              <button type="submit" className="h-11 rounded-lg bg-navy text-white font-bold text-sm hover:bg-navy-light transition">Submit Valuation Request</button>
            </form>
          )}
          <div className="mt-4 flex gap-3">
            <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-green-500 py-2.5 text-xs font-bold text-white hover:bg-green-600 transition">WhatsApp Us</a>
            <a href={`tel:${CALL}`} className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-navy py-2.5 text-xs font-bold text-navy hover:bg-navy hover:text-white transition">Call Us</a>
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-wrap gap-3">
          {[["Houses for Sale", "/houses-for-sale-rwanda"], ["Plots for Sale", "/plots"], ["Warehouse for Rent", "/warehouse-for-rent-rwanda"], ["Our Services", "/services"], ["Contact Us", "/contact"]].map(([label, href]) => (
            <Link key={href} href={href} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-navy hover:border-teal-brand hover:text-teal-brand transition">{label}</Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}
