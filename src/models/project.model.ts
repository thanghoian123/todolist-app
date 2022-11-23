import { Entity, hasMany, model, property } from '@loopback/repository';
import { v4 as uuid } from 'uuid';
import { ProjectUser } from './project-user.model';
import { User } from './user.model';

@model()
export class Project extends Entity {
  @property({
    type: 'string',
    id: true,
    default: () => uuid(),
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @hasMany(() => User, {through: {model: () => ProjectUser}} as any)
  users: User[];

  constructor(data?: Partial<Project>) {
    super(data);
  }
}
