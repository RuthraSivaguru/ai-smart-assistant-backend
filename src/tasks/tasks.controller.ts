import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { TasksService } from './tasks.service';
import { createTaskSchema } from './schemas/create-task.schema';
import type { CreateTaskDto } from './schemas/create-task.schema';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  @Get()
  findAll(@Req() req: any) {
    return this.tasksService.findAll(req.user.sub);
  }

  @Post()
  createTask(
    @Body(new ZodValidationPipe(createTaskSchema)) body: CreateTaskDto,
    @Req() req: any,
  ) {
    return this.tasksService.create(body, req.user.sub);
  }

  @Post('ai')
  @UseGuards(AuthGuard('jwt'))
  async createFromAI(@Body('input') input: string, @Req() req: any) {
    return this.tasksService.createFromAI(input, req.user.sub);
  }
}
