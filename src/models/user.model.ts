import {Entity, model, property} from '@loopback/repository';
import {PermissionKey} from '../authorization/permission-key';
@model()
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  email?: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property.array(String)
  permissions: String[];

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
