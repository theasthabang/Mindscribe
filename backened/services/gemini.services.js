export const generateGeminiResponse = async (prompt) => {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    })
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error(err)
  }

  const data = await response.json()
  const text = data.choices?.[0]?.message?.content

  if (!text) throw new Error("No text returned")

  const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim()
  return JSON.parse(cleanText)
}