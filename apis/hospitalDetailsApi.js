import express from "express";
import { body, check } from "express-validator";
import { errorHandler } from "../utils/errorHandler.js";
// import { signUpOrLoginController } from "../controllers/authControllers.js";
import {
  insertingHospitalDetails,
  updatingHospitalDetails,
} from "../controllers/hospitalDetailsController.js";
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
  "/update_hospital_details",
  [
    body("id").not().isEmpty().withMessage("Invalid Id"),
    body("hospitalId").not().isEmpty().withMessage("Invalid hospitalId"),
    body("name").not().isEmpty().isString().withMessage("Invalid name"),
    body("address").not().isEmpty().isString().withMessage("Invalid address"),
    body("phoneNo").not().isEmpty().isNumeric().withMessage("Invalid phoneNo"),
    body("helpline")
      .not()
      .isEmpty()
      .isNumeric()
      .withMessage("Invalid helpline"),
    body("beds").not().isEmpty().withMessage("Invalid Beds"),
    body("emergencyAvailability")
      .not()
      .isEmpty()
      .isBoolean()
      .withMessage("Invalid emergencyAvailability"),
    body("oxygen").not().isEmpty().isString().withMessage("Invalid oxygen"),
    body("ambulanceAvailability")
      .not()
      .isEmpty()
      .isBoolean()
      .withMessage("Invalid ambulanceAvailability"),
    body("vaccine").not().isEmpty().withMessage("Invalid Vaccine"),
    body("availableOperations")
      .not()
      .isEmpty()
      .isArray()
      .withMessage("Invalid availableOperations"),
  ],
  errorHandler,
  updatingHospitalDetails
);
export default router;
