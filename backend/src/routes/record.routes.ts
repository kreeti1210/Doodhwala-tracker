import { Router } from "express";

import {
  saveRecord,
  getUserRecords,
  deleteRecord,
  getMonthSummary,
  getMonthRecords,
  getRecordByDate,
  getPaginatedLogs,
} from "../controllers/record.controller";

const router = Router();

router.post("/", saveRecord);
router.get("/user/:userId/date", getRecordByDate);
router.get("/user/:userId/logs", getPaginatedLogs);
router.get("/user/:userId/month-records", getMonthRecords);
router.get("/user/:userId/month-summary", getMonthSummary);
router.get("/user/:userId", getUserRecords);
router.delete("/:id", deleteRecord);



export default router;
