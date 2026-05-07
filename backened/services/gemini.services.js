export const generateGeminiResponse = async (prompt) => {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are a JSON-only response bot. Always respond with valid JSON and nothing else. No markdown, no code fences, no explanation."
        },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }  // ← forces valid JSON from Groq
    })
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error(err)
  }

  const data = await response.json()
  const text = data.choices?.[0]?.message?.content

  if (!text) throw new Error("No text returned")

  // Clean any accidental fences just in case
  const cleanText = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim()

  try {
    return JSON.parse(cleanText)
  } catch (e) {
    console.error("❌ JSON parse failed. Raw response:", cleanText)
    throw new Error(`Bad JSON from AI: ${e.message}`)
  }
}