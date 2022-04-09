import Hospital from "../models/HospitalModel.js";
import DetailsModel from "../models/DetailsModel.js";
import config from "../config/config.js";
import { sendMail } from "../utils/sendEmail.js";
import genOtp from "../utils/genOtp.js";
import emailText from "../utils/emailText.js";
import bcryptJs from "bcryptjs";
import Jwt from "jsonwebtoken";

export const signupController = async (req, res, next) => {
  try {
    const { hospitalEmail, hospitalPassword , hospitalConfirmPassword } = req.body;
    if(hospitalConfirmPassword !== hospitalPassword){
      return res.status(401).json({
        status:false,
        message:"Confirm password no matched",
        data:''
      })
    }

    let loginBody = {};
    if (hospitalEmail) {
      loginBody.hospitalEmail = hospitalEmail;
    }
    if (hospitalPassword) {
      const hash = await bcryptJs.hash(hospitalPassword, 12);
      loginBody.hospitalPassword = hash;
    }

    const alreadyLoggedIn = await Hospital.findOne({
      hospitalEmail: hospitalEmail,
    });
    if (alreadyLoggedIn) {
      return res.status(406).json({
        status: false,
        message: "You already have an account",
        data: "",
      });
    }

    const otp = genOtp();
    loginBody.otp = otp;
    const currDate = new Date();
    const expTime = new Date(currDate.getTime() + 30 * 60000);
    loginBody.expTime = expTime;
    const text = emailText(otp);
    //console.log(text);

    const mail = await sendMail(hospitalEmail, "SignUp", "", text);

    if (!mail) {
      return res.status(500).json({
        status: false,
        message: "Something went wrong ,could not send mail",
        data: "",
      });
    }
    const createHospital = await Hospital.create(loginBody);

    return res.status(200).json({
      status: true,
      message: "Please verify your email",
      data: {
        id: createHospital._id,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const verifyOTP = async (req, res, next) => {
  try {
    const { id, otp } = req.body;
    const hospital = await Hospital.findOne({ _id: id });
    if (!hospital) {
      return res.status(200).json({
        status: false,
        message: "hospital not found",
        data: "",
      });
    }
    const currentDate = new Date();
    const hospitalTime = hospital.expTime;
    if (hospitalTime < currentDate) {
      return res.status(200).json({
        status: false,
        message: "OTP expired",
        data: "",
      });
    }
    const actualOtp = hospital.otp;
    if (actualOtp !== otp) {
      return res.status(200).json({
        status: false,
        message: "OTP does not matched",
        data: "",
      });
    } else {
      hospital.otp = null;
      hospital.expTime = null;
      hospital.verified = true;

      await hospital.save();
      res.status(200).json({
        status: true,
        message: "Otp verified",
        data: {
          _id: id,
        },
      });
    }
  } catch (err) {
    next(err);
  }
};

export const loginHospital = async (req, res, next) => {
  try {
    const { hospitalEmail, hospitalPassword } = req.body;
    const hospital = await Hospital.findOne({
      hospitalEmail: hospitalEmail,
      verified: true,
      isDeleted: false,
    });
    if (!hospital) {
      return res.status(406).json({
        status: false,
        message: "Hospital not found",
        data: "",
      });
    }
    const matchedPassword = await bcryptJs.compare(
      hospitalPassword,
      hospital.hospitalPassword
    );

    if (!matchedPassword) {
      return res.status(406).json({
        status: false,
        message: "Invalid Password",
        data: "",
      });
    }

    const token = Jwt.sign({ hospitalId: hospital._id }, config.JWT_ACTIVATE, {
      expiresIn: "7d",
    });
    const loginDetails = { ...hospital._doc };

    delete loginDetails.hospitalPassword;
    delete loginDetails.otp;
    delete loginDetails.expTime;

    return res.status(200).json({
      status: true,
      message: "Welcome.....",
      data: {
        token: token,
        loginDetails,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const forgetPassword = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
