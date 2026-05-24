import { Request, Response } from "express";

import { sendOtpService, verifyOtpService } from "../services/auth.service";

export const sendOtpController = async (req: Request, res: Response) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber || phoneNumber.length !== 10) {
      return res.status(400).json({
        success: false,

        message: "Valid phone number required",
      });
    }

    const response = await sendOtpService(phoneNumber);

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,

      message: "Failed to send OTP",
    });
  }
};

export const verifyOtpController = async (req: Request, res: Response) => {
  try {
    const { phoneNumber, otp } = req.body;

    const response = await verifyOtpService(phoneNumber, otp);

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      success: false,

      message:
        error instanceof Error ? error.message : "OTP verification failed",
    });
  }
};
