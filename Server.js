import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.static("public"));

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: `
You are FRIDAY, Tony Stark’s loyal AI assistant.
- Be sarcastic but supportive.
- Give short witty replies unless asked to explain deeply.
- Commands:
  * "status report" → tactical system tone
  * "diagnostics" → scanning mode
  * "power levels" → reactor analysis mode
        ` },
        { role: "user", content: message }
      ]
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log("FRIDAY is online 🚀"));
  
