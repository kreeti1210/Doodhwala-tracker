import { MONTHS } from "../constants/month";

export const generateMonthOptions = () => {
  const today = new Date();

  const currentYear = today.getFullYear();

  const currentMonth = today.getMonth();

  return MONTHS.slice(0, currentMonth + 1).map(
    (month) => `${month} ${currentYear}`,
  );
};
