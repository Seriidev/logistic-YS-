import { refreshAccessToken } from "./auth";

let refreshPromise = null;

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export const api = async (path, options = {}) => {
  const token = localStorage.getItem("yuusell_token");

  let res = await fetch(BASE_URL + path, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });

  if (res.status === 401) {
    try {
      if (!refreshPromise) {
        refreshPromise = refreshAccessToken().finally(() => {
          refreshPromise = null;
        });
      }
      const newToken = await refreshPromise;
      res = await fetch(BASE_URL + path, {
        headers: {
          "Content-Type": "application/json",
          ...(newToken ? { Authorization: `Bearer ${newToken}` } : {}),
        },
        ...options,
      });
    } catch (_) {
      // Refresh failed — fall through and throw the original 401 response below.
    }
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Request failed" }));
    throw error;
  }

  return res.json();
};
