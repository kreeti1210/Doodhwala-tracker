import prisma from "../db/prisma";

type CreateUserParams = {
  phoneNumber: string;
  name?: string;
  deliveryStartDate?: string;
};
type UpdateUserParams = {
  name?: string;
  address?: string;
  defaultQuantity?: number;
  defaultPricePerLiter?: number;
  preferredVendorName?: string;
  profileImage?: string;
};

export const createUserService = async ({
  phoneNumber,
  name,
  deliveryStartDate
}: CreateUserParams) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      phoneNumber,
    },
  });

  if (existingUser) {
    return existingUser;
  }

  const user = await prisma.user.create({
    data: {
      phoneNumber,
      name,
      deliveryStartDate: deliveryStartDate
        ? new Date(deliveryStartDate)
        : new Date(),
    },
  });

  return user;
};
export const loginUserService = async (phoneNumber: string) => {
  const user = await prisma.user.findUnique({
    where: {
      phoneNumber,
    },
  });

  if (!user) {
    throw new Error("User does not exist");
  }

  return user;
};
export const getUserByIdService = async (id: string) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
};

export const updateUserService = async (id: string, data: UpdateUserParams) => {
  return prisma.user.update({
    where: {
      id,
    },
    data,
  });
};
export const deleteUserService = async (id: string) => {
  return prisma.user.delete({
    where: {
      id,
    },
  });
};