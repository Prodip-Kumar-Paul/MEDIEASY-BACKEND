import express from "express";
import { body } from "express-validator";
import { errorHandler } from "../utils/errorHandler.js";
import { getPlaceSearchByQuery } from "../controllers/placeSearchControllers.js";

const router = express.Router();

router.post(
  "/",
  errorHandler,
  [body("query").notEmpty().withMessage("Invalid query")],
  getPlaceSearchByQuery
);

export default router;
