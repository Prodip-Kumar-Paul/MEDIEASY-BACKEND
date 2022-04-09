import express from "express";
import { body } from "express-validator";
import { errorHandler } from "../utils/errorHandler.js";
import {
  signupController,
  loginHospital,
  verifyOTP,
} from "../controllers/authControllers.js";
const router = express.Router();

router.post(
  "/signup",
  [
    body("hospitalEmail")
      .normalizeEmail()
      .isEmail()
      .withMessage("Invalid Email"),
    body("hospitalPassword").isStrongPassword().withMessage("password is weak"),
  ],
  errorHandler,
  signupController
);
router.post(
  "/verify_otp",
  [body("otp").notEmpty().withMessage("invalid otp")],
  errorHandler,
  verifyOTP
);

router.post(
  "/login",
  [
    body("hospitalEmail")
      .normalizeEmail()
      .isEmail()
      .withMessage("Invalid Email"),
    body("hospitalPassword").isStrongPassword().withMessage("Invalid password"),
  ],
  errorHandler,
  loginHospital
);

export default router;
