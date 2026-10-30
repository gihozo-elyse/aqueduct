import { connectDB } from "../../lib/mongoose";
import Property from "../../lib/models/Property";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    const { district, plotCategory, propertyType, listingType, status } = req.query;
    const filter = {};
    if (district)      filter.district      = { $regex: new RegExp(`^${district}$`, "i") };
    if (plotCategory)  filter.plotCategory  = { $regex: new RegExp(`^${plotCategory}$`, "i") };
    if (propertyType) {
      const propertyTypes = (Array.isArray(propertyType) ? propertyType : String(propertyType).split(","))
        .map((type) => String(type).trim())
        .filter(Boolean);
      const escapedTypes = propertyTypes.map((type) => type.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
      if (escapedTypes.length === 1) filter.propertyType = { $regex: new RegExp(`^${escapedTypes[0]}$`, "i") };
      if (escapedTypes.length > 1) filter.propertyType = { $in: escapedTypes.map((type) => new RegExp(`^${type}$`, "i")) };
    }
    if (listingType)   filter.listingType   = listingType;
    if (status)        filter.status        = status;
    const list = await Property.find(filter).sort({ createdAt: -1 }).lean();
    return res.status(200).json(list);
  }

  if (req.method === "POST") {
    const { adminKey, ...data } = req.body;
    if (adminKey !== process.env.ADMIN_KEY) return res.status(401).json({ error: "Unauthorized" });
    const property = await Property.create(data);
    return res.status(201).json(property);
  }

  res.status(405).end();
}
