import mongoose from "mongoose";
const { Schema } = mongoose;

const hospitalSchema = new Schema(
  {
    hospitalEmail: {
      type: String,
    },
    hospitalNumber: {
      type: Number,
    },
    location: {
      type: Object,
    },
    hospitalPassword: {
      type: String,
    },
    hospitalDetails: {
      type: Schema.Types.ObjectId,
      ref: "Details",
    },
    Otp:{
      type:String,
    },
    expTime:{
      type: Date,
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

export default mongoose.model("Hospital", hospitalSchema);
