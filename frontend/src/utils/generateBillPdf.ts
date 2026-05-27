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

export const generateBillPdf = async ({
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

  const loadImageDataUrl = async (src: string) => {
    const response = await fetch(src);
    const blob = await response.blob();

    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error(`Failed to read image: ${src}`));
      reader.readAsDataURL(blob);
    });
  };

  const addHeaderLogo = async () => {
    const logoDataUrl = await loadImageDataUrl("/logo_light.png");
    const logoWidth = 14;
    const logoHeight = 14;
    const logoX = 20;
    const logoY = 10;
    const titleX = logoX + logoWidth + 2;

    pdf.addImage(logoDataUrl, "PNG", logoX, logoY, logoWidth, logoHeight);
    pdf.text(`${appName} App`, titleX, 22);
  };

  // HEADER
  pdf.setFont("helvetica", "bold");

  pdf.setFontSize(24);

  await addHeaderLogo();

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

  pdf.text("Thank you for using MilkOMeter App", 20, y);

  pdf.save(`${selectedMonth}-bill.pdf`);
};
