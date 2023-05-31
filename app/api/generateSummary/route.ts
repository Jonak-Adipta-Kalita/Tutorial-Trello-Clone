import { openai } from "@/openai";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const { todos } = await request.json();
  try {
    const response = await openai.createChatCompletion({
      model: "code-davinci-002",
      temperature: 0.8,
      n: 1,
      stream: false,
      messages: [
        {
          role: "system",
          content:
            "When responding, welcome the user as your friend and say Welcome to JAK Trello Clone! Limit the response to 100 characters",
        },
        {
          role: "user",
          content: `Hi there, provide a summary of the following todos. Count how many todos are in each category such as Todo, In Progress and Done. Here is the Data: ${JSON.stringify(
            todos
          )}`,
        },
      ],
    });

    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    return { content: "No Money in Bank..." };
  }
};
