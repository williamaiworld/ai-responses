import * as dotenv from 'dotenv';
dotenv.config();
import { Configuration, OpenAIApi } from 'openai';

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

// flag if api key in .env file
export const isAPIKeyPopulated = apiKey && apiKey.length > 0;

const configuration = new Configuration({
  apiKey,
});

const openai = new OpenAIApi(configuration);

export const getResponse = async (prompt) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    max_tokens: 20,
    temperature: 0,
  });
  return response?.data?.choices[0]?.text;
}
