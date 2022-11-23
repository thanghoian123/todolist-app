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
  HttpErrors,
} from '@loopback/rest';
import { MyUserProfile, PermissionKey } from '../authorization';
import {Task} from '../models';
import {ProjectRepository, TaskRepository, TaskTaskRepository} from '../repositories';

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
    const currentUser = await this.getCurrentUser()
    // --------------- check user is exist on project
      const projectData = await this.projectRepository.findOne({where: {id: params.projectId},include:['tasks', 'users']});
      const tasks = await this.taskRepository.find({where:{projectId: params.projectId}, include:["tasks"]} );
      console.log("🚀 ~ file: task.controller.ts ~ line 66 ~ TaskController ~ tasks", tasks)
      // const taskRelations = await this.taskTaskRepository.find({where: });

      if(projectData){
        const users = projectData?.users || []
        const isExists = users.find(u=>u.id === currentUser.id)
        if(!isExists){
          throw new HttpErrors.Unauthorized("You not permit in this project");
        }else{
          return tasks || []
        }
      }else{
        throw new HttpErrors.NotFound("Project not found");
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
    // const currentUser = await this.getCurrentUser()
    // // --------------- check user is exist on project
    //   const projectData = await this.projectRepository.findOne({where: {id: params.projectId},include:['tasks', 'users']});
    //   if(projectData){
    //     const users = projectData?.users || []
    //     const isExists = users.find(u=>u.id === currentUser.id)
    //     if(!isExists){
    //       throw new HttpErrors.Unauthorized("You not permit in this project");
    //     }else{
    //       // link task here
    //       const result = await this.taskTaskRepository.create({taskId: params.taskId, fk_taskId: params.taskIdLink})
    //       return result
    //     }

        
    //   }else{
    //     throw new HttpErrors.NotFound("Project not found");
    //   }

      const result = await this.taskTaskRepository.create({taskId: params.taskId, fk_taskId: params.taskIdLink})
          return {message: "Success"}
  }
}
