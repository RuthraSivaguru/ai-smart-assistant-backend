import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AIService } from './ai/ai.service';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly repo: Repository<Task>,
    private readonly aiService: AIService,
  ) {}

  findAll(userId: string) {
    return this.repo.find({ where: { userId } });
  }

  async create(body: any, userId: string) {
    const task = this.repo.create({
      ...body,
      userId,
    });
    return this.repo.save(task);
  }
  async createFromAI(input: string, userId: string) {
    console.log('AI INPUT:', input);

    const aiTask = await this.aiService.parseTask(input);

    console.log('AI OUTPUT:', aiTask);

    const task = this.repo.create({
      ...aiTask,
      userId,
    });

    return this.repo.save(task);
  }
}
