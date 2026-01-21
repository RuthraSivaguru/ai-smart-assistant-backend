import { Injectable, Logger } from '@nestjs/common';
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import { ConfigService } from '@nestjs/config';
import { AITaskSchema } from '../schemas/ai-task.schema';
import { parseTaskPrompt } from './parseTask.prompt';

@Injectable()
export class AIService {
  private readonly logger = new Logger(AIService.name);
  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;

  constructor(private configService: ConfigService) {
    this.genAI = new GoogleGenerativeAI(
      this.configService.get<string>('GEMINI_API_KEY') || '',
    );
    this.model = this.genAI.getGenerativeModel({
      model: 'gemini-2.5-flash-lite',
    });
  }

  async parseTask(input: string) {
    try {
      const prompt = parseTaskPrompt(input);
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();

      // Clean up markdown code blocks if any
      text = text
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();

      const json = JSON.parse(text);

      // ✅ Zod validation
      const parsed = AITaskSchema.parse(json);

      return {
        ...parsed,
        dueDate: new Date(parsed.dueDate),
      };
    } catch (error) {
      this.logger.error('AI Service Error:', error);
      throw error;
    }
  }
}
