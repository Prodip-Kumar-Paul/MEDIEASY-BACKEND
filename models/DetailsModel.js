import mongoose from "mongoose";
const { Schema } = mongoose;

const DetailsSchema = new Schema(
  {
    hospitalName: {
      type: String,
      default: "",
    },
    hospitalNumber: {
      type: String,
      default: "",
    },
    hospitalId: {
      type: Schema.Types.ObjectId,
      ref: "Hospital",
    },
    hospitalAddress: {
      type: String,
      default: "",
    },
    beds: [
      {
        type: { type: String },
        vacancy: { type: String },
      },
    ],
    availableOperations: [{ type: String }],
    placeId: {
      type: String,
      default: "",
    },
    EmergencyAvailability: {
      type: Boolean,
      default: false,
    },
    oxygen: {
      type: String,
      default: "",
    },
    blood: [
      {
        type: String,
      },
    ],
    vaccine: [{ type: String }],
    ambulanceAvailability: {
      type: Boolean,
      default: false,
    },
    helpline: {
      type: String,
      default: "",
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

export default mongoose.model("Details", DetailsSchema);
