import { authenticate, AuthenticationBindings } from '@loopback/authentication';
import { Getter, inject } from '@loopback/context';
import { service } from '@loopback/core';
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
  HttpErrors,
} from '@loopback/rest';
import { MyUserProfile, PermissionKey } from '../authorization';
import {Task} from '../models';
import {ProjectRepository, TaskRepository, TaskTaskRepository} from '../repositories';
import { ProjectService } from '../services';

export interface IGetTasksParams{
  projectId: string;
}

export interface ILinkTaskParams{
  projectId: string;
  taskId: string;
  taskIdLink: string;

}

export class TaskController {
  constructor(
    @repository(TaskRepository)
    public taskRepository : TaskRepository,
    @repository(ProjectRepository)
    public projectRepository : ProjectRepository,
    @repository(TaskTaskRepository)
    public taskTaskRepository : TaskTaskRepository,
    @service(ProjectService)
    public projectService: ProjectService, 
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
    @requestBody() params: IGetTasksParams,
  ): Promise<any>{
    const checked = await this.projectService.checkProjectUser({projectId: params.projectId})
    if(checked){
      const tasks = await this.taskRepository.find({where:{projectId: params.projectId}, include:["tasks"]} );
      return tasks
    }
  }


  @get('/tasks/link-task',{
    responses: {
      '200': {
        description: 'Character model instance',
        content: {'application/json': {schema: {type: 'array','x-ts-type': Task}}},
      },
    },
  })
  @authenticate('jwt', {required: [PermissionKey.BASE_USER]} as any)
  async linkTask(
    @requestBody() params: ILinkTaskParams,
  ): Promise<any>{
    const checked = await this.projectService.checkProjectUser({projectId: params.projectId})
    if(checked){
      const result = await this.taskTaskRepository.create({taskId: params.taskId, fk_taskId: params.taskIdLink})
      return {message: result}
    }
  }
}


