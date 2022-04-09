import express from "express";
import { body } from "express-validator";
import { errorHandler } from "../utils/errorHandler.js";
// import { signUpOrLoginController } from "../controllers/authControllers.js";
const router = express.Router();

router.post(
   "/signup",
   [
      body("hospitalName")
         .notEmpty()
         .withMessage("Invalid Hospital Name"),
   ],
   [body("hospitalEmail").normalizeEmail().isEmail().withMessage("Invalid Email")],
   [body("hospitalNumber").notEmpty().withMessage("Invalid Number")],
   [body("hospitalAddress").notEmpty().withMessage("Invalid Address")],
   errorHandler,
   signUpOrLoginController
);
export default router;
