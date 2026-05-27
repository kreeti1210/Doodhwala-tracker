import prisma from "../db/prisma";

export const saveVerificationId = async (
  phoneNumber: string,
  verificationId: string,
) => {
  return prisma.oTPVerification.upsert({
    where: {
      phoneNumber,
    },

    update: {
      verificationId,
    },

    create: {
      phoneNumber,
      verificationId,
    },
  });
};

export const getVerificationId = async (phoneNumber: string) => {
  return prisma.oTPVerification.findUnique({
    where: {
      phoneNumber,
    },
  });
};

export const deleteVerificationId = async (phoneNumber: string) => {
  return prisma.oTPVerification.deleteMany({
    where: {
      phoneNumber,
    },
  });
};
