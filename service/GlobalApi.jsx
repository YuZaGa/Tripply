/**
 * Calls the server-side Next.js API route to search Google Places.
 * The API key is stored server-side and never exposed to the client.
 */
export const GetPlaceDetails = async (data) => {
    const response = await fetch("/api/search-places", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ textQuery: data.textQuery }),
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.error || `Server error: ${response.status}`);
    }

    // Wrap in { data } to match the previous axios response shape
    const result = await response.json();
    return { data: result };
};