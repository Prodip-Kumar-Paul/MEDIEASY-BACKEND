import mongoose from "mongoose";
const { Schema } = mongoose;

const BedSchema = new Schema(
  {
    typeId:{
      type:Schema.Types.ObjectId,
      ref:"BedType"
    },
    vacancy:{
      type:String,
      default:"zero"
    },
    hospitalId:{
      type:Schema.Types.ObjectId,
      ref:"Hospital",
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

export default mongoose.model("Bed", BedSchema);