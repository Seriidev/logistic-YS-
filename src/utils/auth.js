const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api/v1";
const TOKEN_KEY = "yuusell_token";
const REFRESH_KEY = "yuusell_refresh_token";
const USER_KEY = "yuusell_user";

export async function loginUser(email, password) {
  const res = await fetch(BASE_URL + "/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw await res.json();
  const json = await res.json();
  const token = json.data.tokens.accessToken;
  const refresh = json.data.tokens.refreshToken;
  const user = json.data.user;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(REFRESH_KEY, refresh);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
}

export async function registerUser(email, password, phone) {
  const res = await fetch(BASE_URL + "/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, phone }),
  });
  if (!res.ok) throw await res.json();
  const json = await res.json();
  const token = json.data.tokens.accessToken;
  const refresh = json.data.tokens.refreshToken;
  const user = json.data.user;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(REFRESH_KEY, refresh);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
}

export async function logoutUser() {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    await fetch(BASE_URL + "/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (_) {}
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(USER_KEY);
}

export function isAuthenticated() {
  const token = localStorage.getItem(TOKEN_KEY);
  return !!token && token !== "undefined";
}

export function getStoredUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw || raw === "undefined") return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function refreshAccessToken() {
  const refreshToken = localStorage.getItem(REFRESH_KEY);
  if (!refreshToken) throw new Error("No refresh token");

  const res = await fetch(BASE_URL + "/auth/refresh", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });
  if (!res.ok) throw await res.json();
  const json = await res.json();
  const newAccessToken = json.data.tokens.accessToken;
  const newRefreshToken = json.data.tokens.refreshToken;
  localStorage.setItem(TOKEN_KEY, newAccessToken);
  localStorage.setItem(REFRESH_KEY, newRefreshToken);
  return newAccessToken;
}

export async function loginWithGoogle(idToken) {
  const res = await fetch(BASE_URL + "/auth/google", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken, role: "CUSTOMER" }),
  });
  if (!res.ok) throw await res.json();
  const json = await res.json();
  const token = json.data.tokens.accessToken;
  const refresh = json.data.tokens.refreshToken;
  const user = json.data.user;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(REFRESH_KEY, refresh);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
}
