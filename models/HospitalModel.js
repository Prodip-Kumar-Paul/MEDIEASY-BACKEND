import mongoose from "mongoose";
const { Schema } = mongoose;

const hospitalSchema = new Schema(
  {
    hospitalEmail: {
      type: String,
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
    otp:{
      type:String,
    },
    expTime: {
      type: Date,
    },
    verified:{
      type:Boolean,
      default:false
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

