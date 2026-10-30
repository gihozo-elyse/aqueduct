import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import { sites, plotTypes, warehouseTypes, houseTypes, furnitureCategories } from "../lib/data";

function Chevron({ open }) {
  return (
    <svg
      className={`ml-1 h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
      viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
    >
      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
    </svg>
  );
}

function Dropdown({ id, label, basePath, items, openId, setOpenId }) {
  const open = openId === id;
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpenId(id)}
      onMouseLeave={() => setOpenId(null)}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpenId(open ? null : id)}
        className="flex items-center rounded px-1 py-2 font-bold text-white hover:text-teal-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-300"
      >
        {label}
        <Chevron open={open} />
      </button>
      {open && (
        <ul className="absolute left-0 top-full z-50 w-56 overflow-hidden rounded-md bg-white py-1 shadow-xl ring-1 ring-black/10">
          {items.map((item) => (
            <li key={item.slug}>
              <Link
                href={`${basePath}/${item.slug}`}
                className="block px-4 py-2 text-sm font-medium text-navy hover:bg-slate-100 hover:text-teal-brand"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Header() {
  const router = useRouter();
  const [openId, setOpenId] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState(null);
  const ref = useRef(null);

  // Close menus on navigation
  useEffect(() => {
    const close = () => { setOpenId(null); setMobileOpen(false); setMobileSub(null); };
    router.events.on("routeChangeComplete", close);
    return () => router.events.off("routeChangeComplete", close);
  }, [router.events]);

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    const onClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpenId(null); };
    const onKey = (e) => { if (e.key === "Escape") setOpenId(null); };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onClick); document.removeEventListener("keydown", onKey); };
  }, []);

  const linkClass = "rounded px-1 py-2 font-bold text-white hover:text-teal-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-300";

  return (
    <header ref={ref} className="sticky top-0 z-50 rounded-tl-3xl bg-navy">
      <div className="mx-auto flex h-[88px] max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-9">
          <Link href="/" aria-label="Aqueduct home" className="h-[72px] w-[72px] shrink-0 rounded-lg bg-white p-1">
            <Logo />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
            <Link href="/" className={linkClass}>Home</Link>
            <Link href="/about" className={linkClass}>About Us</Link>
            <Dropdown id="sites" label="Sites" basePath="/sites" items={sites} openId={openId} setOpenId={setOpenId} />
            <Dropdown id="houses" label="Houses" basePath="/houses" items={houseTypes} openId={openId} setOpenId={setOpenId} />
            <Dropdown id="plots" label="Plots" basePath="/plots" items={plotTypes} openId={openId} setOpenId={setOpenId} />
            <Link href="/services" className={linkClass}>Services</Link>
            <Link href="/property-valuation-rwanda" className={linkClass}>Valuation</Link>
            <Dropdown id="warehouse" label="Warehouse" basePath="/warehouse" items={warehouseTypes} openId={openId} setOpenId={setOpenId} />
            <Dropdown id="furniture" label="Furnitures" basePath="/furniture" items={furnitureCategories} openId={openId} setOpenId={setOpenId} />
            <Link href="/contact" className={linkClass}>Contact Us</Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded p-2 text-white md:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="border-t border-white/10 px-6 pb-4 md:hidden" aria-label="Mobile">
          <ul className="flex flex-col text-white">
            <li><Link href="/" className="block py-3 font-bold">Home</Link></li>
            <li><Link href="/about" className="block py-3 font-bold">About Us</Link></li>
            {[
              { id: "sites", label: "Sites", base: "/sites", items: sites },
              { id: "houses", label: "Houses", base: "/houses", items: houseTypes },
              { id: "plots", label: "Plots", base: "/plots", items: plotTypes },
              { id: "warehouse", label: "Warehouse", base: "/warehouse", items: warehouseTypes },
              { id: "furniture", label: "Furnitures", base: "/furniture", items: furnitureCategories },
            ].map((g) => (
              <li key={g.id}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between py-3 font-bold"
                  aria-expanded={mobileSub === g.id}
                  onClick={() => setMobileSub(mobileSub === g.id ? null : g.id)}
                >
                  {g.label}
                  <Chevron open={mobileSub === g.id} />
                </button>
                {mobileSub === g.id && (
                  <ul className="mb-2 ml-3 border-l border-white/20 pl-4">
                    {g.items.map((i) => (
                      <li key={i.slug}>
                        <Link href={`${g.base}/${i.slug}`} className="block py-2 text-white/90">{i.name}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li><Link href="/services" className="block py-3 font-bold">Services</Link></li>
            <li><Link href="/property-valuation-rwanda" className="block py-3 font-bold">Property Valuation</Link></li>
            <li><Link href="/contact" className="block py-3 font-bold">Contact Us</Link></li>
          </ul>
        </nav>
      )}
    </header>
  );
}
