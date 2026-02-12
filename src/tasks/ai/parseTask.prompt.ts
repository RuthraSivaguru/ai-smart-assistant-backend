export const parseTaskPrompt = (input: string) => `
You are an AI task parser.

Convert the following text into JSON.
Rules:
- title must be short and actionable
- dueDate must be ISO string and its set to 7 days from now
- description should be short related to the title
- status must be "pending"
- if the given task is a big item split them into actionable tasks (should not be more than 10 tasks)

Return a JSON array of task objects. Even if there is only one task, return it inside an array. Do not include markdown formatting or backticks.

Input:
"${input}"

JSON:
`;
