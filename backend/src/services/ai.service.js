const OpenAI = require("openai");
const { pipeline } = require("@xenova/transformers");

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

async function generateResponse(messages) {
  try {
    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages,
      temperature: 0.6,
    });

    return completion.choices[0].message.content;
  } catch (err) {
    console.log("Groq Error:", err.message);
    return "AI temporarily unavailable.";
  }
}

let embedder;

async function loadModel() {
  if (!embedder) {
    console.log("Loading embedding model...");
    embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  }
  return embedder;
}

async function generateVector(text) {
  try {
    const model = await loadModel();

    const output = await model(text, {
      pooling: "mean",
      normalize: true,
    });

    return Array.from(output.data);
  } catch (err) {
    console.log("Embedding Error:", err.message);
    return Array(384).fill(0.01);
  }
}

module.exports = {
  generateResponse,
  generateVector,
};
