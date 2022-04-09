import mongoose from "mongoose";
const { Schema } = mongoose;

const DetailsSchema = new Schema(
  {
    hospitalName: {
      type: String,
      default:""
    },
    hospitalNumber: {
      type: String,
      default:""
    },
    hospitalId: {
      type: Schema.Types.ObjectId,
      ref: "Hospital",
      default:""
    },
    hospitalAddress: {
      type: String,
      default:""
    },
    beds: {
      type: Schema.Types.ObjectId,
      ref: "Bed",
      default:"",
    },
    availableOperations: [
      {type:String}
    ],
    placeId:{
      type:String,
      default:"",
    },
    EmergencyAvailability: {
      type: Boolean,
      default:true,
    },
    oxygen: {
      type: String,
      default:"",
    },
    blood: {
      type: Schema.Types.ObjectId,
      ref: "Blood",
      default:"",
    },
    vaccine: {
      type: Schema.Types.ObjectId,
      ref: "Vaccine",
      default:"",
    },
    ambulanceAvailability: {
      type: Boolean,
      default:true,
    },
    helpline: {
      type: String,
      default:"",
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
