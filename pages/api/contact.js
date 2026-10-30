import nodemailer from "nodemailer";
import { connectDB } from "../../lib/mongoose";
import Message from "../../lib/models/Message";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { name, phone, email, subject, message } = req.body;

  if (!name?.trim() || !phone?.trim() || !message?.trim()) {
    return res.status(400).json({ error: "Name, phone and message are required." });
  }

  await connectDB();

  // 1. Save to MongoDB
  await Message.create({ name, phone, email, subject, message });

  // 2. Send email notification
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Aqueduct Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `New Contact Message: ${subject || "No subject"}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
          <div style="background:#17335c;padding:24px;text-align:center;">
            <h2 style="color:#fff;margin:0;">New Message — Aqueduct Website</h2>
          </div>
          <div style="padding:24px;background:#fff;">
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <tr><td style="padding:8px 0;color:#64748b;width:120px;">Name</td><td style="padding:8px 0;font-weight:600;color:#17335c;">${name}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b;">Phone</td><td style="padding:8px 0;font-weight:600;color:#17335c;">${phone}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b;">Email</td><td style="padding:8px 0;color:#17335c;">${email || "—"}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b;">Subject</td><td style="padding:8px 0;color:#17335c;">${subject || "—"}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b;vertical-align:top;">Message</td><td style="padding:8px 0;color:#17335c;">${message}</td></tr>
            </table>
          </div>
          <div style="background:#f8fafc;padding:16px;text-align:center;font-size:12px;color:#94a3b8;">
            Aqueduct Consultant Ltd — Kigali, Rwanda
          </div>
        </div>
      `,
    });
  } catch (emailErr) {
    console.error("Email send failed:", emailErr.message);
    // Still return success — message was saved to DB
  }

  return res.status(200).json({ ok: true });
}
