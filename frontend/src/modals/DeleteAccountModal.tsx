type Props = {
  theme: string;

  onClose: () => void;

  onConfirm: () => void;
};

export default function DeleteAccountModal({
  theme,
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
            text-xl font-black text-red-500
          `}
        >
          Delete Account
        </h1>

        <p
          className={`
            mt-3 text-sm leading-relaxed
            ${theme === "light" ? "text-slate-500" : "text-slate-400"}
          `}
        >
          Are you sure you want to permanently delete your account and all
          records?
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
            className="flex-1 h-12 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-semibold"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
