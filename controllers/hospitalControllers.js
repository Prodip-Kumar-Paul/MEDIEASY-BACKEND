import Hospital from "../models/DetailsModel.js";
import config from "../config/config.js";
import apis from "../utils/apis.js";
import axios from "axios";

export const getDetailsByPlaceId = async (req, res, next) => {
  try {
    const { placeId } = req.params;
    const hospital = await Hospital.find({ placeId }).lean();
    if (hospital.length) {
      res.status(200).json({
        status: true,
        message: "Hospital Details",
        data: hospital[0],
      });
    } else {
      res.status(400).json({
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

export const getAvailableHospitals = async (req, res, next) => {
  try {
    const { lat, lon, radius } = req.body;
    try {
      const hospitals = await axios.get(
        `https://us1.locationiq.com/v1/nearby.php?key=${config.LOCALIQ_API_KEY}&lat=${lat}&lon=${lon}&radius=${radius}&tag=hospital`
      );
      const getAvailableHospitalsObj = [];
      const getUnavailableHospitals = [];

      hospitals.data.map(async (hospital) => {
        const { place_id } = hospital;
        try {
          const getHospitalByPlaceId = await Hospital.findOne({
            placeId: place_id,
          });
          if (getHospitalByPlaceId)
            getAvailableHospitalsObj.push(getHospitalByPlaceId);
          getUnavailableHospitals.push(getHospitalByPlaceId);
        } catch (error) {
          console.log(error);
          res.status(500).json({
            status: false,
            message: "Hospital search Error!",
          });
        }
      });
      return res.status(200).json({
        status: true,
        data: [getAvailableHospitalsObj, getUnavailableHospitals],
        message: "Success",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: false,
        message: "Invalid Search!",
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
