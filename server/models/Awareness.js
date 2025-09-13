// models/Awareness.js
import mongoose from "mongoose";

const AwarenessSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["article", "video", "document"],
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    description: { type: String, trim: true },
    category: { type: String, trim: true }, // added
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Awareness = mongoose.model("Awareness", AwarenessSchema);
export default Awareness;
