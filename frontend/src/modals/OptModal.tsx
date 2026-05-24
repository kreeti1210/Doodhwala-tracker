import { useState } from "react";
import { useMilkStore } from "../store/useMilkStore";
import toast from "react-hot-toast";
import { verifyOtp } from "../services/auth.service";

type Props = {
  title: string;
  subtitle: string;
  phoneNumber: string;
  onClose: () => void;
  onVerified: () => void;
};

export default function OtpModal({
  title,
  subtitle,
  phoneNumber,
  onVerified,
  onClose,
}: Props) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const theme = useMilkStore((state) => state.theme);
  const handleVerifyOtp = async () => {

  if (otp.length !== 6 || isNaN(Number(otp))) {
    toast.error("OTP must be a 6-digit number");
    return;
  }
    try {
      setLoading(true);

      const response = await verifyOtp(phoneNumber, otp);

      if (!response.success) {
        toast.error(response.message || "OTP verification failed");

        return;
      }
      onVerified();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          w-full max-w-[400px] rounded-[32px] p-7 shadow-2xl
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
            ${theme === "light" ? "text-slate-500 " : "text-slate-400"}
          `}
        >
          {subtitle}
        </p>

        <div className="flex justify-between gap-2 mt-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={otp[index] || ""}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");

                if (!value) return;

                const otpArray = otp.split("");

                otpArray[index] = value;

                const newOtp = otpArray.join("");

                setOtp(newOtp);

                const nextInput = document.getElementById(`otp-${index + 1}`);

                if (nextInput && index < 5) {
                  (nextInput as HTMLInputElement).focus();
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Backspace") {
                  const otpArray = otp.split("");

                  otpArray[index] = "";

                  setOtp(otpArray.join(""));

                  const prevInput = document.getElementById(`otp-${index - 1}`);

                  if (prevInput && index > 0) {
                    (prevInput as HTMLInputElement).focus();
                  }
                }
              }}
              onPaste={(e) => {
                e.preventDefault();

                const pastedData = e.clipboardData
                  .getData("text")
                  .replace(/\D/g, "")
                  .slice(0, 6);

                if (pastedData.length === 6) {
                  setOtp(pastedData);
                }
              }}
              id={`otp-${index}`}
              className={`
          w-12 h-14 rounded-2xl border text-center text-xl font-black outline-none transition
          ${
            theme === "light"
              ? `
                bg-sky-50
                border-sky-100
                text-slate-800
                focus:border-indigo-400
              `
              : `
                bg-slate-800
                border-slate-700
                text-white
                focus:border-indigo-500
              `
          }
        `}
            />
          ))}
        </div>

        <p
          className={`
    text-xs mt-3 text-center
    ${theme === "light" ? "text-slate-400" : "text-slate-500"}
  `}
        >
          OTP is valid for 5 minutes
        </p>

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

          <button
            onClick={handleVerifyOtp}
            disabled={loading}
            className="
    flex-1 h-12 rounded-2xl
    bg-indigo-700 hover:bg-indigo-800
    text-white font-semibold transition
    disabled:opacity-50
  "
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </div>
      </div>
    </div>
  );
}
