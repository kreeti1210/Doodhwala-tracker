import { useState } from "react";
import { ArrowLeft, Sun,Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMilkStore } from "../store/useMilkStore";
import SettingsConfirmModal from "../modals/SettingsConfirmModal";

export default function Setting() {
  const navigate = useNavigate();
  const theme = useMilkStore((state) => state.theme);
  const toggleTheme = useMilkStore((state) => state.toggleTheme);
  const defaultQuantity = useMilkStore((state) => state.defaultQuantity);
  const selectedMonth = useMilkStore((state) => state.selectedMonth);
  const pricePerLiter = useMilkStore((state) => state.pricePerLiter);
  const setDefaultQuantity = useMilkStore((state) => state.setDefaultQuantity);
  const setPricePerLiter = useMilkStore((state) => state.setPricePerLiter);
  const [quantity, setQuantity] = useState(defaultQuantity);
  const [rate, setRate] = useState(pricePerLiter);
  const [showModal, setShowModal] = useState(false);
  const [monthName, year] = selectedMonth.split(" ");
  const monthIndex = new Date(`${monthName} 1, ${year}`).getMonth();
  const totalDaysInMonth = new Date(Number(year), monthIndex + 1, 0).getDate();
  const monthlyEstimate = quantity * rate * totalDaysInMonth;

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
                mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl  transition
                ${
                  theme === "light"
                    ? "border-sky-100  text-slate-700 hover:bg-sky-50"
                    : "border-slate-800  text-white hover:bg-slate-800"
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
                Settings
              </h1>

              <p className="text-sm text-slate-400 leading-relaxed">
                Customize your milk tracking experience
              </p>
            </div>
          </div>
        </div>

        {/* THEME */}
        <div
          className={`
            rounded-3xl p-4 border mb-4

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
          <div className="flex items-center justify-between">
            <div>
              <h2
                className={`
                  font-bold text-lg

                  ${theme === "light" ? "text-slate-800" : "text-white"}
                `}
              >
                Theme
              </h2>

              <p className="text-sm text-slate-400  leading-relaxed">
                Toggle between light and dark mode
              </p>
            </div>

            <button
              onClick={toggleTheme}
              className="w-14 h-14 rounded-2xl bg-indigo-700 text-white flex items-center justify-center"
            >
              {theme === "light" ? (
                <Moon className="w-6 h-6" />
              ) : (
                <Sun className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        <div
          className={`
            rounded-3xl p-4 border

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
          <h2
            className={`
              font-bold text-xl mb-3

              ${theme === "light" ? "text-slate-800" : "text-white"}
            `}
          >
            Milk Plan
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-slate-400 mb-2">
              Daily Quantity
            </label>

            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className={`
                w-full h-11 rounded-2xl px-4 outline-none border

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
            />
          </div>

          {/* RATE */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-slate-400 mb-2">
              Price Per Liter
            </label>

            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className={`
                w-full h-11 rounded-2xl px-4 outline-none border

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
            />
          </div>

          {/* ESTIMATE */}
          <div
            className={`
              rounded-2xl p-4
              ${
                theme === "light"
                  ? "bg-sky-50 text-slate-700"
                  : "bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white"
              }
            `}
          >
            <p
              className={
                theme === "light"
                  ? "text-sm text-slate-500 leading-relaxed"
                  : "text-sm text-slate-400 leading-relaxed"
              }
            >
              Estimated Monthly Bill for {monthName} {year}
            </p>

            <h1
              className={
                theme === "light"
                  ? "text-3xl font-black mt-1 text-slate-900"
                  : "text-3xl font-black mt-1 text-white"
              }
            >
              ₹{monthlyEstimate}
            </h1>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="w-full h-14 rounded-2xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold mt-4 transition"
          >
            Save Changes
          </button>
        </div>
      </div>

      {showModal && (
        <SettingsConfirmModal
          quantity={quantity}
          rate={rate}
          onConfirm={() => {
            setDefaultQuantity(quantity);

            setPricePerLiter(rate);

            setShowModal(false);
          }}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
