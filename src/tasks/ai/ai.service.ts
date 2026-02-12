import { Injectable, Logger } from '@nestjs/common';
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import { ConfigService } from '@nestjs/config';
import { z } from 'zod';
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

      let json = JSON.parse(text);

      // Safeguard: ensure we have an array
      if (!Array.isArray(json)) {
        json = [json];
      }

      // ✅ Zod validation for an array of tasks
      const parsedArray = z.array(AITaskSchema).parse(json);

      return parsedArray.map((parsed) => ({
        ...parsed,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      }));
    } catch (error) {
      this.logger.error('AI Service Error:', error);
      throw error;
    }
  }
}
