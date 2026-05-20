import { useMilkStore } from "../store/useMilkStore";

import { MONTHS } from "../constants/month";
const DAYS = ["S", "M", "T", "W", "T", "F", "S"];

export default function Calendar() {
  const selectedMonth = useMilkStore((state) => state.selectedMonth);

  const selectedDay = useMilkStore((state) => state.selectedDay);

  const setSelectedDay = useMilkStore((state) => state.setSelectedDay);

  const theme = useMilkStore((state) => state.theme);

  const [monthName, year] = selectedMonth.split(" ");

  const monthIndex = MONTHS.indexOf(monthName);

  const numericYear = Number(year);

  const today = new Date();

  const currentMonth = today.getMonth();

  const currentYear = today.getFullYear();

  const currentDay = today.getDate();

  const isCurrentMonth =
    monthIndex === currentMonth && numericYear === currentYear;

  const daysInMonth = new Date(numericYear, monthIndex + 1, 0).getDate();

  const firstDayOfMonth = new Date(numericYear, monthIndex, 1).getDay();

  const emptyCells = Array.from({
    length: firstDayOfMonth,
  });

  const dates = Array.from(
    {
      length: daysInMonth,
    },
    (_, index) => index + 1,
  );

  return (
    <div
      className={`
        rounded-3xl p-5 shadow-sm transition

        ${theme === "light" ? "bg-white" : "bg-slate-800"}
      `}
    >
      <div className="flex justify-between items-center mb-3 p-1">
        <span
          className={`
            text-2xl
            font-bold
            ${theme === "light" ? "text-slate-500" : "text-slate-300"}
          `}
        >
          {selectedMonth}
        </span>
      </div>

      <div
        className={`border p-4   ${theme === "light" ? "border-slate-200 " : "border-slate-700"} rounded-xl`}
      >
        <div className="grid grid-cols-7 gap-2  mb-4">
          {DAYS.map((day) => (
            <div
              key={day}
              className={`
              text-center text-xs font-semibold
              
              ${theme === "light" ? "text-slate-500 " : "text-slate-500"}
            `}
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {emptyCells.map((_, index) => (
            <div key={`empty-${index}`} />
          ))}

          {dates.map((day) => {
            const isFutureDate = isCurrentMonth && day > currentDay;

            return (
              <button
                key={day}
                disabled={isFutureDate}
                onClick={() => setSelectedDay(day)}
                className={`
                h-12 rounded-2xl text-sm font-bold transition

                ${
                  selectedDay === day
                    ? "bg-sky-500 text-white"
                    : isFutureDate
                      ? `
                        bg-slate-100
                        text-slate-400
                        cursor-not-allowed
                      `
                      : `
                        bg-sky-200
                        hover:bg-sky-100
                        text-slate-700
                      `
                }
              `}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
      <div
        className={`
          flex gap-4 mt-5 text-xs

          ${theme === "light" ? "text-slate-500" : "text-slate-400"}
        `}
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-sky-500" />
          Selected
        </div>

        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-slate-200" />
          Upcoming
        </div>
      </div>
    </div>
  );
}
