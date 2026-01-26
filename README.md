# OpenAI + Node.js demo (Express)

This small project runs a Node/Express server with a simple webpage.
You type a prompt, the server calls the OpenAI **Responses API**, and returns the model's answer.

## Prereqs
- Node.js 18+ (Node 20+ recommended)
- An OpenAI API key in `OPENAI_API_KEY`

## Setup
```bash
npm install
cp .env.example .env
# edit .env and paste your key
npm start
```

Then open: http://localhost:3000

## Notes
- The API key must stay on the server (never in browser JS).
- If you see an error about billing/credits, add a small prepaid balance in your OpenAI account.
