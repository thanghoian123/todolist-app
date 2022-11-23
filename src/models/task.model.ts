import {Entity, model, property} from '@loopback/repository';
import uuid = require('uuid');

@model()
export class Task extends Entity {
  @property({
    type: 'string',
    id: true,
    default: ()=>uuid()
  })
  id?: string;
  @property({
    type: 'string',
    required: true,
  })
  name: string;


  constructor(data?: Partial<Task>) {
    super(data);
  }
}

export interface TaskRelations {
  // describe navigational properties here
}

export type TaskWithRelations = Task & TaskRelations;
