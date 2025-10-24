export type SuggestionResponse = {
  text: string;
  items: string[];
  mock?: boolean;
};

export async function getSuggestions(
  topic: string
): Promise<SuggestionResponse> {
  const trimmed = topic.trim();
  if (!trimmed) return { text: "No topic provided.", items: [], mock: true };

  const key = import.meta.env.VITE_OPENAI_API_KEY;
  if (!key) {
    console.warn("⚠ No OpenAI API key found — using mock suggestions.");
    return {
      text: `Mock suggestions for "${trimmed}"`,
      items: [
        `Research something about ${trimmed}`,
        `Write down key ideas for ${trimmed}`,
        `Take one small action toward ${trimmed}`,
      ],
      mock: true,
    };
  }

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Give me 3 short, actionable todo items related to "${trimmed}".`,
          },
        ],
        temperature: 0.7,
        max_tokens: 200,
      }),
    });

    if (!res.ok) {
      console.error("OpenAI error:", await res.text());
      return {
        text: `Mock suggestions for "${trimmed}" (AI unavailable).`,
        items: [
          `Review your current ${trimmed} tasks`,
          `Set one new goal about ${trimmed}`,
          `Take a 10-minute break before continuing ${trimmed}`,
        ],
        mock: true,
      };
    }

    const data = await res.json();
    const text: string =
      data?.choices?.[0]?.message?.content?.trim() ?? "No suggestions.";

    const items = text
      .split(/\r?\n/)
      .map((line) => line.replace(/^\s*\d+[\).:-]\s*|^\s*[-•]\s*/u, "").trim())
      .filter((line) => line.length > 0);

    return { text, items };
  } catch (err: any) {
    console.error("Server error:", err);
    return {
      text: `Mock suggestions for "${trimmed}" (error).`,
      items: [
        `Think about one small thing related to ${trimmed}`,
        `Write down a todo for ${trimmed}`,
        `Take a short break and plan ${trimmed}`,
      ],
      mock: true,
    };
  }
}
