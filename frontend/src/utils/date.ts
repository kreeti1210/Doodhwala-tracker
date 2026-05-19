export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const generateMonthOptions = () => {
  const today = new Date();

  const currentYear = today.getFullYear();

  const currentMonth = today.getMonth();

  return MONTHS.slice(0, currentMonth + 1).map(
    (month) => `${month} ${currentYear}`,
  );
};
