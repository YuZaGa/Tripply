/**
 * Calls the server-side Next.js API route to generate a trip via Gemini.
 * Sends Firebase ID token if available for authenticated usage limits.
 */
export const generateTrip = async (prompt, idToken = null) => {
  const headers = { "Content-Type": "application/json" };
  if (idToken) {
    headers["Authorization"] = `Bearer ${idToken}`;
  }

  const response = await fetch("/api/generate-trip", {
    method: "POST",
    headers,
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    const err = new Error(error.error || `Server error: ${response.status}`);
    err.needsAuth = error.needsAuth || false;
    err.remaining = error.remaining;
    err.limit = error.limit;
    throw err;
  }

  const data = await response.json();
  return data.result;
};