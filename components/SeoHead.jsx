import Head from "next/head";

const WA = "250785517847";
const PHONE = "+250785517847";
const EMAIL = "rukundobosco45@gmail.com";
const SITE_URL = "https://www.aqueductconsultant.com";

export default function SeoHead({ title, description, url = "/", image = "/log.jpeg", lang = "en", altLang, altLangUrl }) {
  const fullUrl = new URL(url, SITE_URL).toString();
  const imageUrl = new URL(image, SITE_URL).toString();
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Aqueduct Consultant Ltd",
    url: SITE_URL,
    telephone: PHONE,
    email: EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Saint Famille, KN1 Street",
      addressLocality: "Kigali",
      addressCountry: "RW",
    },
    sameAs: [`https://wa.me/${WA}`],
  };

  return (
    <Head>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={fullUrl} />
      {process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && (
        <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION} />
      )}

      {/* hreflang */}
      <link rel="alternate" hrefLang="en" href={fullUrl} />
      {altLang && altLangUrl && <link rel="alternate" hrefLang={altLang} href={`${SITE_URL}${altLangUrl}`} />}
      <link rel="alternate" hrefLang="x-default" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="Aqueduct Consultant Ltd" />
      <meta property="og:image" content={imageUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* LocalBusiness Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  );
}
