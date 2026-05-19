import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMilkStore } from "../store/useMilkStore";
import { generateMonthOptions } from "../utils/date";
import {
  Moon,
  Sun,
  Settings,
  LogOut,
  User,
  Droplets,
  ChevronDown,
} from "lucide-react";

const MONTH_OPTIONS = generateMonthOptions();

export default function Navbar() {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const selectedMonth = useMilkStore((state) => state.selectedMonth);
  const setSelectedMonth = useMilkStore((state) => state.setSelectedMonth);
  const theme = useMilkStore((state) => state.theme);
  const toggleTheme = useMilkStore((state) => state.toggleTheme);
  const clearUser = useMilkStore((state) => state.clearUser);
  const setPhoneNumber = useMilkStore((state) => state.setPhoneNumber);
  const user = useMilkStore((state) => state.user);
  const [name, setName] = useState(user?.name || "");
  const isDark = theme === "dark";

  return (
    <header
      className={`
        sticky top-0 z-20
        backdrop-blur-xl
        border-b transition-all duration-200
        ${
          isDark
            ? "bg-slate-950/90 border-slate-800"
            : "bg-white/90 border-slate-100"
        }
      `}
    >
      <div className="max-w-[460px] mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <div
            className={`
            w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0
            bg-gradient-to-br from-indigo-400 to-indigo-700 shadow-md
          `}
          >
            <Droplets className="w-4 h-4 text-white" strokeWidth={1.5} />
          </div>
          <div>
            <h1
              className={`
              text-base font-bold tracking-tight
              ${isDark ? "text-white" : "text-slate-800"}
            `}
            >
              Doodhwala
            </h1>
            <p
              className={`
              text-xs leading-none
              ${isDark ? "text-slate-500" : "text-slate-400"}
            `}
            >
              Smart milk tracking
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2">
          {/* MONTH SELECT */}
          <div className="relative">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className={`
                appearance-none rounded-xl pl-3 pr-7 py-2
                text-xs font-medium outline-none border cursor-pointer
                transition-all duration-200
                ${
                  isDark
                    ? "bg-slate-800 border-slate-700 text-slate-200 hover:border-slate-600"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:border-sky-300"
                }
              `}
            >
              {MONTH_OPTIONS.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <ChevronDown
              className={`
              absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none
              ${isDark ? "text-slate-400" : "text-slate-400"}
            `}
            />
          </div>

          {/* THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            className={`
              w-9 h-9 rounded-xl flex items-center justify-center
              transition-all duration-200 border
              ${
                isDark
                  ? "bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700"
                  : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-sky-50 hover:border-sky-200"
              }
            `}
          >
            {isDark ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          {/* PROFILE */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className={`
                w-9 h-9 rounded-xl flex items-center justify-center
                transition-all duration-200 border
                ${
                  isProfileOpen
                    ? isDark
                      ? "bg-sky-900 border-sky-700 text-sky-300"
                      : "bg-sky-50 border-sky-200 text-sky-600"
                    : isDark
                      ? "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-sky-50 hover:border-sky-200"
                }
              `}
            >
              <User className="w-4 h-4" />
            </button>

            {isProfileOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsProfileOpen(false)}
                />
                <div
                  className={`
                    absolute right-0 mt-2 w-52 z-50
                    rounded-2xl shadow-xl border overflow-hidden
                    animate-in fade-in slide-in-from-top-2 duration-150
                    ${
                      isDark
                        ? "bg-slate-900 border-slate-700 shadow-slate-900/50"
                        : "bg-white border-slate-100 shadow-slate-200/60"
                    }
                  `}
                >
                  {/* User info header */}
                  <div
                    className={`
                    px-4 py-3 border-b
                    ${isDark ? "border-slate-800" : "border-slate-50"}
                  `}
                  >
                    <p
                      className={`text-sm font-semibold ${isDark ? "text-slate-300" : "text-slate-700"}`}
                    >
                   {user?.name}
                    </p>
                    <p
                      className={`text-xs mt-0.5 ${isDark ? "text-slate-500" : "text-slate-400"}`}
                    >
                      Manage your settings
                    </p>
                  </div>

                  <div className="py-1">
                    {/* PROFILE */}
                    <button
                      className={`
                        w-full px-4 py-2.5 text-left text-sm flex items-center gap-3 transition-colors
                        ${
                          isDark
                            ? "text-slate-300 hover:bg-slate-800"
                            : "text-slate-700 hover:bg-slate-50"
                        }
                      `}
                      onClick={() => {
                        navigate("/profile");
                      }}
                    >
                      <User className="w-4 h-4 opacity-60" />
                      Profile
                    </button>

                    {/* SETTINGS */}
                    <button
                      onClick={() => navigate("/settings")}
                      className={`
                        w-full px-4 py-2.5 text-left text-sm flex items-center gap-3 transition-colors
                        ${
                          isDark
                            ? "text-slate-300 hover:bg-slate-800"
                            : "text-slate-700 hover:bg-slate-50"
                        }
                      `}
                    >
                      <Settings className="w-4 h-4 opacity-60" />
                      Settings
                    </button>
                  </div>

                  <div
                    className={`border-t py-1 ${isDark ? "border-slate-800" : "border-slate-100"}`}
                  >
                    {/* LOGOUT */}
                    <button
                      onClick={() => {
                        clearUser();
                        setPhoneNumber("");
                        navigate("/login");
                      }}
                      className={`
                        w-full px-4 py-2.5 text-left text-sm flex items-center gap-3 transition-colors
                        ${
                          isDark
                            ? "text-red-400 hover:bg-red-950/30"
                            : "text-red-500 hover:bg-red-50"
                        }
                      `}
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
