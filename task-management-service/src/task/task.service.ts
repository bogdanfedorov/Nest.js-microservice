import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async createTask(
    title: string,
    description: string,
    assignedTo: string,
  ): Promise<Task> {
    const newTask = new this.taskModel({
      title,
      description,
      status: 'pending',
      assignedTo,
    });
    return newTask.save();
  }

  async findAllTasks(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async findTaskById(id: string): Promise<Task> {
    return this.taskModel.findById(id).exec();
  }

  async updateTaskStatus(id: string, status: string): Promise<Task> {
    return this.taskModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .exec();
  }

  async deleteTask(id: string): Promise<Task> {
    return this.taskModel.findByIdAndDelete(id).exec();
  }
}
