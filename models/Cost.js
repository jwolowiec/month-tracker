import mongoose from "mongoose";

const costSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    cost: { type: Number, required: true, min: 0 },
    category: {type: String, enum: ["Cykliczne", "Nieplanowane", "Niezbędne", "Przyjemności", "Zbędne"], default: "Nieplanowane"},
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

export default mongoose.model("Cost", costSchema);
