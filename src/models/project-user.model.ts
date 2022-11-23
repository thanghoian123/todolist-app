import { Entity, property } from '@loopback/repository';

export class ProjectUser extends Entity {
  // id property and others

  @property({
    type: 'number',
  })
  ProjectId?: number;

  @property({
    type: 'number',
  })
  UserId?: number;

  constructor(data: Partial<ProjectUser>) {
    super(data);
  }
}