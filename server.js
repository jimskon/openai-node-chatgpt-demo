import 'dotenv/config';
import express from 'express';
import OpenAI from 'openai';

const app = express();
const port = process.env.PORT || 3000;

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error("Missing OPENAI_API_KEY. Copy .env.example to .env and set your key.");
  process.exit(1);
}

const client = new OpenAI({ apiKey });
const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

app.use(express.json({ limit: '1mb' }));
app.use(express.static('public'));

app.post('/api/ask', async (req, res) => {
  try {
    const prompt = String(req.body?.prompt || '').trim();
    if (!prompt) {
      return res.status(400).json({ error: "Missing prompt" });
    }

    const response = await client.responses.create({
      model,
      input: prompt,
    });

    // The SDK provides a helper to extract text
    const text = response.output_text || '';
    return res.json({ text });
  } catch (err) {
    const status = err?.status || 500;
    const message = err?.message || String(err);
    console.error("OpenAI error:", { status, message });
    return res.status(status).json({
      error: message,
      hint: "Check your API key and that your account has API access/credits.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
