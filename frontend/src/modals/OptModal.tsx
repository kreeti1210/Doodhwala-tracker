import { useState } from "react";
import { useMilkStore } from "../store/useMilkStore";

type Props = {
  title: string;

  subtitle: string;

  onClose: () => void;
};

export default function OtpModal({ title, subtitle, onClose }: Props) {
  const [otp, setOtp] = useState("");
  const theme = useMilkStore((state) => state.theme);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          w-full max-w-[360px] rounded-[32px] p-7 shadow-2xl
          ${theme === "light" ? "bg-white" : "bg-slate-900"}
        `}
      >
        <h1
          className={`
            text-2xl font-black leading-tight
            ${theme === "light" ? "text-slate-800" : "text-white"}
          `}
        >
          {title}
        </h1>

        <p
          className={`
            text-sm mt-2 leading-relaxed
            ${theme === "light" ? "text-slate-400" : "text-slate-500"}
          `}
        >
          {subtitle}
        </p>

        <input
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className={`
            w-full h-14 rounded-2xl px-4 outline-none mt-5 border
            ${
              theme === "light"
                ? "bg-sky-50 border-sky-100 text-slate-700 placeholder:text-slate-300"
                : "bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
            }
          `}
        />

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

          <button className="flex-1 h-12 rounded-2xl bg-indigo-700 hover:bg-indigo-800 text-white font-semibold transition">
            Verify
          </button>
        </div>
      </div>
    </div>
  );
}
