import { useState, useEffect, useRef } from "react";
import { generateBillPdf } from "../utils/generateBillPdf";
import {
  ArrowLeft,
  Download,
  Share2,
  CalendarDays,
  Receipt,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMilkStore } from "../store/useMilkStore";
import { generateMonthOptions } from "../utils/date";
import { getMonthSummary } from "../services/record.service";
import toast from "react-hot-toast";
import ShareBillModal from "../modals/ShareBillModal";

import { MONTHS } from "../constants/month";

import { generateShareText } from "../constants/shareText";


const MONTH_OPTIONS = generateMonthOptions();

export default function Bills() {
  const navigate = useNavigate();
  const theme = useMilkStore((state) => state.theme);
  const user = useMilkStore((state) => state.user);
  const currentMonth = new Date().toLocaleString("default", {
    month: "long",
  });
  const currentYear = new Date().getFullYear();
  const defaultMonth = `${currentMonth} ${currentYear}`;
  const [selectedMonth, setSelectedMonth] = useState(defaultMonth);
  const [summary, setSummary] = useState({
    totalAmount: 0,
    totalLiters: 0,
    absentDays: 0,
    deliveredDays: 0,
    totalDaysInMonth: 31,
    completionPercentage: 0,
  });
  const [hasBillData, setHasBillData] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const billRef = useRef<HTMLDivElement>(null);
 

  const [monthName, year] = selectedMonth.split(" ");
  const month = MONTHS.indexOf(monthName) + 1;
  const expectedLiters = summary.deliveredDays * user.defaultQuantity;
  const extraLiters = summary.totalLiters - expectedLiters;

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await getMonthSummary(user.id, month, Number(year));

        const summaryData = response.data;

        setSummary(summaryData);

        const hasData =
          summaryData.deliveredDays > 0 ||
          summaryData.absentDays > 0 ||
          summaryData.totalLiters > 0;

        setHasBillData(hasData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSummary();
  }, [user.id, month, year]);

const handleDownloadPDF = () => {
  generateBillPdf({
    appName: "Doodhwala",
    userName: user.name || "Customer",
    selectedMonth,
    totalAmount: summary.totalAmount,
    totalLiters: summary.totalLiters,
    absentDays: summary.absentDays,
    deliveredDays: summary.deliveredDays,
    extraLiters: extraLiters > 0 ? extraLiters : 0,
  });

  toast.success("PDF downloaded successfully!");
};
 const shareText = generateShareText({
   userName: user.name || "Customer",
   selectedMonth,
   totalAmount: summary.totalAmount,
   totalLiters: summary.totalLiters,
   absentDays: summary.absentDays,
   deliveredDays: summary.deliveredDays,
   extraLiters: extraLiters > 0 ? extraLiters : 0,
 });
 
  return (
    <div
      className={`
        min-h-screen px-4 py-4

        ${theme === "light" ? "bg-sky-50" : "bg-[#020617]"}
      `}
    >
      <div className="max-w-[400px] mx-auto">
        {/* HEADER */}
        <div className="mb-5">
          <div className="flex items-start gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              aria-label="Go back"
              className={`
                mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl transition

                ${
                  theme === "light"
                    ? "text-slate-700 hover:bg-sky-50"
                    : "text-white hover:bg-slate-800"
                }
              `}
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <div className="min-w-0">
              <h1
                className={`
                  text-2xl font-black leading-tight

                  ${theme === "light" ? "text-slate-800" : "text-white"}
                `}
              >
                Monthly Bills
              </h1>

              <p
                className={`
                  text-sm leading-relaxed

                  ${theme === "light" ? "text-slate-400" : "text-slate-500"}
                `}
              >
                Download and share your monthly milk summary
              </p>
            </div>
          </div>
        </div>

        {/* MONTH SELECTOR */}
        <div
          className={`
            rounded-3xl p-4 border mb-2

            ${
              theme === "light"
                ? `
                  bg-white
                  border-sky-100
                `
                : `
                  bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950
                  border-slate-800
                `
            }
          `}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-700 flex items-center justify-center text-white shadow-lg">
              <CalendarDays className="w-6 h-6" />
            </div>

            <div>
              <h2
                className={`
                  text-lg font-bold

                  ${theme === "light" ? "text-slate-800" : "text-white"}
                `}
              >
                Select Month
              </h2>

              <p
                className={`
                  text-sm

                  ${theme === "light" ? "text-slate-400" : "text-slate-500"}
                `}
              >
                Choose month for bill summary
              </p>
            </div>
          </div>

          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className={`
              w-full h-11 rounded-2xl px-4 outline-none border text-sm font-medium

              ${
                theme === "light"
                  ? `
                    bg-sky-50
                    border-sky-100
                    text-slate-700
                  `
                  : `
                    bg-slate-800
                    border-slate-700
                    text-white
                  `
              }
            `}
          >
            {MONTH_OPTIONS.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        {/* BILL SUMMARY */}
        <div
          id="bill-pdf-section"
          ref={billRef}
          className={`
            rounded-2xl p-5 border mb-4

            ${
              theme === "light"
                ? `
                  bg-white
                  border-sky-100
                `
                : `
              bg-slate-900
                  border-slate-800
                `
            }
          `}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-700 flex items-center justify-center text-white shadow-lg">
              <Receipt className="w-6 h-6" />
            </div>

            <div>
              <h2
                className={`
                  text-xl font-black

                  ${theme === "light" ? "text-slate-800" : "text-white"}
                `}
              >
                Bill Summary
              </h2>

              <p
                className={`
                  text-sm

                  ${theme === "light" ? "text-slate-400" : "text-slate-500"}
                `}
              >
                Overview of your selected month
              </p>
            </div>
          </div>

          {/* TOTAL AMOUNT */}
          <div
            className={`
              rounded-2xl p-4 mb-4
              ${
                theme === "light"
                  ? "bg-sky-50"
                  : "bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950"
              }
            `}
          >
            <p
              className={
                theme === "light"
                  ? "text-sm text-slate-500"
                  : "text-sm text-slate-400"
              }
            >
              Total Monthly Bill
            </p>

            <h1
              className={
                theme === "light"
                  ? "text-3xl font-black mt-1 text-slate-900"
                  : "text-3xl font-black mt-1 text-white"
              }
            >
              {hasBillData ? `₹${summary.totalAmount.toLocaleString()}` : "0"}
            </h1>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 gap-3">
            <div
              className={`
                rounded-xl p-4 border

                ${
                  theme === "light"
                    ? `
                      bg-sky-50
                      border-sky-100
                    `
                    : `
                      bg-slate-800
                      border-slate-700
                    `
                }
              `}
            >
              <p className="text-sm text-slate-400">Total Liters</p>

              <h2
                className={`
                  text-xl font-black mt-1

                  ${theme === "light" ? "text-slate-800" : "text-white"}
                `}
              >
                {hasBillData ? `${summary.totalLiters}L` : "-"}
              </h2>
            </div>

            <div
              className={`
                rounded-xl p-4 border

                ${
                  theme === "light"
                    ? `
                      bg-sky-50
                      border-sky-100
                    `
                    : `
                      bg-slate-800
                      border-slate-700
                    `
                }
              `}
            >
              <p className="text-sm text-slate-400">Absent Days</p>

              <h2
                className={`
                  text-xl font-black mt-1

                  ${theme === "light" ? "text-slate-800" : "text-white"}
                `}
              >
                {hasBillData ? summary.absentDays : "-"}
              </h2>
            </div>

            <div
              className={`
                rounded-xl p-4 border

                ${
                  theme === "light"
                    ? `
                      bg-sky-50
                      border-sky-100
                    `
                    : `
                      bg-slate-800
                      border-slate-700
                    `
                }
              `}
            >
              <p className="text-sm text-slate-400">Extra Liters</p>

              <h2
                className={`
                  text-xl font-black mt-1

                  ${theme === "light" ? "text-slate-800" : "text-white"}
                `}
              >
                {hasBillData ? `${extraLiters > 0 ? extraLiters : 0}L` : "-"}
              </h2>
            </div>

            <div
              className={`
                rounded-xl p-4 border

                ${
                  theme === "light"
                    ? `
                      bg-sky-50
                      border-sky-100
                    `
                    : `
                      bg-slate-800
                      border-slate-700
                    `
                }
              `}
            >
              <p className="text-sm text-slate-400">Delivered Days</p>

              <h2
                className={`
                  text-xl font-black mt-1

                  ${theme === "light" ? "text-slate-800" : "text-white"}
                `}
              >
                {hasBillData ? summary.deliveredDays : "-"}
              </h2>
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-row space-y-3 gap-3">
          <button
            disabled={!hasBillData}
            onClick={() => setShowShareModal(true)}
            className={`
    w-full h-12 rounded-2xl font-bold flex items-center justify-center gap-3 transition border

    ${
      !hasBillData
        ? "bg-slate-500 text-white cursor-not-allowed border-transparent"
        : theme === "light"
          ? `
            bg-white
            border-sky-100
            text-slate-700
            hover:bg-sky-50
          `
          : `
            bg-slate-900
            border-slate-800
            text-white
            hover:bg-slate-800
          `
    }
  `}
          >
            <Share2 className="w-5 h-5" />
            Share Bill
          </button>
          <button
            disabled={!hasBillData}
            onClick={handleDownloadPDF}
            className={`
          w-full h-12 px-2 rounded-2xl transition font-bold flex items-center justify-center gap-3

          ${
            hasBillData
              ? "bg-indigo-700 hover:bg-indigo-800 text-white"
              : "bg-slate-500 cursor-not-allowed text-white"
          }
        `}
          >
            <Download className="w-5 h-5" />
            Download Bill 
          </button>
        </div>
      </div>
      <ShareBillModal
  show={showShareModal}
  onClose={() =>
    setShowShareModal(false)
  }
  shareText={shareText}
  selectedMonth={selectedMonth}
  theme={theme}
/>
    </div>
  );
}
