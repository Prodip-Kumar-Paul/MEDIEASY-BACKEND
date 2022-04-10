import Hospital from "../models/HospitalModel.js";
import Details from "../models/DetailsModel.js";
import config from "../config/config.js";
import apis from "../utils/apis.js";
import axios from "axios";

export const getDetailsByPlaceId = async (req, res, next) => {
  try {
    const { placeId } = req.params;
    const hospital = await Details.find({ placeId }).lean();
    if (hospital.length) {
      return res.status(200).json({
        status: true,
        message: "Hospital Details",
        data: hospital[0],
      });
    } else {
      return res.status(200).json({
        status: true,
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
    console.log(lat, lon, radius, config.LOCALIQ_API_KEY);
    try {
      const hospitals = await axios.get(
        `https://us1.locationiq.com/v1/nearby.php?key=${config.LOCALIQ_API_KEY}&lat=${lat}&lon=${lon}&radius=${radius}&tag=hospital`
      );
      let getAvailableHospitalsObj = [];
      let getUnavailableHospitals = [];

      await Promise.all(
        hospitals.data.map(async (hospital) => {
          const { osm_id } = hospital;
          // try {
          const getHospitalByPlaceId = await Details.findOne({
            placeId: osm_id,
          }).populate("hospitalId");
          if (getHospitalByPlaceId) {
            getAvailableHospitalsObj.push(hospital);
          } else {
            getUnavailableHospitals.push(hospital);
          }
          // } catch (error) {
          //   console.log(error);
          //   res.status(500).json({
          //     status: false,
          //     message: "Hospital search Error!",
          //   });
          // }
        })
      );

      return res.status(200).json({
        status: true,
        data: [
          {
            getAvailableHospitalsObj,
            getUnavailableHospitals,
          },
        ],
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
