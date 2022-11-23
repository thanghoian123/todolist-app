import {belongsTo, Entity, model, property} from '@loopback/repository';
import { Task } from './task.model';

@model()
export class TaskTask extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @belongsTo(() => Task)
  taskId: string;

  @belongsTo(() => Task)
  fk_taskId: string;

  constructor(data?: Partial<TaskTask>) {
    super(data);
  }
}

export interface TaskTaskRelations {
  // describe navigational properties here
}

export type TaskTaskWithRelations = TaskTask & TaskTaskRelations;
