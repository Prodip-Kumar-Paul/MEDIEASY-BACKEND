import express from "express";
import testServer from "../controllers/testController.js";
const router = express.Router();

//test api
router.get("/", testServer);

export default router;
