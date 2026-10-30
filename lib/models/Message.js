import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    name:    { type: String, required: true },
    phone:   { type: String, required: true },
    email:   { type: String },
    subject: { type: String },
    message: { type: String, required: true },
    read:    { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Message || mongoose.model("Message", MessageSchema);
