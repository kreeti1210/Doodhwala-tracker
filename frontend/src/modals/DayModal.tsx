import { useEffect, useState } from "react";
import { useMilkStore } from "../store/useMilkStore";
import toast from "react-hot-toast";
import { getRecordByDate, saveRecord } from "../services/record.service";
import { MONTHS } from "../constants/month";

export default function DayModal() {
    const user = useMilkStore((state) => state.user);
  const [loading, setLoading] = useState(false);
  const selectedDay = useMilkStore((state) => state.selectedDay);
  const setSelectedDay = useMilkStore((state) => state.setSelectedDay);
  const selectedMonth = useMilkStore((state) => state.selectedMonth);
  const pricePerLiter = useMilkStore((state) => state.pricePerLiter);
  const defaultQuantity = useMilkStore((state) => state.defaultQuantity);
  const theme = useMilkStore((state) => state.theme);
  const [quantity, setQuantity] = useState(defaultQuantity);
  const [isAbsent, setIsAbsent] = useState(false);
  if (!selectedDay) {
    return null;
  }

  const [monthName, year] = selectedMonth.split(" ");
  const monthIndex = MONTHS.indexOf(monthName);
  const formattedDate = `${year}-${String(monthIndex + 1).padStart(
    2,
    "0",
  )}-${String(selectedDay).padStart(2, "0")}`;

  const selectedDate = new Date(formattedDate);
  const setupDate = new Date(user.deliveryStartDate || user.createdAt);
  setupDate.setHours(0, 0, 0, 0);
  selectedDate.setHours(0, 0, 0, 0);
  const isBeforeSetupDate = selectedDate < setupDate;

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        if (isBeforeSetupDate) {
          setQuantity(0);
          setIsAbsent(true);
          return;
        }

        const response = await getRecordByDate(user.id, formattedDate);
        const existingRecord = response.data;
        if (existingRecord) {
          setQuantity(existingRecord.quantity);
          setIsAbsent(existingRecord.status === "absent");
          return;
        }

        setQuantity(defaultQuantity);
        
        setIsAbsent(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecord();
  }, [formattedDate, user.id, defaultQuantity, isBeforeSetupDate]);

  const totalPrice = isBeforeSetupDate ? 0 : quantity * pricePerLiter;

  const handleSave = async () => {
    if (isBeforeSetupDate) {
      return;
    }
    try {
      setLoading(true);

    const response = await saveRecord({
            userId: user.id,
      date: formattedDate,
      quantity: isAbsent ? 0 : quantity,
      pricePerLiter,
      status: isAbsent ? "absent" : "delivered",
    });
     toast.success("Changes Saved!");
    if (response?.data) {
      window.dispatchEvent(new Event("recordsUpdated"));
    }
    setSelectedDay(null);
    } catch (error) {
      console.error(error);
       toast.error("Error saving Changes!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={() => setSelectedDay(null)}
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          w-full max-w-[380px]
          rounded-[32px] p-6 shadow-2xl transition

          ${theme === "light" ? "bg-white" : "bg-slate-900"}
        `}
      >
        <div
          className={`
            w-14 h-1.5 rounded-full mx-auto mb-5

            ${theme === "light" ? "bg-slate-200" : "bg-slate-700"}
          `}
        />

        <div className="mb-5">
          <h2
            className={`
              text-2xl font-bold

              ${theme === "light" ? "text-slate-800" : "text-white"}
            `}
          >
            {monthName} {selectedDay}, {year}
          </h2>

          <p
            className={`
              text-sm mt-1

              ${theme === "light" ? "text-slate-400" : "text-slate-500"}
            `}
          >
            Update milk delivery details
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => setIsAbsent(false)}
            disabled={isBeforeSetupDate}
            className={`
              py-2.5 rounded-2xl font-semibold transition

              ${
                !isAbsent
                  ? "bg-indigo-700 text-white"
                  : `
                    ${
                      theme === "light"
                        ? "bg-sky-50 text-sky-600"
                        : "bg-slate-800 text-slate-200"
                    }
                  `
              }

              ${isBeforeSetupDate ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            ✓ Delivered
          </button>

          <button
            onClick={() => setIsAbsent(true)}
            disabled={isBeforeSetupDate}
            className={`
              py-2.5 rounded-2xl font-semibold transition

              ${
                isAbsent
                  ? "bg-red-500 text-white"
                  : `
                    bg-red-50
                    text-red-500
                  `
              }

              ${isBeforeSetupDate ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            ✕ Absent
          </button>
        </div>

        {!isAbsent && (
          <div className="mb-7">
            <label
              className={`
                block text-sm font-medium mb-3

                ${theme === "light" ? "text-slate-500" : "text-slate-400"}
              `}
            >
              Milk Quantity
            </label>

            <div className="flex items-center justify-between">
              <button
                onClick={() => setQuantity(Math.max(0.5, quantity - 0.5))}
                disabled={isBeforeSetupDate}
                className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-700 text-2xl font-bold"
              >
                −
              </button>

              <div className="text-center">
                <h1 className="text-4xl font-bold text-sky-600">{quantity}</h1>

                <p
                  className={`
                    mt-1 text-sm

                    ${theme === "light" ? "text-slate-400" : "text-slate-500"}
                  `}
                >
                  Liters
                </p>
              </div>

              <button
                onClick={() => setQuantity(quantity + 0.5)}
                disabled={isBeforeSetupDate}
                className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-700 text-2xl font-bold"
              >
                +
              </button>
            </div>

            <div
              className={`
                mt-5 rounded-2xl p-4 text-center

                ${theme === "light" ? "bg-sky-50" : "bg-slate-800"}
              `}
            >
              <p
                className={`
                  text-sm

                  ${theme === "light" ? "text-slate-500" : "text-slate-400"}
                `}
              >
                Estimated Cost
              </p>

              <h3 className="text-2xl font-bold text-sky-700 mt-1">
                ₹{totalPrice}
              </h3>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={() => setSelectedDay(null)}
            className={`
              flex-1 py-2.5 rounded-2xl font-semibold

              ${
                theme === "light"
                  ? `
                    bg-slate-100
                    text-slate-600
                  `
                  : `
                    bg-slate-800
                    text-slate-200
                  `
              }
            `}
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={loading || isBeforeSetupDate}
            className="flex-1 py-2.5 rounded-2xl bg-indigo-700 hover:bg-indigo-800 text-white font-semibold transition"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
