import { Router } from "express";

import {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  updatePhoneNumber,
} from "../controllers/user.controller";

const router = Router();

router.post("/", createUser);
router.post("/login", loginUser);
router.get("/:id", getUserById);
router.patch("/change-phone-number", updatePhoneNumber);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);


export default router;
