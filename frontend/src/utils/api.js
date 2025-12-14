const API_BASE = "http://localhost:8000/api";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token
    ? { Authorization: `Bearer ${token}` }
    : {};
}

// ---------- AUTH ----------

export async function login(username, password) {
  const res = await fetch(`${API_BASE}/auth/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

export async function register(username, password) {
  const res = await fetch(`${API_BASE}/auth/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) throw new Error("Registration failed");
  return res.json();
}

// ---------- SWEETS ----------

export async function fetchSweets() {
  const res = await fetch(`${API_BASE}/sweets/list/`, {
    headers: {
      ...getAuthHeaders(),
    },
  });

  if (!res.ok) throw new Error("Failed to fetch sweets");
  return res.json();
}

export async function purchaseSweet(id) {
  const res = await fetch(`${API_BASE}/sweets/${id}/purchase/`, {
    method: "POST",
    headers: {
      ...getAuthHeaders(),
    },
  });

  if (!res.ok) throw new Error("Purchase failed");
  return res.json();
}
