import { useMilkStore } from "../store/useMilkStore";

type Props = {
  quantity: number;

  rate: number;

  onConfirm: () => void;

  onClose: () => void;
};

export default function SettingsConfirmModal({
  quantity,
  rate,
  onConfirm,
  onClose,
}: Props) {
  const theme = useMilkStore((state) => state.theme);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          w-full max-w-[360px] rounded-[32px] p-6 shadow-2xl
          ${theme === "light" ? "bg-white" : "bg-slate-900"}
        `}
      >
        <h1
          className={`
            text-2xl font-black
            ${theme === "light" ? "text-slate-800" : "text-white"}
          `}
        >
          Confirm Changes
        </h1>

        <div
          className={`
            rounded-2xl p-5 mt-5
            ${theme === "light" ? "bg-sky-50" : "bg-slate-800"}
          `}
        >
          <div className="flex justify-between mb-3">
            <span className={theme === "light" ? "text-slate-500" : "text-slate-400"}>
              Daily Quantity
            </span>

            <span className={theme === "light" ? "font-bold text-slate-700" : "font-bold text-white"}>
              {quantity}L
            </span>
          </div>

          <div className="flex justify-between mb-3">
            <span className={theme === "light" ? "text-slate-500" : "text-slate-400"}>
              Price Per Liter
            </span>

            <span className={theme === "light" ? "font-bold text-slate-700" : "font-bold text-white"}>
              ₹{rate}
            </span>
          </div>

          <div className="flex justify-between">
            <span className={theme === "light" ? "text-slate-500" : "text-slate-400"}>
              Monthly Estimate
            </span>

            <span className="font-black text-indigo-700">
              ₹{quantity * rate * 30}
            </span>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className={`
              flex-1 h-12 rounded-2xl font-semibold transition
              ${
                theme === "light"
                  ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  : "bg-slate-800 text-slate-200 hover:bg-slate-700"
              }
            `}
          >
            Cancel
          </button>

          <button onClick={onConfirm} className="flex-1 h-12 rounded-2xl bg-indigo-700 hover:bg-indigo-800 text-white font-semibold transition">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
