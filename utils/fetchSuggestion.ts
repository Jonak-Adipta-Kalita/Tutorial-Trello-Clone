import { formatTodosForAI } from "./formatTodosForAI";

export const fetchSuggestion = async (board: Board): Promise<string> => {
  const todos = formatTodosForAI(board);

  const res = await fetch("/api/generateSummary", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ todos }),
  });

  const GPTData = await res.json();
  return GPTData.content as string;
};
