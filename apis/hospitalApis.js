import express from "express";
import { body } from "express-validator";
import { errorHandler } from "../utils/errorHandler.js";
import { getDetailsByPlaceId } from "../controllers/hospitalControllers.js";
const router = express.Router();

router.get(
  "/:place_id",
  errorHandler,
  [body("place_id").notEmpty().withMessage("Invalid Place Id")],
  getDetailsByPlaceId
);

export default router;
