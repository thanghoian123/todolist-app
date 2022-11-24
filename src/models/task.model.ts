import {belongsTo, Entity, model, property, hasMany} from '@loopback/repository';
import uuid = require('uuid');
import { Project, ProjectWithRelations } from './project.model';
import {TaskTask} from './task-task.model';

@model()
export class Task extends Entity {
  @property({
    type: 'string',
    id: true,
    default: () => uuid()
  })
  id?: string;
  @property({
    type: 'string',
    required: true,
  })
  name: string;
  @property({
    type: 'string',
    default:'todo',
    jsonSchema: {
      enum: ['todo', 'inprogress','review','done'],
    },
  })
  status: string
  @property({
    type: 'date',
    default: () => new Date()
  })
  createdAt ?: string;
  
  @property({
    type: 'date',
    default: () => new Date()
  })
  updatedAt?: string;

  @belongsTo(() => Project)
  projectId?: string;

  @hasMany(() => Task, {
    through: {
      model: () => TaskTask,
      keyFrom: 'taskId',
      keyTo: 'fk_taskId',
    },
  })
  tasks: Task[];

  constructor(data?: Partial<Task>) {
    super(data);
  }
}


export interface TaskRelations {
  project?: ProjectWithRelations;
  // describe navigational properties here
}

export type TaskWithRelations = Task & TaskRelations;
