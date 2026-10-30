# Aqueduct website (Next.js Pages Router + Tailwind CSS)

    npm install
    npm run dev

Open http://localhost:3000

- Edit sites, plot types and services in `lib/data.js`
- To use your own logo, save it as `public/logo.png` and in `components/Logo.jsx` return:
  `<img src="/logo.png" alt="Aqueduct" className="h-full w-full object-contain" />`

## Search and performance setup

- The sitemap is served dynamically at `/sitemap.xml` and includes public routes and MongoDB property listings. Keep `MONGODB_URI` configured in production so the sitemap and server-rendered property pages can read current listings.
- Submit `https://www.aqueductconsultant.com/sitemap.xml` in Google Search Console after verifying ownership of the domain. Set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` to the verification token if using the HTML-tag method; DNS verification is configured with the domain provider instead.
- To enable Google Analytics 4, set `NEXT_PUBLIC_GA_ID` to the measurement ID (for example, `G-XXXXXXXXXX`). Tracking is omitted when this variable is unset.
- Property image uploads are resized to a maximum of 1600 × 1200 and encoded as WebP. Public property images use Next.js image optimization where the source is hosted on this site.
