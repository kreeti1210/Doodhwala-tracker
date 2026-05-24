import express from "express";

import {
  sendOtpController,
  verifyOtpController,
} from "../controllers/auth.controller";

const router = express.Router();

router.post("/send-otp", sendOtpController);

router.post("/verify-otp", verifyOtpController);

export default router;
