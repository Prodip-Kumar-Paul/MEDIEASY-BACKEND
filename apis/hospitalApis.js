import express from "express";
import { body } from "express-validator";
import { errorHandler } from "../utils/errorHandler.js";
import {
  getDetailsByPlaceId,
  getAvailableHospitals,
} from "../controllers/hospitalControllers.js";
const router = express.Router();

router.post(
  "/available",
  [
    body("lat").notEmpty().withMessage("Invalid latitude"),
    body("lon").notEmpty().withMessage("Invalid longitude"),
    body("radius").notEmpty().withMessage("Invalid radius"),
  ],
  errorHandler,
  getAvailableHospitals
);
router.get(
  "/:placeId",
  errorHandler,
  [body("placeId").notEmpty().withMessage("Invalid Place Id")],
  getDetailsByPlaceId
);

export default router;
