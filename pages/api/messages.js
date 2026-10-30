import { connectDB } from "../../lib/mongoose";
import Message from "../../lib/models/Message";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    const { adminKey } = req.query;
    if (adminKey !== process.env.ADMIN_KEY) return res.status(401).json({ error: "Unauthorized" });
    const messages = await Message.find().sort({ createdAt: -1 }).lean();
    return res.status(200).json(messages);
  }

  if (req.method === "PATCH") {
    const { adminKey, id } = req.body;
    if (adminKey !== process.env.ADMIN_KEY) return res.status(401).json({ error: "Unauthorized" });
    await Message.findByIdAndUpdate(id, { read: true });
    return res.status(200).json({ ok: true });
  }

  if (req.method === "DELETE") {
    const { adminKey, id } = req.body;
    if (adminKey !== process.env.ADMIN_KEY) return res.status(401).json({ error: "Unauthorized" });
    await Message.findByIdAndDelete(id);
    return res.status(200).json({ ok: true });
  }

  res.status(405).end();
}
