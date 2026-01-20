export const parseTaskPrompt = (input: string) => `
You are an AI task parser.

Convert the following text into JSON.
Rules:
- title must be short and actionable
- dueDate must be ISO string
- description optional
- status must be "pending"

Return ONLY valid JSON. Do not include markdown formatting or backticks.

Input:
"${input}"

JSON:
`;
