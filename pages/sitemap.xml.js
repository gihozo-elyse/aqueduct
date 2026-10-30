import { connectDB } from "../lib/mongoose";
import Property from "../lib/models/Property";
import { furnitureCategories, houseTypes, plotTypes, sites, warehouseTypes } from "../lib/data";

const SITE_URL = "https://www.aqueductconsultant.com";

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export default function Sitemap() {
  return null;
}

export async function getServerSideProps({ res }) {
  await connectDB();
  const properties = await Property.find().select("_id updatedAt").lean();
  const staticPaths = [
    "/",
    "/about",
    "/services",
    "/contact",
    "/plots",
    "/sites",
    "/warehouse",
    "/warehouse-for-rent-rwanda",
    "/property-valuation-rwanda",
    "/furniture",
    ...plotTypes.map(({ slug }) => `/plots/${slug}`),
    ...sites.map(({ slug }) => `/sites/${slug}`),
    ...houseTypes.map(({ slug }) => `/houses/${slug}`),
    ...warehouseTypes.map(({ slug }) => `/warehouse/${slug}`),
    ...furnitureCategories.map(({ slug }) => `/furniture/${slug}`),
  ];
  const entries = [
    ...staticPaths.map((url) => ({ url })),
    ...properties.map((property) => ({
      url: `/properties/${property._id}`,
      lastmod: property.updatedAt,
    })),
  ];
  const urls = entries.map(({ url, lastmod }) => {
    const lastmodTag = lastmod ? `<lastmod>${new Date(lastmod).toISOString()}</lastmod>` : "";
    return `<url><loc>${escapeXml(`${SITE_URL}${url}`)}</loc>${lastmodTag}</url>`;
  }).join("");

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600");
  res.statusCode = 200;
  res.end(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`);
  return { props: {} };
}
