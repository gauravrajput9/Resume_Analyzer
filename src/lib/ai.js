export async function callAI(prompt) {
  // Check if API key is set
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is not configured");
  }

  // Create AbortController for timeout (30 seconds)
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    const res = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [{ role: "user", content: prompt }],
        }),
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        `Groq API error: ${res.status} ${res.statusText}. ${errorData.error?.message || ""}`
      );
    }

    const data = await res.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error("Invalid response format from Groq API");
    }

    return data.choices[0].message.content;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error.name === "AbortError") {
      throw new Error("Request timeout: The API request took too long (30s limit)");
    }
    
    if (error.message.includes("fetch failed") || error.message.includes("SocketError")) {
      throw new Error("Network error: Failed to connect to Groq API. Please check your internet connection and try again.");
    }
    
    throw error;
  }
}
