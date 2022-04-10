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

export const getHospitalDetails = async (req, res, next) => {
  try {
    const id = req.hospitalId;
    const hospital = await HospitalModel.findOne({
      _id: id,
      isDeleted: false,
      verified: true,
    })
      .populate("hospitalDetails")
      .select(
        "-hospitalPassword -otp -expTime -isDeleted -createdAt -updatedAt -verified"
      );
    const body = {};
    body.hospitalId = hospital._id;
    body.hospitalDetailsId = hospital.hospitalDetails._id;

    if (hospital.hospitalDetails.hospitalName) {
      body.hospitalName = hospital.hospitalDetails.hospitalName;
    }
    body.hospitalEmail = hospital.hospitalEmail;
    if (hospital.hospitalDetails.beds) {
      body.beds = hospital.hospitalDetails.beds;
    }
    if (hospital.hospitalDetails.availableOperations) {
      body.availableOperations = hospital.hospitalDetails.availableOperations;
    }
    if (hospital.hospitalDetails.placeId) {
      body.placeId = hospital.hospitalDetails.placeId;
    }
    if (hospital.hospitalDetails.placeId) {
      body.placeId = hospital.hospitalDetails.placeId;
    }
    if (hospital.hospitalDetails.helpline) {
      body.helpline = hospital.hospitalDetails.helpline;
    }
    if (hospital.hospitalDetails.blood) {
      body.blood = hospital.hospitalDetails.blood;
    }
    if (hospital.hospitalDetails.vaccine) {
      body.vaccine = hospital.hospitalDetails.vaccine;
    }
    if (hospital.hospitalDetails.oxygen) {
      body.oxygen = hospital.hospitalDetails.oxygen;
    }
    if (hospital.hospitalDetails.ambulanceAvailability) {
      body.ambulanceAvailability =
        hospital.hospitalDetails.ambulanceAvailability;
    }
    if (hospital.hospitalDetails.hospitalAddress) {
      body.hospitalAddress = hospital.hospitalDetails.hospitalAddress;
    }
    if (!hospital) {
      return res.status(200).json({
        status: false,
        message: "Hospital not found",
        data: "",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Success",
      data: body,
    });
  } catch (err) {
    next(err);
  }
};

export const updatingHospitalDetails = async (req, res, next) => {
  try {
    const {
      oxygen,
      hospitalNumber,
      vaccine,
      EmergencyAvailability,
      ambulanceAvailability,
      helpline,
      blood,
      beds,
    } = req.body;
    const id = req.hospitalId;
    const body = {};

    if (oxygen) body.oxygen = oxygen;
    if (hospitalNumber) body.hospitalNumber = hospitalNumber;
    if (vaccine) body.vaccine = vaccine;
    if (EmergencyAvailability !== undefined)
      body.EmergencyAvailability = EmergencyAvailability;
    if (ambulanceAvailability)
      body.ambulanceAvailability = ambulanceAvailability;
    if (helpline) body.helpline = helpline;
    if (blood) body.blood = blood;
    if (beds) body.beds = beds;

    const hospital = await DetailsModel.findOneAndUpdate(
      { hospitalId: id },
      { ...body }
    ).populate("hospitalId");

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
    next(err);
  }
};
