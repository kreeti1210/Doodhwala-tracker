import { useNavigate } from "react-router-dom";
import { useMilkStore } from "../store/useMilkStore";
import { Zap, CalendarDays } from "lucide-react";
import { updateUser } from "../services/user.service";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SetupScreen() {
  const navigate = useNavigate();
  const theme = useMilkStore((state) => state.theme);

  const quantity = useMilkStore((state) => state.defaultQuantity);

  const setQuantity = useMilkStore((state) => state.setDefaultQuantity);

  const rate = useMilkStore((state) => state.pricePerLiter);

  const setRate = useMilkStore((state) => state.setPricePerLiter);
  const user = useMilkStore((state) => state.user);
  const today = new Date().toISOString().split("T")[0];

  const [startsToday, setStartsToday] = useState(true);

  const [deliveryStartDate, setDeliveryStartDate] = useState(today);
  const setUser = useMilkStore((state) => state.setUser);

  const estimatedBill = quantity * rate * 30;

  const handleStart = async () => {
    try {
      const response = await updateUser(user.id, {
        defaultQuantity: quantity,

        defaultPricePerLiter: rate,

        hasCompletedSetup: true,

        deliveryStartDate: new Date(
          startsToday ? today : deliveryStartDate,
        ).toISOString(),
      });
      setUser(response.data);
      toast.success("Signup successful!")
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`
        min-h-screen flex items-center justify-center px-4
        ${theme === "light" ? "bg-gradient-to-br from-sky-50 to-white" : "bg-slate-950"}
      `}
    >
      <div className="w-full max-w-[390px]">
        {/* HEADER */}
        <div className="text-center mb-4">
          <div
            className={`
              inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-3
              ${theme === "light" ? "bg-gradient-to-br from-sky-500 to-indigo-700 shadow-lg shadow-sky-200" : "bg-gradient-to-br from-slate-800 to-indigo-900 shadow-lg shadow-slate-950/40"}
            `}
          >
            <Zap className="w-5 h-5 text-white" strokeWidth={1.5} />
          </div>

          <h1
            className={
              theme === "light"
                ? "text-2xl font-black text-slate-800"
                : "text-2xl font-black text-white"
            }
          >
            Setup Your Plan
          </h1>

          <p
            className={
              theme === "light"
                ? "text-slate-400 mt-1 text-sm leading-relaxed"
                : "text-slate-500 mt-1 text-sm leading-relaxed"
            }
          >
            Configure your daily milk quantity and pricing
          </p>
        </div>

        {/* CARD */}
        <div
          className={
            theme === "light"
              ? "bg-white rounded-[32px] p-6 shadow-xl border border-sky-100"
              : "bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 rounded-[32px] p-6 shadow-xl border border-slate-800"
          }
        >
          {/* QUANTITY */}
          <div className="mb-5">
            <label
              className={
                theme === "light"
                  ? "block  font-semibold text-slate-600 mb-3"
                  : "block  font-semibold text-slate-300 mb-3"
              }
            >
              Daily Quantity
            </label>

            <div className="flex items-center justify-between">
              <button
                onClick={() => setQuantity(Math.max(0.5, quantity - 0.5))}
                className={
                  theme === "light"
                    ? "w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 text-2xl font-bold"
                    : "w-12 h-12 rounded-2xl bg-slate-950 text-slate-100 text-2xl font-bold"
                }
              >
                −
              </button>

              <div className="text-center">
                <h1
                  className={
                    theme === "light"
                      ? "text-3xl font-bold text-slate-900"
                      : "text-3xl font-bold text-white"
                  }
                >
                  {quantity}
                </h1>

                <p
                  className={
                    theme === "light"
                      ? "text-slate-400 mt-1"
                      : "text-slate-400 mt-1"
                  }
                >
                  Liters / Day
                </p>
              </div>

              <button
                onClick={() => setQuantity(quantity + 0.5)}
                className={
                  theme === "light"
                    ? "w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 text-2xl font-bold"
                    : "w-12 h-12 rounded-2xl bg-slate-950 text-slate-100 text-2xl font-bold"
                }
              >
                +
              </button>
            </div>
          </div>

          {/* RATE */}
          <div className="mb-5">
            <label
              className={
                theme === "light"
                  ? "block text-sm font-semibold text-slate-600 mb-2"
                  : "block text-sm font-semibold text-slate-300 mb-2"
              }
            >
              Rate Per Liter
            </label>

            <div
              className={
                theme === "light"
                  ? "flex items-center bg-sky-50 border border-sky-100 rounded-2xl px-4 h-14"
                  : "flex items-center bg-slate-950 border border-slate-800 rounded-2xl px-4 h-14"
              }
            >
              <span
                className={
                  theme === "light"
                    ? "text-slate-500 mr-2"
                    : "text-slate-400 mr-2"
                }
              >
                ₹
              </span>

              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className={
                  theme === "light"
                    ? "bg-transparent flex-1 outline-none text-slate-700"
                    : "bg-transparent flex-1 outline-none text-slate-100"
                }
              />
            </div>
          </div>
          {/* DELIVERY START DATE */}
          <div className="mb-7">
            <div className="flex items-center justify-between mb-3">
              <label
                className={
                  theme === "light"
                    ? "text-sm font-semibold text-slate-600"
                    : "text-sm font-semibold text-slate-300"
                }
              >
                Delivery Start Date
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={startsToday}
                  onChange={() => setStartsToday(!startsToday)}
                  className="accent-indigo-700"
                />

                <span
                  className={
                    theme === "light"
                      ? "text-xs text-slate-500"
                      : "text-xs text-slate-400"
                  }
                >
                  Starts Today
                </span>
              </label>
            </div>

            <div
              className={
                theme === "light"
                  ? "flex items-center gap-3 bg-sky-50 border border-sky-100 rounded-2xl px-4 h-14"
                  : "flex items-center gap-3 bg-slate-800 border border-slate-700 rounded-2xl px-4 h-14"
              }
            >
              <CalendarDays
                className={
                  theme === "light"
                    ? "w-5 h-5 text-slate-400"
                    : "w-5 h-5 text-slate-500"
                }
              />

              <input
                type="date"
                disabled={startsToday}
                value={deliveryStartDate}
                onChange={(e) => setDeliveryStartDate(e.target.value)}
                className={
                  theme === "light"
                    ? "bg-transparent flex-1 outline-none text-slate-700"
                    : "bg-transparent flex-1 outline-none text-white"
                }
              />
            </div>
          </div>

          {/* ESTIMATE */}
          <div
            className={
              theme === "light"
                ? "bg-sky-50 rounded-2xl p-4 mb-5"
                : "bg-slate-950 rounded-2xl p-4 mb-5"
            }
          >
            <p
              className={
                theme === "light"
                  ? "text-sm text-slate-500"
                  : "text-sm text-slate-400"
              }
            >
              Estimated Monthly Bill
            </p>

            <h2
              className={
                theme === "light"
                  ? "text-2xl font-black mt-1 text-slate-900"
                  : "text-2xl font-black mt-1 text-white"
              }
            >
              ₹{estimatedBill}
            </h2>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleStart}
            className="w-full h-14 rounded-2xl bg-indigo-700 hover:bg-indigo-800 transition text-white font-bold text-base "
          >
            Start Tracking
          </button>
        </div>
      </div>
    </div>
  );
}
