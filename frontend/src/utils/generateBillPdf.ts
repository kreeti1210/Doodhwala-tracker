import jsPDF from "jspdf";

type GenerateBillPdfParams = {
  appName: string;
  userName: string;
  selectedMonth: string;
  totalAmount: number;
  totalLiters: number;
  absentDays: number;
  deliveredDays: number;
  extraLiters: number;
};

export const generateBillPdf = ({
  appName,
  userName,
  selectedMonth,
  totalAmount,
  totalLiters,
  absentDays,
  deliveredDays,
  extraLiters,
}: GenerateBillPdfParams) => {
  const pdf = new jsPDF();

  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();

  // HEADER
  pdf.setFont("helvetica", "bold");

  pdf.setFontSize(24);

  pdf.text(`${appName} App`, 20, 22);

  // DOWNLOAD DATE TOP RIGHT
  pdf.setFont("helvetica", "normal");

  pdf.setFontSize(10);

  pdf.text(`Bill Downloaded on: ${today}`, pageWidth - 65, 20);

  // TITLE
  pdf.setFont("helvetica", "bold");

  pdf.setFontSize(18);

  pdf.text("Monthly Bill Summary", 20, 38);

  // LINE
  pdf.setDrawColor(220);

  pdf.line(20, 45, 190, 45);

  // USER INFO
  let y = 58;

  pdf.setFontSize(12);

  pdf.setFont("helvetica", "bold");

  pdf.text("Customer Name:", 20, y);

  pdf.setFont("helvetica", "normal");

  pdf.text(userName, 62, y);

  y += 10;

  pdf.setFont("helvetica", "bold");

  pdf.text("Month:", 20, y);

  pdf.setFont("helvetica", "normal");

  pdf.text(selectedMonth, 62, y);

  y += 18;

  // BILL SUMMARY TITLE
  pdf.setFont("helvetica", "bold");

  pdf.setFontSize(14);

  pdf.text("Bill Summary ", 20, y);

  y += 6;

  pdf.line(20, y, 190, y);

  y += 12;

  // SUMMARY DATA
  const summaryRows = [
    ["Total Liters", `${totalLiters} L`],

    ["Absent Days", `${absentDays}`],

    ["Delivered Days", `${deliveredDays}`],

    ["Extra Liters", `${extraLiters} L`],
    
    ["Total Bill", `Rs. ${totalAmount}`],
  ];

  summaryRows.forEach(([label, value]) => {
    pdf.setFont("helvetica", "bold");

    pdf.text(label, 20, y);

    pdf.setFont("helvetica", "normal");

    pdf.text(value, 120, y);

    y += 12;
  });

  y += 5;

  pdf.line(20, y, 190, y);

  // FOOTER
  y += 10;

  pdf.setFontSize(10);

  pdf.setFont("helvetica", "italic");

  pdf.text("Thank you for using Doodhwala App", 20, y);

  pdf.save(`${selectedMonth}-bill.pdf`);
};
