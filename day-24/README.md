# Day 24 - Gemini API Implementation

Integrate Google's Gemini AI into your app. Build a chatbot with Express backend and React frontend.

## Learning Objectives
- Get a Gemini API key from Google AI Studio
- Create an Express backend route for Gemini
- Build a chat interface in React
- Write effective prompts
- Handle rate limits and errors

## Concepts Covered

### Getting an API Key
Go to [Google AI Studio](https://aistudio.google.com/app/apikey) and create an API key. Save it in `.env`:
```
GEMINI_API_KEY=your_key_here
```

### Express Backend Route
```js
app.post('/api/chat', async (req, res) => {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: req.body.message }] }]
      })
    }
  );
  const data = await response.json();
  res.json({ reply: data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response' });
});
```

### Frontend Chat
```jsx
async function sendMessage() {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: input }),
  });
  const data = await res.json();
  setMessages([...messages, { user: input, bot: data.reply }]);
}
```

### Prompt Engineering Tips
- Be specific: "Explain closures with a code example" instead of "Tell me about JS"
- Set format: "Give 3 bullet points"
- Set constraints: "Beginner friendly, under 100 words"

### Rate Limits
- Free tier: 60 requests per minute
- Handle 429 status codes gracefully
- Show a friendly message when rate limited

## Files
| File | Description |
|------|-------------|
| `index.html` | Backend code, frontend code, live chat demo |
