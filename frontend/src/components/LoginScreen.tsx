import { useNavigate } from "react-router-dom";
import { useMilkStore } from "../store/useMilkStore";
import { createUser } from "../services/user.service";

import { Droplets } from "lucide-react";
import { useState } from "react";

export default function LoginScreen() {
  const navigate = useNavigate();

  const theme = useMilkStore((state) => state.theme);

  const setUser = useMilkStore((state) => state.setUser);

  const phoneNumber = useMilkStore((state) => state.phoneNumber);

  const setPhoneNumber = useMilkStore((state) => state.setPhoneNumber);


  const handleContinue = async () => {
    try {
      const response = await createUser(phoneNumber);

      const userData = response.data;

      setUser(userData);

      if (userData.hasCompletedSetup) {
        navigate("/dashboard");

        return;
      }

      navigate("/setup");
    } catch (error) {
      console.error(error);
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
        {/* TOP SECTION */}
        <div className="text-center mb-6">
          <div
            className={`
              inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3

              ${
                theme === "light"
                  ? "bg-gradient-to-br from-sky-600 to-indigo-700 shadow-lg shadow-sky-200"
                  : "bg-gradient-to-br from-slate-800 to-indigo-900 shadow-lg shadow-slate-950/40"
              }
            `}
          >
            <Droplets className="w-7 h-7 text-white" strokeWidth={1.5} />
          </div>

          <h1
            className={
              theme === "light"
                ? "text-2xl font-black text-slate-800 tracking-tight"
                : "text-2xl font-black text-white tracking-tight"
            }
          >
            Doodhwala
          </h1>

          <p
            className={
              theme === "light"
                ? "text-slate-400 mt-1 text-sm leading-relaxed max-w-[240px] mx-auto"
                : "text-slate-500 mt-1 text-sm leading-relaxed max-w-[240px] mx-auto"
            }
          >
            Smart milk tracking for your everyday
          </p>
        </div>

        {/* CARD */}
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
              Login
            </h2>

            <p
              className={
                theme === "light"
                  ? "text-sm text-slate-400 mt-1"
                  : "text-sm text-slate-500 mt-1"
              }
            >
              Continue with your phone number
            </p>
          </div>

          {/* PHONE INPUT */}
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
                placeholder="9876543210"
                className={
                  theme === "light"
                    ? "bg-transparent flex-1 outline-none text-slate-700 placeholder:text-slate-300"
                    : "bg-transparent flex-1 outline-none text-white placeholder:text-slate-500"
                }
              />
            </div>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleContinue}
            className="w-full h-14 rounded-2xl bg-indigo-700 hover:bg-indigo-800 transition text-white font-bold text-base shadow shadow-slate-600"
          >
            Continue
          </button>

          {/* FOOTER */}
          <p
            className={
              theme === "light"
                ? "text-center text-xs text-slate-300 mt-5"
                : "text-center text-xs text-slate-500 mt-5"
            }
          >
            OTP verification coming soon
          </p>

          <button
            onClick={() => navigate("/signup")}
            className={
              theme === "light"
                ? "w-full mt-3 text-sm text-indigo-600 font-medium"
                : "w-full mt-3 text-sm text-indigo-400 font-medium"
            }
          >
            New user? Create account
          </button>
        </div>
      </div>
    </div>
  );
}