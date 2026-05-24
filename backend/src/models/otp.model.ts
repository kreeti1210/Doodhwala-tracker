import prisma from "../db/prisma";

export const saveOtp = async (
  phoneNumber: string,
  otp: string,
  expiresAt: Date,
) => {
  return prisma.oTPVerification.upsert({
    where: {
      phoneNumber,
    },

    update: {
      otpCode: otp,

      expiresAt,

      verified: false,
    },

    create: {
      phoneNumber,

      otpCode: otp,

      expiresAt,

      verified: false,
    },
  });
};

export const findOtpByPhoneNumber = async (phoneNumber: string) => {
  return prisma.oTPVerification.findFirst({
    where: {
      phoneNumber,
    },
  });
};

export const deleteOtp = async (phoneNumber: string) => {
  return prisma.oTPVerification.deleteMany({
    where: {
      phoneNumber,
    },
  });
};
