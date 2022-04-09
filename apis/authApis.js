import express from "express";
import { body } from "express-validator";
import { errorHandler } from "../utils/errorHandler.js";
// import { signUpOrLoginController } from "../controllers/authControllers.js";
import {
  signupController,
  loginHospital,
  verifyOTP,
  forgetPassword,
  forgetPasswordChange,
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
  "/forget_password",
  [body("id").notEmpty().withMessage("invalid id")],
  errorHandler,
  forgetPassword
);

router.post(
  "/forget_password_change",
  [
    body("id").notEmpty().withMessage("invalid id"),
    body("newPassword").isStrongPassword().withMessage("password is weak"),
  ],
  errorHandler,
  forgetPasswordChange
);

export default router;
