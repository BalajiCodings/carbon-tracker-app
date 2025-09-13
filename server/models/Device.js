import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    deviceName: { type: String, required: true, trim: true },
    wattage: { type: Number, required: true, min: 0 },
    activityTime: { type: Number, required: true, min: 0 }, // daily usage in hours
    emissionFactor: { type: Number, required: true, default: 0.85 }, // kg CO2/kWh
    kWh: { type: Number, default: 0 }, // auto-calc
    emission: { type: Number, default: 0 }, // auto-calc
  },
  { timestamps: true }
);

// Auto-calc before save
deviceSchema.pre("save", function (next) {
  const kWh = (this.wattage / 1000) * this.activityTime;
  this.kWh = kWh;
  this.emission = kWh * this.emissionFactor;
  next();
});

const Device = mongoose.model("Device", deviceSchema);
export default Device;

