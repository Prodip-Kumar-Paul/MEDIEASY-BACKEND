import DetailsModel from "../models/DetailsModel.js";
import HospitalModel from "../models/HospitalModel.js";

export const insertingHospitalDetails = async (req, res, next) => {
  try {
    const { name, address, placeId, helpline, number, hospitalId } = req.body;
    let body = {};
    const hospital = await HospitalModel.findOne({
      _id: hospitalId,
      verified: true,
    });
    if (!hospital) {
      return res.status(406).json({
        status: false,
        message: "Invalid Hospital Id",
        data: "",
      });
    }

    body.hospitalName = name;
    body.hospitalAddress = address;
    body.placeId = placeId;
    body.helpline = helpline;
    body.hospitalNumber = number;
    body.hospitalId = hospitalId;

    const details = await DetailsModel.create(body);
    hospital.hospitalDetails = details._id;
    await hospital.save();

    return res.status(200).json({
      status: true,
      message: "please login to enter further details",
      data: "",
    });
  } catch (err) {
    next(err);
  }
};

export const updatingHospitalDetails = async (req, res, next) => {
  try {
    const {
      id,
      hospitalId,
      name,
      address,
      phoneNo,
      beds,
      emergencyAvailability,
      oxygen,
      blood,
      vaccine,
      ambulanceAvailability,
      availableOperations,
      helpline,
    } = req.body;
    const body = {};

    if (name) body.hospitalName = name;
    if (address) body.hospitalAddress = address;
    if (phoneNo) body.hospitalNumber = phoneNo;
    if (emergencyAvailability)
      body.emergencyAvailability = emergencyAvailability;
    if (oxygen) body.oxygen = oxygen;
    if (ambulanceAvailability)
      body.ambulanceAvailability = ambulanceAvailability;
    if (helpline) body.helpline = helpline;
    if (availableOperations) body.availableOperations = availableOperations;
    if (hospitalId) body.hospitalId = hospitalId;
    if (beds) body.beds = beds;
    if (blood) body.blood = blood;
    if (vaccine) body.vaccine = vaccine;

    const hospital = await DetailsModel.findByIdAndUpdate(
      id,
      { ...body },
      { new: true }
    );
    if (!hospital) {
      return res.status(406).json({
        status: false,
        message: "Invalid Hospital Id",
        data: "",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Hospital Details Updated",
        data: hospital,
      });
    }
  } catch (err) {
    console.log(error);
    next(err);
  }
};
