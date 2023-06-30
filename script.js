const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const app = express();
app.use(express.json());

const openAi = new OpenAIApi(
  new Configuration({
    apiKey: process.env.API_KEY, // Use your OpenAI API key
  })
);

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openAi.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: message },
      ],
    });

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("Error:", error.response.data);
    res.status(500).json({ error: "An error occurred." });
  }
});

const port = 5000; // Set the desired port number
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
