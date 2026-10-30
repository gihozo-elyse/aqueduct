export default function PageBanner({ title, text }) {
  return (
    <section className="bg-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <h1 className="text-3xl font-bold text-navy sm:text-4xl">{title}</h1>
        {text && <p className="mt-3 max-w-2xl text-lg text-slate-600">{text}</p>}
      </div>
    </section>
  );
}
