import { authenticate, AuthenticationBindings } from '@loopback/authentication';
import { Getter, inject } from '@loopback/context';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import { MyUserProfile, PermissionKey } from '../authorization';
import {Task} from '../models';
import {TaskRepository} from '../repositories';

export class TaskController {
  constructor(
    @repository(TaskRepository)
    public taskRepository : TaskRepository,
    @inject.getter(AuthenticationBindings.CURRENT_USER)
    public getCurrentUser: Getter<MyUserProfile>,
  ) {}

  @get('/tasks',{
    responses: {
      '200': {
        description: 'Character model instance',
        content: {'application/json': {schema: {type: 'array','x-ts-type': Task}}},
      },
    },
  })
  @authenticate('jwt', {required: [PermissionKey.BASE_USER]} as any)
  async find(
    @param.filter(Task) filter?: Filter<Task>,
  ): Promise<Task[]>{
    const currentUser = this.getCurrentUser()
    console.log("🚀 ~ file: task.controller.ts ~ line 47 ~ TaskController ~ currentUser", currentUser)
    return this.taskRepository.find(filter);
  }
}
