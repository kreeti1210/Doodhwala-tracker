import API_BASE_URL from "./api";

export const saveRecord = async (data: any) => {
  const response = await fetch(`${API_BASE_URL}/records`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });

  return response.json();
};

export const getMonthSummary = async (
  userId: string,
  month: number,
  year: number,
) => {
  const response = await fetch(
    `${API_BASE_URL}/records/user/${userId}/month-summary?month=${month}&year=${year}`,
  );

  return response.json();
};

export const getMonthRecords = async (
  userId: string,
  month: number,
  year: number,
) => {
  const response = await fetch(
    `${API_BASE_URL}/records/user/${userId}/month-records?month=${month}&year=${year}`,
  );

  return response.json();
};

export const getRecordByDate = async (userId: string, date: string) => {
  const response = await fetch(
    `${API_BASE_URL}/records/user/${userId}/date?date=${date}`,
  );

  return response.json();
};

export const getPaginatedLogs = async (userId: string, page = 1, limit = 5) => {
  const response = await fetch(
    `${API_BASE_URL}/records/user/${userId}/logs?page=${page}&limit=${limit}`,
  );

  const data = await response.json();

return {
  records: data.data?.records || [],

  currentPage: data.data?.currentPage || 1,

  totalPages: data.data?.totalPages || 0,

  totalRecords: data.data?.totalRecords || 0,

  hasMore: data.data?.hasMore || false,
};
};
export const deleteRecord = async (recordId: string) => {
  const response = await fetch(`${API_BASE_URL}/records/${recordId}`, {
    method: "DELETE",
  });

  return response.json();
};
