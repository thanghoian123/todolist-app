import { inject } from '@loopback/core';
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
import { EProjectUserAdd, IProjectTaskAdd, ITaskMoveParams, ProjectAddTaskRequestBody, ProjectAddUserRequestBody, ProjectMoveTaskRequestBody, ProjectUserAddSchema } from '../authorization';
import { MyCronJob } from '../cron/MyCronJob';
import {Project, Task} from '../models';
import {ProjectRepository, ProjectUserRepository, TaskRepository} from '../repositories';
import {CronBindings} from '@loopback/cron';
import { ETaskStatusType } from '../types';
export class ProjectController {
  constructor(
    @repository(ProjectRepository)
    public projectRepository : ProjectRepository,
    @repository(TaskRepository)
    public taskRepository : TaskRepository,
    @repository(ProjectUserRepository)
    public projectUserRepository : ProjectUserRepository,

    @inject(CronBindings.COMPONENT)  public myCronJob: MyCronJob,
  ) {}

  @post('/projects',{
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: {'x-ts-type': Project}}},
      },
    },
  })
  
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: {'x-ts-type': Project}
        },
      },
    })
    project: Project,
  ): Promise<Project> {
    return this.projectRepository.create(project);
  }

  @post('/projects/addUser',{
    responses: {
      '200': ProjectAddUserRequestBody
    },
  })
  
  async addUser(
    @requestBody(ProjectAddUserRequestBody as any)
    params : EProjectUserAdd,
  ): Promise<any> {
    const a = this.projectUserRepository.create({userId: params.userId, projectId: params.id})
    return {message:"success"};
  }

  @post('/projects/addTask',{
    responses: {
      '200': ProjectAddUserRequestBody
    },
  })
  
  async addTask(
    @requestBody(ProjectAddTaskRequestBody as any)
    params : IProjectTaskAdd,
  ): Promise<any> {
    return this.projectRepository.tasks(params.projectId).create({name: params.name})
    
  }


  @post('/projects/moveTask/{taskId}',{
    responses: {
      '200': ProjectAddUserRequestBody
    },
  })
  
  async moveTask(
    @param.path.string('taskId') taskId: string,
    @requestBody(ProjectMoveTaskRequestBody as any)
    params : ITaskMoveParams,
  ): Promise<any> {
    const findTask = await this.taskRepository.findById(taskId);
    let result;
    if(findTask){
      findTask.status = params.status;
      result = this.taskRepository.updateById(taskId,{...findTask})
    }else{
      throw new HttpErrors.NotFound("Task not found")
    } 

    if(params.status === ETaskStatusType.DONE){
      console.log("🚀 ~ file: project.controller.ts ~ line 91 ~ ProjectController ~ taskId", taskId)
      this.myCronJob.nextDates()
    }
    return result

    // return this.projectRepository.tasks(params.projectId).create({name: params.name})
  }


  @get('/projects/count')
  @response(200, {
    description: 'Project model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Project) where?: Where<Project>,
  ): Promise<Count> {
    return this.projectRepository.count(where);
  }

  @get('/projects',{
    responses: {
      '200': {
        description: 'Character model instance',
        content: {'application/json': {schema: {type: 'array','x-ts-type': Project}}},
      },
    },
  })
  
  async find(
    @param.filter(Project) filter?: Filter<Project>,
  ): Promise<Project[]> {
    return this.projectRepository.find({ include: ['users', 'tasks']});
  }

  @patch('/projects')
  @response(200, {
    description: 'Project PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Project, {partial: true}),
        },
      },
    })
    project: Project,
    @param.where(Project) where?: Where<Project>,
  ): Promise<Count> {
    return this.projectRepository.updateAll(project, where);
  }

  @get('/projects/{id}')
  @response(200, {
    description: 'Project model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Project, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Project, {exclude: 'where'}) filter?: FilterExcludingWhere<Project>
  ): Promise<Project> {
    return this.projectRepository.findById(id, filter);
  }

  @patch('/projects/{id}')
  @response(204, {
    description: 'Project PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Project, {partial: true}),
        },
      },
    })
    project: Project,
  ): Promise<void> {
    await this.projectRepository.updateById(id, project);
  }

  @put('/projects/{id}')
  @response(204, {
    description: 'Project PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() project: Project,
  ): Promise<void> {
    await this.projectRepository.replaceById(id, project);
  }

  @del('/projects/{id}')
  @response(204, {
    description: 'Project DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.projectRepository.deleteById(id);
  }
}
