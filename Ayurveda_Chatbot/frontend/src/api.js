const jsonHeaders = { "Content-Type": "application/json" };

export async function apiGet(path) {
  const response = await fetch(path, { credentials: "include" });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Request failed");
  }
  return response.json();
}

export async function apiPost(path, payload) {
  const response = await fetch(path, {
    method: "POST",
    headers: jsonHeaders,
    credentials: "include",
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Request failed");
  }
  return response.json();
}
