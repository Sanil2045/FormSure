import mongoose from "mongoose";

const EmailSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  status: { type: String, required: true, enum: ["pending", "verified", "rejected"] },
}, { timestamps: true });

const Email = mongoose.models.Email || mongoose.model("Email", EmailSchema);

export default Email;