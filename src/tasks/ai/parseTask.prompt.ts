export const parseTaskPrompt = (input: string) => `
You are an AI task parser.

Convert the following text into JSON.
Rules:
- title must be short and actionable
- dueDate must be ISO string and its set to 7 days from now
- description should be short related to the title
- status must be "pending"

Return ONLY valid JSON. Do not include markdown formatting or backticks.

Input:
"${input}"

JSON:
`;
