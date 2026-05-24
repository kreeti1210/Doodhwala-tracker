type Props = {
  theme: string;

  newPhoneNumber: string;

  onClose: () => void;

  onConfirm: () => void;
};

export default function ConfirmPhoneModal({
  theme,
  newPhoneNumber,
  onClose,
  onConfirm,
}: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div
        className={`
          w-full max-w-[360px]
          rounded-[32px]
          p-7 shadow-2xl
          ${theme === "light" ? "bg-white" : "bg-slate-900"}
        `}
      >
        <h1
          className={`
            text-xl font-black
            ${theme === "light" ? "text-slate-800" : "text-white"}
          `}
        >
          Confirm Number
        </h1>

        <p
          className={`
            mt-3 text-sm leading-relaxed
            ${theme === "light" ? "text-slate-500" : "text-slate-400"}
          `}
        >
          Are you sure you want to change your number to:
        </p>

        <p className="text-indigo-500 font-bold text-lg mt-3">
          +91 {newPhoneNumber}
        </p>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className={`
              flex-1 h-12 rounded-2xl font-semibold
              ${
                theme === "light"
                  ? "bg-slate-100 text-slate-700"
                  : "bg-slate-800 text-white"
              }
            `}
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 h-12 rounded-2xl bg-indigo-700 hover:bg-indigo-800 text-white font-semibold"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
