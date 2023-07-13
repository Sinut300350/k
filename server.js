import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const configuration = new Configuration({
  organization: "org-PKZjFF4OSFttPs4tQTkXrqDx",
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors(
  {origin:"*"}
));

app.get('/', async (req,res) => {
  res.status(200).send({
    massage : 'hello' 
  })
})
app.post("/", async (req, res) => {
  const { messages } = req.body;

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are DesignGPT, a helpful assistant for graphics design chatbot" },
      ...messages,
      //{ role: "user", content: "make a story about magic in 2 lines" },
    ],
  });

  const generatedStory = completion.data.choices[0].message.content;

  res.json({
    story: generatedStory,
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});