import {Entity, model, property, hasMany} from '@loopback/repository';
import {User} from './user.model';
import {ProjectUser} from './project-user.model';
import {Task} from './task.model';

import uuid = require('uuid');

@model()
export class Project extends Entity {
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

  @hasMany(() => User, {through: {model: () => ProjectUser}})
  users: User[];

  @hasMany(() => Task)
  tasks: Task[];

  constructor(data?: Partial<Project>) {
    super(data);
  }
}

export interface ProjectRelations {
  // describe navigational properties here
}

export type ProjectWithRelations = Project & ProjectRelations;
