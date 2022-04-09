import mongoose from "mongoose";
const { Schema } = mongoose;

const BloodSchema = new Schema(
  {
    bloodTypes: [
      {
        bloodType: String,
        available: Boolean,
      },
    ],
    hospitalId: {
      type: Schema.Types.ObjectId,
      ref: "Hospital",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("BloodBank", BloodSchema);
