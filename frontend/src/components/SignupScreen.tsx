import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMilkStore } from "../store/useMilkStore";
import { createUser} from "../services/user.service";
import { sendOtp } from "../services/auth.service";
import OtpModal from "../modals/OptModal";
import toast from "react-hot-toast";
import AppLogo from "./AppLogo";

export default function SignupScreen() {
  const navigate = useNavigate();
  const theme = useMilkStore((state) => state.theme);
  const setUser = useMilkStore((state) => state.setUser);
  const phoneNumber = useMilkStore((state) => state.phoneNumber);
  const setPhoneNumber = useMilkStore((state) => state.setPhoneNumber);
  const [name, setName] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);

const handleSignup = async () => {
  try {
    if (!phoneNumber || !name) {
      toast.error("Must enter both fields");
            return;
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      toast.error("Phone number must be 10 digits");
      return;
    }

    await sendOtp(phoneNumber);
    toast.success("OTP sent");

    setShowOtpModal(true);
  } catch (error) {
    console.error(error);

    toast.error("Failed to send OTP");
  }
};

const handleOtpVerified = async () => {
  try {
    const response = await createUser(phoneNumber, name);

    const userData = response.data;

    setUser(userData);

    toast.success("Account created successfully");

    navigate("/setup");
  } catch (error) {
    console.error(error);

    toast.error("Failed to create account");
  }
};

  return (
    <div
      className={`
        min-h-screen flex items-center justify-center px-4

        ${
          theme === "light"
            ? "bg-gradient-to-br from-sky-50 to-white"
            : "bg-slate-950"
        }
      `}
    >
      <div className="w-full max-w-[390px]">
        <div className="text-center mb-6">
          <AppLogo
            theme={theme}
            className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-3 overflow-hidden ${
              theme === "light"
                ? "bg-gradient-to-br from-sky-600 to-indigo-700 shadow-lg shadow-sky-200"
                : "bg-gradient-to-br from-slate-800 to-indigo-900 shadow-lg shadow-slate-950/40"
            }`}
            imageClassName="scale-125"
          />

          <h1
            className={
              theme === "light"
                ? "text-2xl font-black text-slate-800 tracking-tight"
                : "text-2xl font-black text-white tracking-tight"
            }
          >
            MilkOMeter
          </h1>

          <p
            className={
              theme === "light"
                ? "text-slate-400 mt-1 text-sm"
                : "text-slate-500 mt-1 text-sm"
            }
          >
            Create your account
          </p>
        </div>

        <div
          className={
            theme === "light"
              ? "bg-white rounded-[32px] p-7 shadow-xl border border-sky-100"
              : "bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 rounded-[32px] p-7 shadow-xl border border-slate-800"
          }
        >
          <div className="mb-6">
            <h2
              className={
                theme === "light"
                  ? "text-xl font-bold text-slate-800"
                  : "text-xl font-bold text-white"
              }
            >
              Sign Up
            </h2>

            <p
              className={
                theme === "light"
                  ? "text-sm text-slate-400 mt-1"
                  : "text-sm text-slate-500 mt-1"
              }
            >
              Create your account
            </p>
          </div>

          <div className="mb-4">
            <label
              className={
                theme === "light"
                  ? "block text-sm font-semibold text-slate-600 mb-2"
                  : "block text-sm font-semibold text-slate-300 mb-2"
              }
            >
              Name
            </label>

            <div
              className={
                theme === "light"
                  ? "flex items-center bg-sky-50 border border-sky-100 rounded-2xl px-4 h-14"
                  : "flex items-center bg-slate-800 border border-slate-700 rounded-2xl px-4 h-14"
              }
            >
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
                className={
                  theme === "light"
                    ? "bg-transparent flex-1 outline-none text-slate-700 placeholder:text-slate-300"
                    : "bg-transparent flex-1 outline-none text-white placeholder:text-slate-500"
                }
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              className={
                theme === "light"
                  ? "block text-sm font-semibold text-slate-600 mb-2"
                  : "block text-sm font-semibold text-slate-300 mb-2"
              }
            >
              Phone Number
            </label>

            <div
              className={
                theme === "light"
                  ? "flex items-center bg-sky-50 border border-sky-100 rounded-2xl px-4 h-14"
                  : "flex items-center bg-slate-800 border border-slate-700 rounded-2xl px-4 h-14"
              }
            >
              <span
                className={
                  theme === "light"
                    ? "text-slate-500 font-medium mr-2"
                    : "text-slate-400 font-medium mr-2"
                }
              >
                +91
              </span>

              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your number"
                required
                className={
                  theme === "light"
                    ? "bg-transparent flex-1 outline-none text-slate-700 placeholder:text-slate-300"
                    : "bg-transparent flex-1 outline-none text-white placeholder:text-slate-500"
                }
              />
            </div>
          </div>

          <button
            onClick={handleSignup}
            className="w-full h-14 rounded-2xl bg-indigo-700 hover:bg-indigo-800 transition text-white font-bold"
          >
            Continue
          </button>

          <button
            onClick={() => navigate("/login")}
            className={
              theme === "light"
                ? "w-full mt-3 text-sm text-indigo-600 font-medium"
                : "w-full mt-3 text-sm text-indigo-400 font-medium"
            }
          >
            Already have an account? Login
          </button>
        </div>
      </div>
      {showOtpModal && (
        <OtpModal
          title="Verify OTP"
          subtitle={`Enter the OTP sent to +91 ${phoneNumber}`}
          phoneNumber={phoneNumber}
          onVerified={handleOtpVerified}
          onClose={() => setShowOtpModal(false)}
        />
      )}
    </div>
  );
}
