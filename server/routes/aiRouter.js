const OpenAI = require('openai');
const express = require('express');

const aiRouter = express.Router();

const openai = new OpenAI({
  apiKey: 'sk-proj-WxTmyITKKwOWYVHAXRckT3BlbkFJDpDmFxz9lzAWAytc0Ej4',
});

aiRouter.post('/', async (req, res) => {
  try {
    const { prompt } = req.body;

    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a financial advisor assistant.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 170,
    });

    res.send(chatCompletion.choices[0].message.content);
  } catch (error) {
    if (error.response) {
      console.error(`Error: ${error.response.status} - ${error.response.data.error.message}`);
      res.status(error.response.status).send(error.response.data.error.message);
    } else {
      console.error(`Error: ${error.message}`);
      res.status(500).send('Something went wrong');
    }
  }
});

module.exports = aiRouter;
