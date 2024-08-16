import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema({
  versionKey: false,
  toJSON: {
    transform(_doc, ret) {
      ret.id = ret._id;
      delete ret._id;

      return ret;
    },
  },
})
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  status: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop()
  dueDate: Date;

  @Prop()
  priority: number;

  @Prop()
  assignedTo: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
