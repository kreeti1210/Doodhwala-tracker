import { useEffect, useState } from "react";

import { useMilkStore } from "../store/useMilkStore";

import { Droplets, IndianRupee, XCircle } from "lucide-react";

import { getMonthSummary } from "../services/record.service";

const MONTHS = [
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

export default function TotalCard() {
  const user = useMilkStore((state) => state.user);

  const theme = useMilkStore((state) => state.theme);

  const selectedMonth = useMilkStore((state) => state.selectedMonth);

  const pricePerLiter = useMilkStore((state) => state.pricePerLiter);

  const [summary, setSummary] = useState({
    totalAmount: 0,

    totalLiters: 0,

    absentDays: 0,

    deliveredDays: 0,

    totalDaysInMonth: 31,

    completionPercentage: 0,
  });

  const [monthName, year] = selectedMonth.split(" ");

  const month = MONTHS.indexOf(monthName) + 1;

 useEffect(() => {
   const fetchSummary = async () => {
     try {
       const response = await getMonthSummary(user.id, month, Number(year));

       setSummary(response.data);
     } catch (error) {
       console.error(error);
     }
   };

   fetchSummary();

   const handleRefresh = () => {
     fetchSummary();
   };

   window.addEventListener("recordsUpdated", handleRefresh);

   return () => {
     window.removeEventListener("recordsUpdated", handleRefresh);
   };
 }, [user.id, month, year]);

  const stats = [
    {
      icon: <Droplets className="w-3.5 h-3.5" />,

      value: `${summary.totalLiters}L`,

      label: "Delivered",
    },

    {
      icon: <XCircle className="w-3.5 h-3.5" />,

      value: summary.absentDays,

      label: "Absent",
    },

    {
      icon: <IndianRupee className="w-3.5 h-3.5" />,

      value: `₹${pricePerLiter}/L`,

      label: "Rate",
    },
  ];

  return (
    <div
      className={`
        relative overflow-hidden rounded-3xl shadow-xl transition
        ${theme === "light" ? "shadow-slate-200/80" : "shadow-sky-950/40"}
      `}
    >
      <div
        className={`
          absolute inset-0
          ${
            theme === "light"
              ? "bg-gradient-to-br from-blue-100 to-sky-100"
              : "bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950"
          }
        `}
      />

      <div
        className={`
          relative p-6
          ${theme === "light" ? "text-slate-800" : "text-white"}
        `}
      >
        <div className="flex justify-between items-start mb-5">
          <div>
            <p
              className={`
                text-sm font-medium uppercase tracking-wider
                ${theme === "light" ? "text-indigo-500" : "text-sky-100"}
              `}
            >
              Total Bill
            </p>

            <h1 className="text-3xl font-black mt-1 ">
              ₹{summary.totalAmount.toLocaleString()}
            </h1>
          </div>

          <div
            className={`
              backdrop-blur-sm px-3 py-2 rounded-xl border
              ${
                theme === "light"
                  ? "bg-white/70 border-slate-200/80 text-slate-700"
                  : "bg-white/10 border-white/20 text-white"
              }
            `}
          >
            <span className="text-xs font-semibold">{selectedMonth}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-5">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`
                backdrop-blur-sm rounded-2xl p-3 border
                ${
                  theme === "light"
                    ? "bg-white/75 border-slate-200/80"
                    : "bg-white/10 border-white/10"
                }
              `}
            >
              <div
                className={`
                  flex items-center gap-1.5 mb-1.5
                  ${theme === "light" ? "text-indigo-500" : "text-sky-100"}
                `}
              >
                {stat.icon}

                <span className="text-xs">{stat.label}</span>
              </div>

              <p
                className={
                  theme === "light"
                    ? "text-slate-800 font-bold text-sm"
                    : "text-white font-bold text-sm"
                }
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={
                theme === "light"
                  ? "text-xs text-slate-500"
                  : "text-xs text-sky-100"
              }
            >
              Monthly progress
            </span>

            <span
              className={
                theme === "light"
                  ? "text-xs font-semibold text-slate-700"
                  : "text-xs font-semibold text-white"
              }
            >
              {summary.deliveredDays}/{summary.totalDaysInMonth} days
            </span>
          </div>

          <div
            className={
              theme === "light"
                ? "w-full h-2 bg-slate-200 rounded-full overflow-hidden"
                : "w-full h-2 bg-white/20 rounded-full overflow-hidden"
            }
          >
            <div
              style={{
                width: `${summary.completionPercentage}%`,
              }}
              className={
                theme === "light"
                  ? "h-full bg-indigo-700 rounded-full transition-all duration-500"
                  : "h-full bg-white rounded-full transition-all duration-500"
              }
            />
          </div>

          <p
            className={
              theme === "light"
                ? "text-xs text-slate-500 mt-2"
                : "text-xs text-sky-100/80 mt-2"
            }
          >
            {Math.round(summary.completionPercentage)}
            % of month completed
          </p>
        </div>
      </div>
    </div>
  );
}
