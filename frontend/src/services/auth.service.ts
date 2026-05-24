import API_BASE_URL from "./api";

export const sendOtp = async (phoneNumber: string) => {
  const response = await fetch(`${API_BASE_URL}/auth/send-otp`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      phoneNumber,
    }),
  });

  return response.json();
};

export const verifyOtp = async (phoneNumber: string, otp: string) => {
  const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      phoneNumber,
      otp,
    }),
  });

  return response.json();
};
