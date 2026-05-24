import { deleteOtp, findOtpByPhoneNumber, saveOtp } from "../models/otp.model";
import { generateOtp } from "../utils/generateOtp";
import { sendOtpMessage } from "./otp.provider";

export const sendOtpService = async (phoneNumber: string) => {
  const otp = generateOtp();

  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  await saveOtp(phoneNumber, otp, expiresAt);

  await sendOtpMessage(phoneNumber, otp);
  console.log(`OTP for ${phoneNumber}: `, otp)

  return {
    success: true,
    message: "OTP sent successfully",
  };
};

export const verifyOtpService = async (phoneNumber: string, otp: string) => {
  const existingOtp = await findOtpByPhoneNumber(phoneNumber);

  if (!existingOtp) {
    throw new Error("OTP not found");
  }

  if (new Date() > existingOtp.expiresAt) {
    throw new Error("OTP expired");
  }

  if (existingOtp.otpCode !== otp) {
    throw new Error("Invalid OTP");
  }

  await deleteOtp(phoneNumber);

  return {
    success: true,
    message: "OTP verified successfully",
  };
};
