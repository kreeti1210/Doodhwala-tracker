import { Request, Response } from "express";

import {
  saveRecordService,
  getUserRecordsService,
  deleteRecordService,
  getMonthSummaryService,
  getMonthRecordsService,
  getRecordByDateService,
  getPaginatedLogsService,
} from "../services/record.service";

export const saveRecord = async (req: Request, res: Response) => {
  try {
    const { userId, date, quantity, pricePerLiter, status, vendorName, notes } =
      req.body;

    const record = await saveRecordService({
      userId,

      date,

      quantity,

      pricePerLiter,

      status,

      vendorName,

      notes,
    });

    return res.json({
      success: true,

      data: record,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,

      message: "Failed to save record",
    });
  }
};

export const getUserRecords = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const records = await getUserRecordsService(userId as string);

    res.json({
      success: true,
      data: records,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch records",
    });
  }
};

export const deleteRecord = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await deleteRecordService(id as string);

    res.json({
      success: true,
      message: "Record deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete record",
    });
  }
};

export const getMonthSummary = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const month = Number(req.query.month);
    const year = Number(req.query.year);

    const summary = await getMonthSummaryService({
      userId: userId as string,
      month,
      year,
    });

    res.json({
      success: true,
      data: summary,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch month summary",
    });
  }
};
export const getMonthRecords = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const month = Number(req.query.month);

    const year = Number(req.query.year);

    const records = await getMonthRecordsService({
      userId: userId as string,
      month,
      year,
    });

    res.json({
      success: true,
      data: records,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch month records",
    });
  }
};
export const getRecordByDate = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const date = req.query.date as string;

    const record = await getRecordByDateService({
      userId: userId as string,
      date,
    });

    res.json({
      success: true,
      data: record,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch record",
    });
  }
};
export const getPaginatedLogs = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 10;

    const logs = await getPaginatedLogsService({
      userId: userId as string,
      page,
      limit,
    });

    res.json({
      success: true,
      data: logs,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch logs",
    });
  }
};
