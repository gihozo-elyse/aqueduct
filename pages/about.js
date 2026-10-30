import Layout from "../components/Layout";

export default function About() {
  return (
    <Layout
      title="About Us"
      description="Learn about Aqueduct Consultant Ltd, a real estate valuation and property management firm based in Kigali, Rwanda."
    >
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-80px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(80px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .card-main {
          animation: fadeSlideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .card-left {
          animation: slideInLeft 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both;
        }
        .card-right {
          animation: slideInRight 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.4s both;
        }
        .card-hover {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(23,51,92,0.15);
        }
      `}</style>

      <section className="mx-auto max-w-4xl px-6 py-16 space-y-10">

        {/* About card */}
        <div
          className="card-main card-hover rounded-2xl border border-slate-200 bg-white p-10"
          style={{ boxShadow: "0 8px 32px rgba(23,51,92,0.10)" }}
        >
          <div className="mb-6 flex items-center gap-4">
            <div className="h-1 w-12 rounded-full bg-teal-brand" />
            <span className="text-sm font-bold uppercase tracking-widest text-teal-brand">Who We Are</span>
          </div>
          <h1 className="text-3xl font-bold leading-snug text-navy sm:text-4xl">Aqueduct Consultant Ltd</h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Aqueduct Consultant Ltd is a professional real estate Valuation and property management firm based in{" "}
            <span className="font-semibold text-navy">Kigali, Rwanda</span>. We provide reliable, accurate, and
            client‑focused real estate solutions tailored to individual and corporate needs.
          </p>
        </div>

        {/* Mission & Vision cards */}
        <div className="grid gap-8 sm:grid-cols-2">

          {/* Mission */}
          <div
            className="card-left card-hover rounded-2xl border border-slate-200 bg-white p-8"
            style={{ boxShadow: "0 8px 32px rgba(23,51,92,0.10)" }}
          >
            <img src="/log.jpeg" alt="Aqueduct" className="mb-4 h-14 w-14 object-contain" />
            <h2 className="text-xl font-bold text-navy mb-4">Our Mission</h2>
            <p className="text-slate-600 leading-relaxed">
              To value every property with honesty and care,<br />
              To manage every asset with excellence and fairness.<br />
              Building trust in every service we provide,<br />
              Creating lasting value for every client by our side.
            </p>
          </div>

          {/* Vision */}
          <div
            className="card-right card-hover rounded-2xl border border-slate-200 bg-white p-8"
            style={{ boxShadow: "0 8px 32px rgba(23,51,92,0.10)" }}
          >
            <img src="/log.jpeg" alt="Aqueduct" className="mb-4 h-14 w-14 object-contain" />
            <h2 className="text-xl font-bold text-navy mb-4">Our Vision</h2>
            <p className="text-slate-600 leading-relaxed">
              To shape a future where properties thrive,<br />
              Where trust and excellence keep dreams alive.<br />
              To be Rwanda's trusted name in real estate,<br />
              Building lasting value for generations to celebrate.
            </p>
          </div>

        </div>

        {/* Founder & Contact cards */}
        <div className="grid gap-8 sm:grid-cols-2">

        {/* Founder card */}
        <div
          className="card-left card-hover rounded-2xl border border-slate-200 bg-white p-8"
          style={{ boxShadow: "0 8px 32px rgba(23,51,92,0.10)" }}
        >
          <div className="mb-6 flex items-center gap-4">
            <div className="h-1 w-12 rounded-full bg-teal-brand" />
            <span className="text-sm font-bold uppercase tracking-widest text-teal-brand">Founder / CEO / Managing Director</span>
          </div>
          <img src="/log.jpeg" alt="Aqueduct" className="mb-4 h-14 w-14 object-contain" />
          <h2 className="text-xl font-bold text-navy">Mr Jean Bosco RUKUNDO</h2>
          <div className="mt-4 space-y-2 text-slate-600">
            <p><span className="font-semibold text-navy">Qualification:</span> BSc. in Estate Management and Valuation</p>
            <p><span className="font-semibold text-navy">Certified Valuer</span></p>
            <p><span className="font-semibold text-navy">Registered in:</span> Institute of Real Property Valuers in Rwanda</p>
            <p><span className="font-semibold text-navy">Registration No:</span> RC/IRPV/352/2026</p>
          </div>
        </div>

        {/* Contact card */}
        <div
          className="card-right card-hover rounded-2xl border border-slate-200 bg-white p-8"
          style={{ boxShadow: "0 8px 32px rgba(23,51,92,0.10)" }}
        >
          <div className="mb-6 flex items-center gap-4">
            <div className="h-1 w-12 rounded-full bg-teal-brand" />
            <span className="text-sm font-bold uppercase tracking-widest text-teal-brand">Address &amp; Contacts</span>
          </div>
          <div className="flex flex-col gap-4 text-slate-600">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📧</span>
              <div>
                <p className="font-bold text-navy">Email</p>
                <a href="mailto:rukundobosco45@gmail.com" className="hover:text-teal-brand break-all">rukundobosco45@gmail.com</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">📞</span>
              <div>
                <p className="font-bold text-navy">Phone</p>
                <a href="tel:+250785517847" className="hover:text-teal-brand">+250 785 517 847</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">📍</span>
              <div>
                <p className="font-bold text-navy">Address</p>
                <p>Kigali‑Nyarugenge, Saint Famille, KN1 Street</p>
              </div>
            </div>
          </div>
        </div>

        </div>

      </section>
    </Layout>
  );
}
