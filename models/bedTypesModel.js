import mongoose from "mongoose";
const { Schema } = mongoose;

const BedTypeSchema = new Schema(
  {
    types:{
      type:String,
      default:null,
    },
    description:{
      type:String,
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

export default mongoose.model("BedType", BedTypeSchema);