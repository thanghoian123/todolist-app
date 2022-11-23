import {belongsTo, Entity, model, property} from '@loopback/repository';
import uuid = require('uuid');
import { Project } from './project.model';
import { User } from './user.model';

@model()
export class ProjectUser extends Entity {
  @property({
    type: 'string',
    default: ()=> uuid(),
    id: true,
  })
  id?: string;
  @belongsTo(() => Project)
  projectId: string;

  @belongsTo(() => User)
  userId: string;

  constructor(data?: Partial<ProjectUser>) {
    super(data);
  }
}

export interface ProjectUserRelations {
  // describe navigational properties here
}

export type ProjectUserWithRelations = ProjectUser & ProjectUserRelations;
