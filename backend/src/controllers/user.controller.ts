import { Request, Response } from "express";
import {
  createUserService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
  loginUserService,
} from "../services/user.service";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { phoneNumber, name, deliveryStartDate } = req.body;

    const user = await createUserService({
      phoneNumber,
      name,
      deliveryStartDate,
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create user",
    });
  }
};
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { phoneNumber } = req.body;

    const user = await loginUserService(phoneNumber);

    res.json({
      success: true,
      message: "Login successful",
      data: user,
    });
  } catch (error) {
    console.error(error);

    res.status(404).json({
      success: false,
      message: "Phone number not registered",
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await getUserByIdService(id as string);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
    });
  }
};
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const updatedUser = await updateUserService(id as string, req.body);

    res.json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update user",
    });
  }
};
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await deleteUserService(id as string);

    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete user",
    });
  }
};