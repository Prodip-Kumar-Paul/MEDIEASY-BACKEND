import express from "express";
import { body } from "express-validator";
import { errorHandler } from "../utils/errorHandler.js";
import {
  getDetailsByPlaceId,
  getAvailableHospitals,
} from "../controllers/hospitalControllers.js";
const router = express.Router();

router.get("/available", errorHandler, getAvailableHospitals);
router.get(
  "/:placeId",
  errorHandler,
  [body("placeId").notEmpty().withMessage("Invalid Place Id")],
  getDetailsByPlaceId
);

export default router;
