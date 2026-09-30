const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Something went wrong");
  }

  return data;
}

export async function analyzeFeedback(text) {
  const data = await request("/analyze", {
    method: "POST",
    body: JSON.stringify({ text }),
  });

  return {
    sentiment: data.sentiment,
    sentimentConfidence: data.sentiment_confidence,
    category: data.category,
    categoryConfidence: data.category_confidence,
    priority: data.priority,
    priorityConfidence: data.priority_confidence,
    intent: data.intent,
    similarFeedback: data.similar_feedback || [],
  };
}

export function getFeedback() {
  return request("/feedback");
}

export function getStats() {
  return request("/stats");
}