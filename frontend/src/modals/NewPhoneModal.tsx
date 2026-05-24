import toast from "react-hot-toast";

type Props = {
  theme: string;

  phoneNumber: string;

  newPhoneNumber: string;

  setNewPhoneNumber: (value: string) => void;

  onClose: () => void;

  onContinue: () => void;
};

export default function NewPhoneModal({
  theme,
  phoneNumber,
  newPhoneNumber,
  setNewPhoneNumber,
  onClose,
  onContinue,
}: Props) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          w-full max-w-[360px]
          rounded-[32px]
          p-7 shadow-2xl
          ${theme === "light" ? "bg-white" : "bg-slate-900"}
        `}
      >
        <h1
          className={`
            text-2xl font-black
            ${theme === "light" ? "text-slate-800" : "text-white"}
          `}
        >
          New Phone Number
        </h1>

        <p
          className={`
            text-sm mt-2
            ${theme === "light" ? "text-slate-400" : "text-slate-500"}
          `}
        >
          Enter your new phone number
        </p>

        <input
          value={newPhoneNumber}
          onChange={(e) => setNewPhoneNumber(e.target.value.replace(/\D/g, ""))}
          inputMode="numeric"
          maxLength={10}
          placeholder="Enter new number"
          className={`
            w-full h-14 rounded-2xl px-4 outline-none mt-5 border
            ${
              theme === "light"
                ? "bg-sky-50 border-sky-100 text-slate-700"
                : "bg-slate-800 border-slate-700 text-white"
            }
          `}
        />

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
            onClick={() => {
              if (!/^\d{10}$/.test(newPhoneNumber)) {
                toast.error("Enter valid phone number");

                return;
              }

              if (newPhoneNumber === phoneNumber) {
                toast.error("New number cannot be same");

                return;
              }

              onContinue();
            }}
            className="flex-1 h-12 rounded-2xl bg-indigo-700 hover:bg-indigo-800 text-white font-semibold"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
