import mongoose from "mongoose";

const ConfirmationSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
}, { timestamps: true });

const Confirmation = mongoose.models.Confirmation || mongoose.model("Confirmation", ConfirmationSchema);

export default Confirmation;