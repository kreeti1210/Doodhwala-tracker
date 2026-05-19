import prisma from "../db/prisma";

type SaveRecordParams = {
  userId: string;
  date: string;
  quantity: number;
  pricePerLiter: number;
  status: string;
  vendorName?: string;
  notes?: string;
  deliveryStartDate?: string;
};
type PaginatedLogsParams = {
  userId: string;
  page: number;
  limit: number;
};

type MonthSummaryParams = {
  userId: string;
  month: number;
  year: number;
};

type MonthRecordsParams = {
  userId: string;
  month: number;
  year: number;
};
type GetRecordByDateParams = {
  userId: string;
  date: string;
};

export const saveRecordService = async ({
  userId,
  date,
  quantity,
  pricePerLiter,
  status,
  vendorName,
  notes,
}: SaveRecordParams) => {
  const startOfDay = new Date(date);

  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);

  endOfDay.setHours(23, 59, 59, 999);

  const existingRecord = await prisma.milkRecord.findFirst({
    where: {
      userId,

      date: {
        gte: startOfDay,

        lte: endOfDay,
      },
    },
  });

  const totalPrice = status === "absent" ? 0 : quantity * pricePerLiter;

  if (existingRecord) {
    return prisma.milkRecord.update({
      where: {
        id: existingRecord.id,
      },

      data: {
        quantity,
        pricePerLiter,
        totalPrice,
        status,
        vendorName,
        notes,
      },
    });
  }

  return prisma.milkRecord.create({
    data: {
      userId,
      date: new Date(date),
      quantity,
      pricePerLiter,
      totalPrice,
      status,
      vendorName,
      notes,
    },
  });
};

export const getUserRecordsService = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const existingRecords = await prisma.milkRecord.findMany({
    where: {
      userId,
    },

    orderBy: {
      date: "desc",
    },
  });

  const recordsMap = new Map(
    existingRecords.map((record) => [
      record.date.toISOString().split("T")[0],

      record,
    ]),
  );

  const setupDate = new Date(user.deliveryStartDate || user.createdAt);

  const today = new Date();

  const records = [];

  for (
    let date = new Date(today);
    date >= setupDate;
    date.setDate(date.getDate() - 1)
  ) {
    const formattedDate = date.toISOString().split("T")[0];

    const existingRecord = recordsMap.get(formattedDate);

    if (existingRecord) {
      records.push(existingRecord);

      continue;
    }

    records.push({
      id: `virtual-${formattedDate}`,

      userId,

      date: new Date(date),

      quantity: user.defaultQuantity,

      pricePerLiter: user.defaultPricePerLiter,

      totalPrice: user.defaultQuantity * user.defaultPricePerLiter,

      status: "delivered",

      vendorName: user.preferredVendorName,

      notes: null,

      createdAt: new Date(date),

      updatedAt: new Date(date),
    });
  }

  return records;
};

export const deleteRecordService = async (id: string) => {
  return prisma.milkRecord.delete({
    where: {
      id,
    },
  });
};

export const getMonthSummaryService = async ({
  userId,
  month,
  year,
}: MonthSummaryParams) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const startDate = new Date(year, month - 1, 1);

  const endDate = new Date(year, month, 0);

  const today = new Date();

  const calculationEndDate = today < endDate ? today : endDate;

  const records = await prisma.milkRecord.findMany({
    where: {
      userId,

      date: {
        gte: startDate,
        lte: calculationEndDate,
      },
    },
  });

  const totalDaysInMonth = endDate.getDate();

  const setupDate = new Date(user.deliveryStartDate || user.createdAt);

  const effectiveStartDate = setupDate > startDate ? setupDate : startDate;

  const millisecondsPerDay = 1000 * 60 * 60 * 24;

  const activeDays = Math.max(
    0,
    Math.floor(
      (calculationEndDate.getTime() - effectiveStartDate.getTime()) /
        millisecondsPerDay,
    ) + 1,
  );

  let totalLiters = activeDays * user.defaultQuantity;

  let totalAmount =
    activeDays * user.defaultQuantity * user.defaultPricePerLiter;

  let absentDays = 0;

  records.forEach((record) => {
    totalLiters -= user.defaultQuantity;

    totalAmount -= user.defaultQuantity * user.defaultPricePerLiter;

    if (record.status === "absent") {
      absentDays += 1;

      return;
    }

    totalLiters += record.quantity;

    totalAmount += record.quantity * record.pricePerLiter;
  });

  const deliveredDays = activeDays - absentDays;

  const completionPercentage = Math.min(
    (activeDays / totalDaysInMonth) * 100,
    100,
  );

  return {
    totalLiters,

    totalAmount,

    absentDays,

    deliveredDays,

    totalDaysInMonth,

    completionPercentage,
  };
};

export const getMonthRecordsService = async ({
  userId,
  month,
  year,
}: MonthRecordsParams) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const startDate = new Date(year, month - 1, 1);

  const endDate = new Date(year, month, 0);

  const today = new Date();

  const calculationEndDate = today < endDate ? today : endDate;

  const existingRecords = await prisma.milkRecord.findMany({
    where: {
      userId,

      date: {
        gte: startDate,
        lte: calculationEndDate,
      },
    },

    orderBy: {
      date: "asc",
    },
  });

  const recordsMap = new Map(
    existingRecords.map((record) => [
      record.date.toISOString().split("T")[0],

      record,
    ]),
  );

  const setupDate = new Date(user.deliveryStartDate || user.createdAt);

  const effectiveStartDate = setupDate > startDate ? setupDate : startDate;

  const records = [];

  for (
    let date = new Date(effectiveStartDate);
    date <= calculationEndDate;
    date.setDate(date.getDate() + 1)
  ) {
    const formattedDate = date.toISOString().split("T")[0];

    const existingRecord = recordsMap.get(formattedDate);

    if (existingRecord) {
      records.push(existingRecord);

      continue;
    }

    records.push({
      id: `virtual-${formattedDate}`,

      userId,

      date: new Date(date),

      quantity: user.defaultQuantity,

      pricePerLiter: user.defaultPricePerLiter,

      totalPrice: user.defaultQuantity * user.defaultPricePerLiter,

      status: "delivered",

      vendorName: user.preferredVendorName,

      notes: null,

      createdAt: new Date(date),

      updatedAt: new Date(date),
    });
  }

  return records;
};

export const getRecordByDateService = async ({
  userId,
  date,
}: GetRecordByDateParams) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const startOfDay = new Date(date);

  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);

  endOfDay.setHours(23, 59, 59, 999);

  const existingRecord = await prisma.milkRecord.findFirst({
    where: {
      userId,

      date: {
        gte: startOfDay,

        lte: endOfDay,
      },
    },
  });

  if (existingRecord) {
    return existingRecord;
  }

  const selectedDate = new Date(date);

  const today = new Date();

  const setupDate = new Date(user.deliveryStartDate || user.createdAt);

  if (selectedDate < setupDate || selectedDate > today) {
    return null;
  }

  return {
    id: `virtual-${date}`,

    userId,

    date: selectedDate,

    quantity: user.defaultQuantity,

    pricePerLiter: user.defaultPricePerLiter,

    totalPrice: user.defaultQuantity * user.defaultPricePerLiter,

    status: "delivered",

    vendorName: user.preferredVendorName,

    notes: null,

    createdAt: selectedDate,

    updatedAt: selectedDate,
  };
};

export const getPaginatedLogsService = async ({
  userId,
  page,
  limit,
}: PaginatedLogsParams) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const totalRecords = await prisma.milkRecord.count({
    where: {
      userId,
    },
  });

  const totalPages = Math.ceil(totalRecords / limit);

  const records = await prisma.milkRecord.findMany({
    where: {
      userId,
    },

    orderBy: {
      date: "desc",
    },

    skip: (page - 1) * limit,

    take: limit,
  });

  return {
    records,

    currentPage: page,

    totalPages,

    totalRecords,

    hasMore: page < totalPages,
  };
};
