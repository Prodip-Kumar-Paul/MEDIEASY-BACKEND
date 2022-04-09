import axios from "axios";
import Hospital from "../models/HospitalModel.js";
import apis from "../utils/apis.js";
import config from "../config/config.js";
import Jwt from "jsonwebtoken";
import { sendMail } from "../utils/sendEmail.js";

// export const registerController = async (req, res, next) => {
//    try {
//       console.log("here......");
//    } catch (err) {
//       console.log(err);
//       next(err);
//    }
// };

// export const signUpOrLoginController = async (req, res, next) => {
//    try {
//       const { userType, email, githubCode } = req.body;
//       const github = await axios({
//          method: "post",
//          url: apis.GITHUB_ACCESS_TOKEN,
//          data: {
//             client_id: config.GITHUB_CLIENTID_ID,
//             client_secret: config.GITHUB_CLIENT_SECRET,
//             code: githubCode,
//             redirectUrl: config.GITHUB_REDIRECT_URL,
//          },
//       });
//       const gitData = new URLSearchParams(github.data);
//       if (gitData.get("error")) {
//          return res.status(200).json({
//             message: "Gitub verification Failed",
//             data: github.data,
//             status: false,
//          });
//       }
//       const user = await User.find({ email, userType }).lean();
//       let token;
//       if (user.length) {
//          token = jwt.sign(
//             {
//                id: user[0]._id.toString(),
//                type: userType,
//                githubToken: gitData.get("access_token"),
//             },
//             config.JWT_SECRET_KEY,
//             { expiresIn: "7d" }
//          );
//       } else {
//          const user = new User({
//             email,
//             userType,
//             password: "123",
//          });
//          await user.save();
//          token = jwt.sign(
//             {
//                id: user._id.toString(),
//                type: userType,
//                githubToken: gitData.get("access_token"),
//             },
//             config.JWT_SECRET_KEY,
//             { expiresIn: "7d" }
//          );
//       }
//       res.status(201).json({
//          message: "Success",
//          data: token,
//          status: true,
//       });
//    } catch (err) {
//       next(err);
//    }
// };

export const signupController  = async (req,res,next)=>{
  try{
    const {hospitalName ,hospitalEmail, hospitalNumber ,hospitalAddress} = req.body;
    let body = {};
    if(hospitalName){
      body.hospitalName =hospitalName;
    }
    if(hospitalEmail){
      body.hospitalEmail =hospitalEmail
    } 
    if(hospitalNumber){
      body.hospitalNumber =hospitalNumber
    } 
    if(hospitalAddress){
      body.hospitalAddress =hospitalAddress
    } 
    


  }catch(error){
    next(error)
  }
}
