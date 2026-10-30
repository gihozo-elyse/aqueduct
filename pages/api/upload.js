import fs from "fs";
import path from "path";

export const config = { api: { bodyParser: { sizeLimit: "10mb" } } };

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { adminKey, base64, filename } = req.body;
  if (adminKey !== process.env.ADMIN_KEY) return res.status(401).json({ error: "Unauthorized" });

  const ext = path.extname(filename).toLowerCase();
  const allowed = [".jpg", ".jpeg", ".png", ".webp"];
  if (!allowed.includes(ext)) return res.status(400).json({ error: "Invalid file type" });

  const dir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const name = `${Date.now()}${ext}`;
  const buffer = Buffer.from(base64.split(",")[1], "base64");
  fs.writeFileSync(path.join(dir, name), buffer);

  return res.status(200).json({ url: `/uploads/${name}` });
}
