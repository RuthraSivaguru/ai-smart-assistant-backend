import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  create(body: any, userId: string) {
    return {
      message: 'Task created',
      body,
      userId,
    };
  }
}
