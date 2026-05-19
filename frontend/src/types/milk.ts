export type MilkRecord = {
  id: string;

  date: string;

  quantity: number;

  pricePerLiter: number;

  status: "delivered" | "absent";

  notes?: string;
};
