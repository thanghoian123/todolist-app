import { AuthenticationBindings } from '@loopback/authentication';
import {injectable, /* inject, */ BindingScope, inject, Getter} from '@loopback/core';
import { repository } from '@loopback/repository';
import { HttpErrors } from '@loopback/rest';
import { MyUserProfile } from '../authorization';
import { ProjectRepository, TaskRepository } from '../repositories';

interface ICheckProjectUserParams{
  projectId: string;
}

@injectable({scope: BindingScope.TRANSIENT})
export class ProjectService {
  constructor(
    @repository(ProjectRepository)
    public projectRepository: ProjectRepository,
    @repository(TaskRepository)
    public taskRepository: TaskRepository,
    @inject.getter(AuthenticationBindings.CURRENT_USER)
    public getCurrentUser: Getter<MyUserProfile>,
    // @repository(ProjectRepository)
    // public userRepository: ProjectRepository,
  ) {}


 async checkProjectUser (params: ICheckProjectUserParams): Promise<boolean> {
  const currentUser = await this.getCurrentUser()
    // --------------- check user is exist on project
    const projectData = await this.projectRepository.findOne({where: {id: params.projectId},include:['tasks', 'users']});
    // const taskRelations = await this.taskTaskRepository.find({where: });
    if(projectData){
      const users = projectData?.users || []
      const isExists = users.find(u=>u.id === currentUser.id)
      if(!isExists){
        throw new HttpErrors.Unauthorized("You not permit in this project");
      }else{
        return new Promise((resolve)=> resolve(true))
      }
    }else{
      throw new HttpErrors.NotFound("Project not found");
    }
 }
  /*
   * Add service methods here
   */
}
