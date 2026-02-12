import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AIService } from './ai/ai.service';
import { Task } from './task.entity';
import { UpdateTaskDto } from './schemas/update-task-schema';

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
    const aiTasks = await this.aiService.parseTask(input);

    const tasks = aiTasks.map((aiTask) =>
      this.repo.create({
        ...aiTask,
        userId,
      }),
    );

    return this.repo.save(tasks);
  }

  async updateTask(id: string, body: UpdateTaskDto, userId: string) {
    const task = await this.repo.findOne({
      where: { id, userId },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    Object.assign(task, body);
    return this.repo.save(task);
  }
}
