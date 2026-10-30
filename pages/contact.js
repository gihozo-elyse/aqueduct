import { useState } from "react";
import Layout from "../components/Layout";

const WA_NUMBER = "250785517847";
const CALL_NUMBER = "+250785517847";
const EMAIL = "rukundobosco45@gmail.com";

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  function set(f, v) { setForm((p) => ({ ...p, [f]: v })); setErrors((e) => ({ ...e, [f]: "" })); }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.phone.trim()) e.phone = "Phone is required.";
    if (!form.message.trim()) e.message = "Message is required.";
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) { setSent(true); }
      else { setErrors({ message: "Failed to send. Please try again." }); }
    } catch {
      setErrors({ message: "Network error. Please try again." });
    }
    setSending(false);
  }

  const field = "w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-brand transition";
  const err = "text-red-500 text-xs mt-1";

  return (
    <Layout
      title="Contact Us"
      description="Contact Aqueduct Consultant Ltd in Kigali, Rwanda about property sales, rentals, valuation and management."
    >
      {/* Hero */}
      <section className="bg-navy px-6 py-16 text-center text-white">
        <h1 className="text-4xl font-extrabold">Contact <span className="text-teal-brand">Us</span></h1>
        <p className="mx-auto mt-4 max-w-xl text-white/70">
          Reach out to Aqueduct Consultant Ltd for professional real estate valuation and property management services.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14 grid gap-10 lg:grid-cols-2">

        {/* Contact info */}
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-navy">Get In Touch</h2>

          <ContactItem icon={<PhoneIcon />} label="Phone / WhatsApp">
            <a href={`tel:${CALL_NUMBER}`} className="text-navy font-semibold hover:text-teal-brand">{CALL_NUMBER}</a>
          </ContactItem>

          <ContactItem icon={<WAIcon />} label="WhatsApp">
            <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-green-600 transition">
              Chat on WhatsApp
            </a>
          </ContactItem>

          <ContactItem icon={<EmailIcon />} label="Email">
            <a href={`mailto:${EMAIL}`} className="text-navy font-semibold hover:text-teal-brand">{EMAIL}</a>
          </ContactItem>

          <ContactItem icon={<LocationIcon />} label="Address">
            <p className="text-slate-600">Kigali‑Nyarugenge, Saint Famille, KN1 Street</p>
          </ContactItem>
        </div>

        {/* Form */}
        <div className="rounded-2xl bg-white p-8 shadow-lg" style={{ boxShadow: "0 8px 32px rgba(23,51,92,0.10)" }}>
          <h2 className="text-xl font-bold text-navy mb-6">Send Us a Message</h2>

          {sent ? (
            <div className="rounded-xl bg-teal-brand/10 border border-teal-brand px-6 py-8 text-center">
              <svg className="mx-auto h-12 w-12 text-teal-brand mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
              <p className="font-bold text-navy text-lg">Message Sent!</p>
              <p className="text-slate-500 text-sm mt-1">We will get back to you as soon as possible.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-navy mb-1">Name *</label>
                  <input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Your name" className={field} />
                  {errors.name && <p className={err}>{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy mb-1">Phone *</label>
                  <input value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+250 7XX XXX XXX" className={field} />
                  {errors.phone && <p className={err}>{errors.phone}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy mb-1">Email</label>
                <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="your@email.com" className={field} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy mb-1">Subject</label>
                <input value={form.subject} onChange={(e) => set("subject", e.target.value)} placeholder="How can we help?" className={field} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy mb-1">Message *</label>
                <textarea rows={4} value={form.message} onChange={(e) => set("message", e.target.value)} placeholder="Write your message here…" className={field} />
                {errors.message && <p className={err}>{errors.message}</p>}
              </div>
              <button type="submit" disabled={sending} className="h-12 rounded-lg bg-navy text-white font-bold text-sm hover:bg-navy-light transition disabled:opacity-60">
                {sending ? "Sending…" : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </section>
    </Layout>
  );
}

function ContactItem({ icon, label, children }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-brand/10 text-teal-brand">{icon}</div>
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">{label}</p>
        {children}
      </div>
    </div>
  );
}

function PhoneIcon() {
  return <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" /></svg>;
}
function WAIcon() {
  return <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.855L0 24l6.335-1.508A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.371l-.36-.214-3.727.977.994-3.634-.235-.374A9.818 9.818 0 1112 21.818z"/></svg>;
}
function EmailIcon() {
  return <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>;
}
function LocationIcon() {
  return <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" /></svg>;
}
