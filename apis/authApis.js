import express from "express";
import { body } from "express-validator";
import { errorHandler } from "../utils/errorHandler.js";
import {
  signupController,
  loginHospital,
  verifyOTP,
  forgetPassword,
  forgetPasswordChange,
  passwordChange,
} from "../controllers/authControllers.js";
import { isAuthenticated } from "../middlewares/isAuth.js";
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

router.post(
  "/password_change",
  [
    body("hospitalPassword").isStrongPassword().withMessage("password is weak"),
    body("newPassword").isStrongPassword().withMessage("New password is weak"),
  ],
  errorHandler,
  isAuthenticated,
  passwordChange
);

export default router;
