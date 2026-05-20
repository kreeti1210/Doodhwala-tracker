type ShareBillTextParams = {
  userName: string;

  selectedMonth: string;

  totalAmount: number;

  totalLiters: number;

  absentDays: number;

  deliveredDays: number;

  extraLiters: number;
};

export const generateShareText = ({
  userName,
  selectedMonth,
  totalAmount,
  totalLiters,
  absentDays,
  deliveredDays,
  extraLiters,
}: ShareBillTextParams) => {
  return `
Doodhwala - Monthly Milk Bill

Customer: ${userName}

Month: ${selectedMonth}

Total Bill: ₹${totalAmount}

Total Liters: ${totalLiters}L

Absent Days: ${absentDays}

Delivered Days: ${deliveredDays}

Extra Liters: ${extraLiters}L
`;
};
