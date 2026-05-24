import { useState } from "react";
import toast from "react-hot-toast";
import { useMilkStore } from "../store/useMilkStore";
import OtpModal from "./OptModal";
import { sendOtp } from "../services/auth.service";
import { updatePhoneNumber } from "../services/user.service";

type Props = {
  onClose: () => void;
};

export default function ChangePhoneModal({ onClose }: Props) {
  const theme = useMilkStore((state) => state.theme);

  const user = useMilkStore((state) => state.user);

  const setUser = useMilkStore((state) => state.setUser);

  const [newPhoneNumber, setNewPhoneNumber] = useState("");

  const [showOtpModal, setShowOtpModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    try {
      if (!/^\d{10}$/.test(newPhoneNumber)) {
        toast.error("Phone number must be 10 digits");

        return;
      }

      setLoading(true);

      await sendOtp(user.phoneNumber);

      toast.success("OTP sent to current phone number");

      setShowOtpModal(true);
    } catch (error) {
      console.error(error);

      toast.error("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerified = async () => {
    try {
      const response = await updatePhoneNumber(user.id, newPhoneNumber);

      if (!response.success) {
        toast.error(response.message);

        return;
      }

      setUser(response.data);

      toast.success("Phone number updated");

      setShowOtpModal(false);

      onClose();
    } catch (error) {
      console.error(error);

      toast.error("Failed to update number");
    }
  };

  return (
    <>
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
              text-2xl font-black
              ${theme === "light" ? "text-slate-800" : "text-white"}
            `}
          >
            Change Phone Number
          </h1>

          <p
            className={`
              text-sm mt-2
              ${theme === "light" ? "text-slate-400" : "text-slate-500"}
            `}
          >
            OTP will be sent to your current number
          </p>

          <input
            value={newPhoneNumber}
            onChange={(e) =>
              setNewPhoneNumber(e.target.value.replace(/\D/g, ""))
            }
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
              onClick={handleSendOtp}
              disabled={loading}
              className="flex-1 h-12 rounded-2xl bg-indigo-700 hover:bg-indigo-800 text-white font-semibold"
            >
              Verify
            </button>
          </div>
        </div>
      </div>

      {showOtpModal && (
        <OtpModal
          title="Verify OTP"
          subtitle={`Enter OTP sent to +91 ${user.phoneNumber}`}
          phoneNumber={user.phoneNumber}
          onVerified={handleVerified}
          onClose={() => setShowOtpModal(false)}
        />
      )}
    </>
  );
}
