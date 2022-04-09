import express from "express";
import { body } from "express-validator";
import { errorHandler } from "../utils/errorHandler.js";
import {
  insertingHospitalDetails,
  getHospitalDetails,
  updatingHospitalDetails,
} from "../controllers/hospitalDetailsController.js";

import {getBedTypes } from '../controllers/bedController.js';
import { isAuthenticated } from "../middlewares/isAuth.js";

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

router.get(
  "/get_hospital_details_by_id",
  errorHandler,
  isAuthenticated,
  getHospitalDetails
);

router.post(
  "/update_hospital_details",
  errorHandler,
  isAuthenticated,
  updatingHospitalDetails
);
export default router;


router.get(
  '/all_bed_types',
  errorHandler,
  isAuthenticated,
  getBedTypes,
)