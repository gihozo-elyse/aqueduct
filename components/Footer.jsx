import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white/80">
      <div className="mx-auto max-w-7xl px-6 py-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

        {/* Brand */}
        <div>
          <p className="font-bold text-white text-lg mb-2">Aqueduct Consultant Ltd</p>
          <p className="text-sm text-white/60 leading-relaxed">Professional real estate valuation and property management in Rwanda.</p>
          <p className="text-sm text-white/60 mt-3">Kigali-Nyarugenge, Saint Famille, KN1 Street</p>
          <a href="tel:+250785517847" className="text-sm text-teal-brand mt-1 block hover:text-white">+250 785 517 847</a>
        </div>

        {/* Properties */}
        <div>
          <p className="font-bold text-white mb-3">Properties</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/plots" className="hover:text-white transition">Plots for Sale — Ibibanza Bigurishwa</Link></li>
            <li><Link href="/houses-for-sale-rwanda" className="hover:text-white transition">Houses for Sale in Rwanda</Link></li>
            <li><Link href="/houses/for-rent" className="hover:text-white transition">Houses for Rent — Amazu Akodeshwa</Link></li>
            <li><Link href="/warehouse-for-rent-rwanda" className="hover:text-white transition">Warehouse for Rent in Rwanda</Link></li>
            <li><Link href="/furniture" className="hover:text-white transition">Furnitures Rwanda</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <p className="font-bold text-white mb-3">Services</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/property-valuation-rwanda" className="hover:text-white transition">Property Valuation in Rwanda</Link></li>
            <li><Link href="/services" className="hover:text-white transition">All Services</Link></li>
            <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white transition">Contact Us</Link></li>
          </ul>
        </div>

        {/* Locations */}
        <div>
          <p className="font-bold text-white mb-3">Locations</p>
          <ul className="space-y-2 text-sm">
            {["Kigali", "Kamonyi", "Bugesera", "Rwamagana", "Rulindo"].map((s) => (
              <li key={s}><Link href={`/sites/${s.toLowerCase()}`} className="hover:text-white transition">Plots in {s}</Link></li>
            ))}
          </ul>
        </div>

      </div>
      <div className="border-t border-white/10 px-6 py-4 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Aqueduct Consultant Ltd. All rights reserved. | Kigali, Rwanda
      </div>
    </footer>
  );
}
