import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AIService } from './ai/ai.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './schemas/create-task.schema';

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

  // async create(body: CreateTaskDto, userId: string) {
  //   const task = this.repo.create({
  //     ...body,
  //     userId,
  //   });
  //   return this.repo.save(task);
  // }
  async createFromAI(input: string, userId: string) {
    const aiTask = await this.aiService.parseTask(input);

    const task = this.repo.create({
      ...aiTask,
      userId,
    });
    console.log('task', task);
    return this.repo.save(task);
  }
}
