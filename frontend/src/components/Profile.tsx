import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMilkStore } from "../store/useMilkStore";
import OtpModal from "../modals/OptModal";
import { updateUser } from "../services/user.service";

export default function Profile() {
  const navigate = useNavigate();
  const phoneNumber = useMilkStore((state) => state.phoneNumber);

  const setUser = useMilkStore((state) => state.setUser);

  const theme = useMilkStore((state) => state.theme);

  const user = useMilkStore((state) => state.user);

  const [name, setName] = useState(user?.name || "");

  const [vendorName, setVendorName] = useState(user?.preferredVendorName || "");

  const [address, setAddress] = useState(user?.address || "");

  const [showOtpModal, setShowOtpModal] = useState(false);

  const [otpType, setOtpType] = useState<"phone" | "delete">("phone");
  const [loading, setLoading] = useState(false);
  const handleSaveProfile = async () => {
    try {
      setLoading(true);

      const response = await updateUser(user.id, {
        name,

        preferredVendorName: vendorName,

        address,
      });

      setUser(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`
        min-h-screen px-4 py-4

        ${theme === "light" ? "bg-sky-50" : "bg-[#020617]"}
      `}
    >
      <div className="max-w-[400px] mx-auto">
        {/* HEADER */}
        <div className="mb-5">
          <div className="flex items-start gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              aria-label="Go back"
              className={`
                mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl  transition
                ${
                  theme === "light"
                    ? "border-sky-100  text-slate-700 hover:bg-sky-50"
                    : "border-slate-800  text-white hover:bg-slate-800"
                }
              `}
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <div className="min-w-0">
              <h1
                className={`
                  text-2xl font-black leading-tight
                  ${theme === "light" ? "text-slate-800" : "text-white"}
                `}
              >
                Profile
              </h1>

              <p
                className={`
                  text-sm leading-relaxed
                  ${theme === "light" ? "text-slate-400" : "text-slate-500"}
                `}
              >
                Manage your personal information
              </p>
            </div>
          </div>
        </div>

        {/* PROFILE CARD */}
        <div
          className={`
            rounded-3xl p-5 shadow-sm border mb-2

            ${
              theme === "light"
                ? `
                  bg-white
                  border-sky-100
                `
                : `
                  bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950
                  border-slate-800
                `
            }
          `}
        >
          {/* IMAGE */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-indigo-700 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {name.charAt(0)}
            </div>

            <button
              disabled
              className="mt-2 text-xs text-slate-400 font-semibold cursor-not-allowed"
            >
              Change Photo
            </button>
          </div>

          {/* FORM */}
          <div className="mt-4 space-y-3">
            {/* NAME */}
            <div>
              <label
                className={`
                  text-sm font-semibold block mb-2

                  ${theme === "light" ? "text-slate-600" : "text-slate-300"}
                `}
              >
                Name
              </label>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className={`
                  w-full h-10 rounded-2xl px-4 outline-none border

                  ${
                    theme === "light"
                      ? `
                        bg-sky-50
                        border-sky-100
                        text-slate-700
                      `
                      : `
                        bg-slate-800
                        border-slate-700
                        text-white
                      `
                  }
                `}
              />
            </div>
            {/* VENDOR NAME */}
            <div>
              <label
                className={`
      text-sm font-semibold block mb-2

      ${theme === "light" ? "text-slate-600" : "text-slate-300"}
    `}
              >
                Vendor Name
              </label>

              <input
                value={vendorName}
                onChange={(e) => setVendorName(e.target.value)}
                placeholder="Optional"
                className={`
      w-full h-10 rounded-2xl px-4 outline-none border

      ${
        theme === "light"
          ? `
            bg-sky-50
            border-sky-100
            text-slate-700
          `
          : `
            bg-slate-800
            border-slate-700
            text-white
          `
      }
    `}
              />
            </div>
            {/* ADDRESS */}
            <div>
              <label
                className={`
      text-sm font-semibold block mb-2

      ${theme === "light" ? "text-slate-600" : "text-slate-300"}
    `}
              >
                Address
              </label>

              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Optional"
                rows={1}
                className={`
      w-full rounded-2xl px-4 py-2 outline-none border resize-none

      ${
        theme === "light"
          ? `
            bg-sky-50
            border-sky-100
            text-slate-700
          `
          : `
            bg-slate-800
            border-slate-700
            text-white
          `
      }
    `}
              />
            </div>
            {/* PHONE */}
            <div>
              <label
                className={`
                  text-sm font-semibold block mb-2

                  ${theme === "light" ? "text-slate-600" : "text-slate-300"}
                `}
              >
                Phone Number
              </label>

              <div
                className={`
                  h-10 rounded-2xl px-4 flex items-center justify-between border

                  ${
                    theme === "light"
                      ? `
                        bg-sky-50
                        border-sky-100
                      `
                      : `
                        bg-slate-800
                        border-slate-700
                      `
                  }
                `}
              >
                <p
                  className={`
                  font-semibold

                  ${theme === "light" ? "text-slate-700" : "text-white"}
                `}
                >
                  +91 {phoneNumber}
                </p>

                <button
                  onClick={() => {
                    setOtpType("phone");

                    setShowOtpModal(true);
                  }}
                  className="text-sm text-indigo-500 font-semibold"
                >
                  Change
                </button>
              </div>

            </div>
          </div>
        </div>
        <button
          onClick={handleSaveProfile}
          disabled={loading}
          className="w-full h-10 mb-5 px-2 rounded-2xl bg-indigo-700 hover:bg-indigo-800 text-white font-semibold transition mt-2"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>

        {/* DELETE ACCOUNT */}
        <div
          className={`
            rounded-3xl p-4 border

            ${
              theme === "light"
                ? `
                  bg-white
                  border-slate-200
                `
                : `
                  bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950
                  border-slate-900/40
                `
            }
          `}
        >
          <h2 className="text-red-500 font-bold text-lg">Delete Account</h2>

          <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">
            Permanently remove your account and all delivery records.
          </p>

          <button
            onClick={() => {
              setOtpType("delete");

              setShowOtpModal(true);
            }}
            className="mt-4 h-11 px-5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-semibold transition"
          >
            Delete Account
          </button>
        </div>
      </div>

      {showOtpModal && (
        <OtpModal
          title={otpType === "phone" ? "Verify Phone Number" : "Delete Account"}
          subtitle={
            otpType === "phone"
              ? "Enter OTP to change your phone number"
              : "Enter OTP to confirm account deletion"
          }
          onClose={() => setShowOtpModal(false)}
        />
      )}
    </div>
  );
}
