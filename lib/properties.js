import fs from "fs";
import path from "path";

const FILE = path.join(process.cwd(), "data", "properties.json");

function ensureFile() {
  const dir = path.dirname(FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, "[]", "utf8");
}

export function getProperties() {
  ensureFile();
  return JSON.parse(fs.readFileSync(FILE, "utf8"));
}

export function saveProperties(list) {
  ensureFile();
  fs.writeFileSync(FILE, JSON.stringify(list, null, 2), "utf8");
}

export function filterProperties({ district, plotCategory, propertyType, listingType, status } = {}) {
  let list = getProperties();
  if (district) list = list.filter((p) => p.district?.toLowerCase() === district.toLowerCase());
  if (plotCategory) list = list.filter((p) => p.plotCategory?.toLowerCase() === plotCategory.toLowerCase());
  if (propertyType) list = list.filter((p) => p.propertyType?.toLowerCase() === propertyType.toLowerCase());
  if (listingType) list = list.filter((p) => p.listingType?.toLowerCase() === listingType.toLowerCase());
  if (status) list = list.filter((p) => p.status?.toLowerCase() === status.toLowerCase());
  return list;
}
