import mongoose from "mongoose";
const { Schema } = mongoose;

const BedTypeSchema = new Schema(
  {
    types:{
      type:String,
    },
    description:{
      type:String,
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

export default mongoose.model("BedType", BedTypeSchema);