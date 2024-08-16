import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async createTask(
    @Body() body: { title: string; description: string; assignedTo: string },
  ) {
    return this.taskService.createTask(
      body.title,
      body.description,
      body.assignedTo,
    );
  }

  @Get()
  async findAllTasks() {
    return this.taskService.findAllTasks();
  }

  @Get(':id')
  async findTaskById(@Param('id') id: string) {
    return this.taskService.findTaskById(id);
  }

  @Patch(':id/status')
  async updateTaskStatus(
    @Param('id') id: string,
    @Body() body: { status: string },
  ) {
    return this.taskService.updateTaskStatus(id, body.status);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }
}
