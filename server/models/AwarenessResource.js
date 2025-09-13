import mongoose from "mongoose";

const awarenessResourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    type: { type: String, required: true, enum: ["video", "article", "document"] },
    url: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
  },
  { timestamps: true }
);

const AwarenessResource = mongoose.model("AwarenessResource", awarenessResourceSchema);
export default AwarenessResource;
