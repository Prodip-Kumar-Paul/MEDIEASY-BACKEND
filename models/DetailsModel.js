import mongoose from "mongoose";
const { Schema } = mongoose;

const DetailsSchema = new Schema(
  {
    hospitalName: {
      type: String,
      default:null
    },
    hospitalNumber: {
      type: String,
      default:null
    },
    hospitalId: {
      type: Schema.Types.ObjectId,
      ref: "Hospital",
      default:null
    },
    hospitalAddress: {
      type: String,
      default:null
    },
    beds: {
      type: Schema.Types.ObjectId,
      ref: "Bed",
      default:null,
    },
    availableOperations: [
      {type:String}
    ],
    placeId:{
      type:String,
      default:null,
    },
    EmergencyAvailability: {
      type: Boolean,
      default:true,
    },
    oxygen: {
      type: String,
      default:null,
    },
    blood: {
      type: Schema.Types.ObjectId,
      ref: "Blood",
      default:null,
    },
    vaccine: {
      type: Schema.Types.ObjectId,
      ref: "Vaccine",
      default:null,
    },
    ambulanceAvailability: {
      type: Boolean,
      default:true,
    },
    helpline: {
      type: String,
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

export default mongoose.model("Details", DetailsSchema);
