import { Entity, model, property } from '@loopback/repository';
import { v4 as uuid } from 'uuid';

@model()
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    default: () => uuid(),
  })
  id?: string;
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
