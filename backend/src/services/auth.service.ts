import {
  deleteVerificationId,
  getVerificationId,
  saveVerificationId,
} from "../models/otp.model";

import { sendRealOtp, verifyRealOtp } from "./messageCentral.service";

export const sendOtpService = async (phoneNumber: string) => {
  const result = await sendRealOtp(phoneNumber);

  const verificationId = result?.data?.verificationId;

  await saveVerificationId(phoneNumber, verificationId);

  return {
    success: true,
    message: "OTP sent successfully",
  };
};

export const verifyOtpService = async (phoneNumber: string, otp: string) => {
  const verificationData = await getVerificationId(phoneNumber);

  if (!verificationData) {
    return {
      success: false,
      message: "OTP session expired",
    };
  }

  await verifyRealOtp(verificationData.verificationId, otp);

  await deleteVerificationId(phoneNumber);

  return {
    success: true,
    message: "OTP verified successfully",
  };
};
