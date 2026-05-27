import axios from "axios";

const BASE_URL = process.env.MESSAGE_CENTRAL_BASE_URL;

const CUSTOMER_ID = process.env.MESSAGE_CENTRAL_CUSTOMER_ID;

const BASE64_PASSWORD = process.env.MESSAGE_CENTRAL_BASE64_PASSWORD;
if (!BASE_URL || !CUSTOMER_ID || !BASE64_PASSWORD) {
  throw new Error("Message Central env variables missing");
}

let cachedAuthToken = "";

let tokenExpiry = 0;

export const generateAuthToken = async () => {
  try {
    if (cachedAuthToken && Date.now() < tokenExpiry) {
      return cachedAuthToken;
    }

    const response = await axios.get(
      `${BASE_URL}/auth/v1/authentication/token`,
      {
        params: {
          customerId: CUSTOMER_ID,
          key: BASE64_PASSWORD,
          country: "91",
          scope: "NEW",
        },
      },
    );

    const authToken = response.data?.token;

    cachedAuthToken = authToken;

    tokenExpiry = Date.now() + 6 * 24 * 60 * 60 * 1000;

    return authToken;
  } catch (error) {
    console.error("Generate token error:", error);

    throw error;
  }
};

export const sendRealOtp = async (phoneNumber: string) => {
  try {
    const authToken = await generateAuthToken();

    const response = await axios.post(
      `${BASE_URL}/verification/v3/send`,
      {},
      {
        headers: {
          authToken: authToken,
        },

        params: {
          countryCode: "91",
          mobileNumber: phoneNumber,
          flowType: "SMS",
          otpLength: 6,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Send OTP error:", error);

    throw error;
  }
};
export const verifyRealOtp = async (verificationId: string, otp: string) => {
  try {
    const authToken = await generateAuthToken();

    const response = await axios.get(
      `${BASE_URL}/verification/v3/validateOtp`,
      {
        headers: {
          authToken,
        },

        params: {
          verificationId,
          code: otp,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Verify OTP error:", error);

    throw error;
  }
};