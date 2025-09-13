// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    household: {
      members: { type: Number, default: 1 },
      location: { type: String }, // optional for awareness/local emission factors
    },
    isAdmin: { 
      type: Boolean, 
      default: false 
    },
    // Awareness bookmarks (user can save recommended articles/videos/docs)
    savedAwareness: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Awareness" }
    ]
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
