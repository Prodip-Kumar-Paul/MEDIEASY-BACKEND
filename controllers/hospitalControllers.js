import Hospital from "../models/HospitalModel.js";
import config from "../config/config.js";
import apis from "../utils/apis.js";

export const getDetailsByPlaceId = async (req, res, next) => {
  try {
    const { placeId } = req.params;
    const hospital = await Hospital.find({ placeId }).lean();
    if (hospital.length) {
      res.json({
        status: true,
        message: "Hospital Details",
        data: hospital[0],
      });
    } else {
      res.json({
        status: false,
        message: "Hospital not found",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      message: "server error!",
    });
  }
};
