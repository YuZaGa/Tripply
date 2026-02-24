/**
 * Calls the server-side Next.js API route to generate a trip via Gemini.
 * The API key is stored server-side and never exposed to the client.
 */
export const generateTrip = async (prompt) => {
  const response = await fetch("/api/generate-trip", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || `Server error: ${response.status}`);
  }

  const data = await response.json();
  return data.result;
};