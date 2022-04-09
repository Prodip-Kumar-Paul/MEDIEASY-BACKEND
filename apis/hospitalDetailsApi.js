import express from "express";
import { body } from "express-validator";
import { errorHandler } from "../utils/errorHandler.js";
// import { signUpOrLoginController } from "../controllers/authControllers.js";
import { insertingHospitalDetails ,getHospitalDetails } from "../controllers/hospitalDetailsController.js";
import { isAuthenticated } from '../middlewares/isAuth.js';
const router = express.Router();

router.post(
  "/get_hospital_details",
  [
    body("name").not().isEmpty().withMessage("Invalid Name"),
    body("address").not().isEmpty().withMessage("Invalid address"),
    body("helpline").not().isEmpty().withMessage("invalid helpline number"),
    body("number").not().isEmpty().withMessage("invalid number"),
    body("hospitalId").not().isEmpty().withMessage("invalid Id"),
    body("placeId").not().isEmpty().withMessage("invalid Id"),
  ],
  errorHandler,
  insertingHospitalDetails
);

router.post(
  '/add_hospital_details',
  [

  ],
  errorHandler,
)

router.get(
  '/get_hospital_details_by_id',
  errorHandler,
  isAuthenticated,
  getHospitalDetails
)

export default router;
