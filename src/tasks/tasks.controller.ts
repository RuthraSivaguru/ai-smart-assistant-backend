import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Req,
  Put,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TasksService } from './tasks.service';
import type { UpdateTaskDto } from './schemas/update-task-schema';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  @Get()
  findAll(@Req() req: any) {
    return this.tasksService.findAll(req.user.sub);
  }

  @Post('ai')
  @UseGuards(AuthGuard('jwt'))
  async createFromAI(@Body('input') input: string, @Req() req: any) {
    return this.tasksService.createFromAI(input, req.user.sub);
  }

  @Put('update/:id')
  @UseGuards(AuthGuard('jwt'))
  async updateTask(
    @Param('id') id: string,
    @Body() body: UpdateTaskDto,
    @Req() req: any,
  ) {
    return this.tasksService.updateTask(id, body, req.user.sub);
  }
}
