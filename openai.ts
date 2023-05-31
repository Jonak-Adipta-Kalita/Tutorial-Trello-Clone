import { Configuration, OpenAIApi } from "openai";

const configutation = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export const openai = new OpenAIApi(configutation);
