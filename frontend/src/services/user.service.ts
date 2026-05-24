import API_BASE_URL from "./api";

export const createUser = async (phoneNumber: string, name?: string) => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      phoneNumber,
      name,
    }),
  });

  return response.json();
};
export const loginUser = async (phoneNumber: string) => {
  const response = await fetch(`${API_BASE_URL}/users/login`, {
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

export const getUserById = async (userId: string) => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`);

  return response.json();
};

export const updateUser = async (userId: string, data: any) => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: "PATCH",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });

  return response.json();
};

export const deleteUser = async (userId: string) => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: "DELETE",
  });

  return response.json();
};

export const updatePhoneNumber = async (
  userId: string,
  phoneNumber: string,
) => {
  const response = await fetch(`${API_BASE_URL}/users/change-phone-number`, {
    method: "PATCH",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      userId,
      phoneNumber,
    }),
  });

  return response.json();
};