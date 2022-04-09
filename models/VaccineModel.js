import mongoose from "mongoose";
const { Schema } = mongoose;

const VaccineSchema = new Schema(
  {
    vaccineTypes: [
      {
        vaccineType: String,
        available: Boolean,
      },
    ],
    hospitalId: {
      type: Schema.Types.ObjectId,
      ref: "Hospital",
      default:null,
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

export default mongoose.model("Vaccine", VaccineSchema);
