export const sendOtpMessage = async (phoneNumber: string, otp: string) => {
  console.log(`OTP for ${phoneNumber}: ${otp}`);

  return true;
};
