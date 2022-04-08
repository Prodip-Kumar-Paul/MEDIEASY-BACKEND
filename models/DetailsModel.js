import mongoose from "mongoose";
const { Schema } = mongoose;

const DetailsSchema = new Schema(
  {
    hospitalName: {
      type: String,
    },
    hospitalId: {
      type: Schema.Types.ObjectId,
      ref: "Hospital",
    },
    hospitalAddress: {
      type: String,
    },
    beds: {
      type: Schema.Types.ObjectId,
      ref: "Bed",
    },
    availableOperations: [
      {type:String}
    ],
    EmergencyAvailability: {
      type: Boolean,
    },
    oxygen: {
      type: String,
    },
    blood: {
      type: Schema.Types.ObjectId,
      ref: "Blood",
    },
    vaccine: {
      type: Schema.Types.ObjectId,
      ref: "Vaccine",
    },
    ambulanceAvailability: {
      type: Boolean,
    },
    helpLine: {
      type: String,
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
