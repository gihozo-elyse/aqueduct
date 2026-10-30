import { connectDB } from "../../../lib/mongoose";
import Property from "../../../lib/models/Property";

export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;

  if (req.method === "GET") {
    const property = await Property.findById(id).lean();
    if (!property) return res.status(404).json({ error: "Not found" });
    return res.status(200).json(property);
  }

  const { adminKey, ...data } = req.body || {};
  if (adminKey !== process.env.ADMIN_KEY) return res.status(401).json({ error: "Unauthorized" });

  if (req.method === "PUT") {
    const property = await Property.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean();
    if (!property) return res.status(404).json({ error: "Not found" });
    return res.status(200).json(property);
  }

  if (req.method === "DELETE") {
    await Property.findByIdAndDelete(id);
    return res.status(200).json({ ok: true });
  }

  res.status(405).end();
}
